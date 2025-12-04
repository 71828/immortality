import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { skillConfigurations, getSkillConfigById } from '@/config/skillConfigs'
// 导入属性store
import { playAttribute } from './playAttribute'

export const skillStore = defineStore('skill', () => {
  // 已学习的功法列表 - 存储功法ID和各层级进度
  const learnedSkills = ref([
    // 示例数据：已学习引气诀，初始在第一层
    {
      skillId: 1,
      layersProgress: [
        { layer: 1, progress: 0 }, // 第一层进度0
        // 后续层级可以根据修炼情况自动添加
      ]
    },
    // 已学习清明凝神法，初始在第一层
    {
      skillId: 2,
      layersProgress: [
        { layer: 1, progress: 0 }, // 第一层进度0
      ]
    }
  ])
  
  // 当前修炼的功法ID
  const currentCultivatingSkill = ref(1) // 默认修炼引气诀
  
  // 修炼速度倍率，影响自动修炼间隔
  const cultivationSpeed = ref(1.0)
  
  // 设置修炼速度
  function setCultivationSpeed(speed) {
    if (speed > 0) {
      cultivationSpeed.value = speed
    }
  }

  // 获取已学习的功法总数
  const learnedSkillsCount = computed(() => learnedSkills.value.length)

  // 获取完整的已学习功法列表（包含配置信息）
  const fullLearnedSkills = computed(() => {
    return learnedSkills.value.map(skill => {
      const skillConfig = getSkillConfigById(skill.skillId)
      if (skillConfig) {
        // 获取当前已修炼的最高层级
        // 逻辑：
        // 1. 先找到所有已完成的层级
        // 2. 再找到当前正在修炼的层级（进度>0但未完成）
        // 3. 取这些层级中的最大层级
        // 4. 如果没有任何层级有进度，则 currentMaxLayer 为 0
        let currentMaxLayer = 0
        let hasAnyProgress = false
        
        // 遍历所有层级进度记录
        for (const layerProgress of skill.layersProgress) {
          const layerConfig = skillConfig.layers.find(lc => lc.layer === layerProgress.layer)
          if (layerConfig) {
            // 检查该层级是否已完成或有进度
            const isCompleted = layerProgress.progress >= layerConfig.maxProgress
            const hasProgress = layerProgress.progress > 0
            
            if (isCompleted || hasProgress) {
              hasAnyProgress = true
              // 更新当前最高层级
              currentMaxLayer = Math.max(currentMaxLayer, layerProgress.layer)
            }
          }
        }
        
        // 如果没有任何层级有进度，currentMaxLayer 保持为 0
        // 否则，至少有一个层级有进度，确保 currentMaxLayer 至少为 1
        if (hasAnyProgress && currentMaxLayer === 0) {
          currentMaxLayer = 1
        }
        
        // 检查功法是否所有层级都已完成
        const isMaxed = skillConfig.layers.every(layerConfig => {
          const layerProgress = skill.layersProgress.find(l => l.layer === layerConfig.layer)
          return (layerProgress?.progress || 0) >= layerConfig.maxProgress
        })
        
        return {
          ...skillConfig,
          currentMaxLayer,
          isMaxed,
          // 获取各层级的详细进度信息
          layersDetails: skillConfig.layers.map(layerConfig => {
            const layerProgress = skill.layersProgress.find(l => l.layer === layerConfig.layer)
            return {
              ...layerConfig,
              currentProgress: layerProgress?.progress || 0,
              isCompleted: (layerProgress?.progress || 0) >= layerConfig.maxProgress,
              progressPercentage: Math.min(100, Math.floor(((layerProgress?.progress || 0) / layerConfig.maxProgress) * 100))
            }
          })
        }
      }
      return null
    }).filter(Boolean) // 过滤掉找不到配置的功法
  })

  // 学习新功法
  function learnSkill(skillId) {
    // 验证功法ID是否存在
    const skillConfig = getSkillConfigById(skillId)
    if (!skillConfig) {
      console.error(`Skill with id ${skillId} not found in config`)
      return false
    }

    // 检查是否已经学习过该功法
    const existingSkill = learnedSkills.value.find(skill => skill.skillId === skillId)
    if (existingSkill) {
      console.error(`Skill with id ${skillId} has already been learned`)
      return false
    }

    // 添加到已学习功法列表，初始只有第一层进度
    learnedSkills.value.push({
      skillId,
      layersProgress: [
        { layer: 1, progress: 0 }
      ]
    })
    return true
  }

  // 为功法增加进度（指定层级）
  function addSkillProgress(skillId, layer, progress) {
    const skillIndex = learnedSkills.value.findIndex(skill => skill.skillId === skillId)
    if (skillIndex === -1) {
      console.error(`Skill with id ${skillId} not found in learned skills`)
      return false
    }

    const skill = learnedSkills.value[skillIndex]
    const skillConfig = getSkillConfigById(skill.skillId)
    if (!skillConfig) return false

    // 获取当前层级配置
    const layerConfig = skillConfig.layers.find(l => l.layer === layer)
    if (!layerConfig) {
      console.error(`Layer ${layer} not found in skill ${skillId} config`)
      return false
    }

    // 获取或创建当前层级进度
    let layerProgress = skill.layersProgress.find(l => l.layer === layer)
    if (!layerProgress) {
      layerProgress = { layer, progress: 0 }
      skill.layersProgress.push(layerProgress)
    }

    // 增加进度
    layerProgress.progress += progress

    // 检查是否可以突破到下一层
    if (layerProgress.progress >= layerConfig.maxProgress && layer < skillConfig.layers.length) {
      // 标记当前层级完成
      layerProgress.progress = layerConfig.maxProgress
      
      // 获取属性store实例
      const attributeStore = playAttribute()
      
      // 应用当前层级的属性加成
      if (layerConfig.effects) {
        for (const [effectKey, effectValue] of Object.entries(layerConfig.effects)) {
          // 解析效果键，支持如'MP.max'、'EP.perSecond'格式
          if (effectKey.includes('.')) {
            // 分解属性目标和属性键
            const [attrTarget, keyTarget] = effectKey.split('.')
            // 应用属性变化
            attributeStore.setAttr('level', attrTarget, keyTarget, effectValue)
          } else {
            // 处理直接属性，如'attack'、'defense'等
            // 这些属性可能需要特殊处理，暂时记录日志
            console.log(`Direct attribute effect: ${effectKey} = ${effectValue}`)
          }
        }
      }
      
      // 自动开启下一层
      const nextLayer = layer + 1
      const nextLayerExists = skill.layersProgress.some(l => l.layer === nextLayer)
      if (!nextLayerExists) {
        skill.layersProgress.push({ layer: nextLayer, progress: 0 })
      }
      
      return {
        leveledUp: true,
        newLayer: nextLayer
      }
    }

    return {
      leveledUp: false
    }
  }

  // 为当前最高层级增加进度
  function addProgressToCurrentLayer(skillId, progress) {
    const skillIndex = learnedSkills.value.findIndex(skill => skill.skillId === skillId)
    if (skillIndex === -1) {
      console.error(`Skill with id ${skillId} not found in learned skills`)
      return false
    }

    const skill = learnedSkills.value[skillIndex]
    // 获取当前最高层级
    const currentMaxLayer = Math.max(...skill.layersProgress.map(l => l.layer), 1)
    
    return addSkillProgress(skillId, currentMaxLayer, progress)
  }


  
  // 获取当前修炼的功法详情
  const currentCultivatingSkillInfo = computed(() => {
    return fullLearnedSkills.value.find(skill => skill.id === currentCultivatingSkill.value) || null
  })

  // 设置当前修炼的功法
  function setCurrentCultivatingSkill(skillId) {
    // 检查是否已经学习过该功法
    const isLearned = learnedSkills.value.some(skill => skill.skillId === skillId)
    if (isLearned) {
      currentCultivatingSkill.value = skillId
      return true
    }
    return false
  }
  
  // 消耗功法点提升当前功法的当前层次进度
  function cultivateWithSkillPoints(skillId, consumePoints = 1, progressPerPoint = 10) {
    // 获取属性store实例
    const attributeStore = playAttribute()
    
    // 检查是否有足够的功法点
    if (attributeStore.SPT.val < consumePoints) {
      console.error('Insufficient skill points')
      return { success: false, message: 'Insufficient skill points' }
    }
    
    // 消耗功法点
    attributeStore.setAttr('level', 'SPT', 'val', -consumePoints)
    
    // 计算总进度提升量
    const totalProgress = consumePoints * progressPerPoint
    
    // 提升当前功法的当前层次进度
    const result = addProgressToCurrentLayer(skillId, totalProgress)
    
    return { success: true, leveledUp: result.leveledUp, message: 'Cultivation successful' }
  }

  return { 
    learnedSkills, 
    learnedSkillsCount,
    fullLearnedSkills,
    currentCultivatingSkill,
    currentCultivatingSkillInfo,
    cultivationSpeed,
    learnSkill,
    addSkillProgress,
    addProgressToCurrentLayer,
    setCurrentCultivatingSkill,
    setCultivationSpeed,
    cultivateWithSkillPoints
  }
})
