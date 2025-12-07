import { defineStore } from 'pinia'
import { ref } from 'vue'
// 导入动作配置
import { actionConfigurations as actionConfigs } from '../config/actionConfigs'
// 导入playAttribute，避免循环依赖
import { playAttribute as playAttributeStore } from './playAttribute'
// 导入任务store，用于更新任务进度
import { task as taskStore } from './task'
// 导入Decimal类，用于精确计算
import Decimal from 'decimal.js'

// 导入日志store，用于记录动作日志
import { log, log as logStore } from './log'

// 执行列表Store - 管理当前正在执行的动作
export const useExecutionList = defineStore('executionList', () => {
  const executingActions = ref([])
  // 最大同时可执行的动作数量
  const maxConcurrentActions = ref(1)

  /**
   * 设置执行的动作
   * @param {Object} action - 要执行的动作对象
   */
  function setExecutingAction(action) {
    if (!action || !action.uniqueId) {
      console.error('无效的动作对象')
      return
    }

    const isExecuting = executingActions.value.some(ele => ele.uniqueId === action.uniqueId)
    
    if (isExecuting) {
      // 如果动作已在执行中，则从执行列表中移除
      executingActions.value = executingActions.value.filter(ele => ele.uniqueId !== action.uniqueId)
    } else {
      // 如果动作未在执行中，则添加到执行列表
      if (executingActions.value.length >= maxConcurrentActions.value) {
        //移除最先加入的动作
        executingActions.value.shift()
      }
      
      // 添加到执行列表中
      executingActions.value.push(action)
      // 更新动作执行计数任务进度
      const tasks = taskStore()
      tasks.updateActionTaskProgress(action.uniqueId)
    }
  }

  /**
   * 设置最大同时可执行的动作数量
   * @param {number} maxCount - 最大动作数量
   */
  function setMaxConcurrentActions(maxCount) {
    if (typeof maxCount === 'number' && maxCount > 0) {
      maxConcurrentActions.value = maxCount
      // 如果当前执行的动作数量超过新的最大值，则移除多余的动作
      if (executingActions.value.length > maxConcurrentActions.value) {
        executingActions.value = executingActions.value.slice(0, maxConcurrentActions.value)
      }
    }
  }

  /**
   * 清除所有执行中的动作
   */
  function clearExecutingActions() {
    executingActions.value = []
  }

  /**
   * 执行当前执行列表中的动作
   * @param {Object} actionDataStore - 动作数据store实例
   * @param {number} fps - 当前帧率，用于精确计算经验和资源消耗
   */ 
  function executeActions(actionDataStore, fps = 100) {
    // 获取日志store实例
    const logStoreInstance = logStore()
    const playAttr = playAttributeStore()
    
    // 如果没有执行中的动作，直接返回
    if (!executingActions.value.length) {
      return
    }

    // 计算每帧的时间间隔（秒）
    
    // 遍历所有执行中的动作（倒序遍历，方便移除元素）
    for (let i = executingActions.value.length - 1; i >= 0; i--) {
      
      const item = executingActions.value[i]
      const { frameAttributeChanges, levelAttributeChanges } = item
      
      // 检查动作是否达到执行次数限制
      if (item.proficiency.executeLimit > 0 && item.proficiency.executeCount >= item.proficiency.executeLimit) {
        // 从动作列表中移除该动作
        actionDataStore.removeAction(item.uniqueId)
        // 从执行列表中移除该动作
        executingActions.value.splice(i, 1)
        continue
      }

      
      // 检查当前经验是否达到上限，进行等级提升处理
      if (item.proficiency.experience >= item.proficiency.maxExperience) {
   
        item.proficiency.experience = Number((item.proficiency.experience - item.proficiency.maxExperience).toFixed(2))
        item.proficiency.maxExperience = Number((item.proficiency.maxExperience * (1 + item.proficiency.levelUpRate)).toFixed(2))
        
        // 执行等级提升属性变化
        if (levelAttributeChanges.length) {
          for (const change of levelAttributeChanges) {
            playAttr.setAttr( change.attributeTarget, change.keyTarget, change.perLevel)
          }
        }
        
        // 增加执行次数
        item.proficiency.executeCount += 1
        
        // 检查动作是否有执行次数限制
        if (item.proficiency.executeLimit > 0 && item.proficiency.executeCount >= item.proficiency.executeLimit) {
          // 从动作列表中移除该动作
          actionDataStore.removeAction(item.uniqueId)
          // 从执行列表中移除该动作
          executingActions.value.splice(i, 1)
          continue
        }
        
        // 触发等级回调
        if (item.proficiency.logForId) {
          logStoreInstance.addLog(item.proficiency.logForId)
        }
        if (item.proficiency.levelCallback) {
          item.proficiency.levelCallback(item)
        }
        
        continue
      }
      
      // 检查所有消耗资源是否足够
      let canExecute = true
      
      for (const change of frameAttributeChanges) {
        // 只检查消耗性变化（perSecond为负数）
        if (change.perSecond < 0) {
          const attrTarget = change.attributeTarget
          const keyTarget = change.keyTarget
          const val = change.perSecond

          
          // 获取当前属性值
          let currentValue = playAttr[attrTarget][keyTarget]

  
          
          const frameCost = new Decimal(val).abs().div(fps).toNumber()
          

          // 检查资源是否足够
          if (currentValue < frameCost) {
            canExecute = false
            break
          }
        }
      }
      
      if (!canExecute) {
        continue
      }
    
      
      // 根据帧率更新动作经验，修复精度问题
      const experienceGain = new Decimal(item.proficiency.experiencePerSecond).div(fps).toNumber()
      item.proficiency.experience = Number((item.proficiency.experience + experienceGain).toFixed(2))
      
      // 执行每帧属性变化
      if (frameAttributeChanges.length) {
        let hasError = false
        for (const change of frameAttributeChanges) {
   
          
          // 根据帧率调整属性变化值
          const adjustedValue = new Decimal(change.perSecond).div(fps).toNumber()
          
          const result = playAttr.setAttr( change.attributeTarget, change.keyTarget, adjustedValue)          
          if (result instanceof Error) {
            hasError = true
            break
          }
        }
        
        if (hasError) {
          continue
        }
      }
    }
  }

  return {
    executingActions,
    maxConcurrentActions,
    setExecutingAction,
    setMaxConcurrentActions,
    clearExecutingActions,
    executeActions
  }
})

// 动作数据Store - 管理游戏中的所有动作
export const useActionData = defineStore('actionData', () => {
  // 动作配置列表 - 使用从外部文件导入的配置
  const actionConfigurations = ref([...actionConfigs])
  
  const actionList = ref([])

  /**
   * 动作类 - 用于创建动作实例
   */
  class Action {
    constructor(params) {
      const {
        name,
        uniqueId,
        visibility = false,
        proficiency,
        frameAttributeChanges = [],
        levelAttributeChanges = []
      } = params
      
      this.name = name
      this.uniqueId = uniqueId
      this.visibility = visibility
      this.proficiency = {
        ...proficiency,
        executeLimit: proficiency.executeLimit || 0,
        executeCount: proficiency.executeCount || 0
      }
      // 确保frameAttributeChanges和levelAttributeChanges始终是数组
      this.frameAttributeChanges = frameAttributeChanges
      this.levelAttributeChanges = levelAttributeChanges
    }
  }

  /**
   * 初始化动作列表
   */
  function initialize() {
    // 清空现有列表
    actionList.value = []
    
    // 要添加的初始动作ID列表
    const initialActionIds = [1, 3, 4, 5] // 添加砍树动作、功法修炼动作、挖矿动作和休息动作
    
    // 遍历要添加的初始动作ID
    initialActionIds.forEach((actionId, index) => {
      const actionConfig = actionConfigurations.value.find(item => item.uniqueId === actionId)
      
      if (actionConfig) {
        // 复制动作配置，避免直接修改原配置
        const copiedConfig = JSON.parse(JSON.stringify(actionConfig))
        
        // 为砍树动作动态添加levelCallback，用于更新任务进度
        if (copiedConfig.name === 'chopping') {
          copiedConfig.proficiency.levelCallback = (item) => {
            // 调用任务store的updateActionLevelTaskProgress方法更新任务进度
            const tasks = taskStore();
            // 这里需要计算当前等级，假设executeCount就是等级
            const currentLevel = item.proficiency.executeCount;
            tasks.updateActionLevelTaskProgress(item.uniqueId, currentLevel);
          }
        }
        
        // 为突破动作动态添加levelCallback
        if (copiedConfig.name === 'breakthrough') {
          copiedConfig.proficiency.levelCallback = (item) => {
            const playAttr = playAttributeStore();
            // 调用突破方法，突破到下一阶段
            playAttr.breakthrough();
          }
        }
        
        // 为功法修炼动作动态添加levelCallback（如果需要）
        if (copiedConfig.name === 'skillCultivation') {
          copiedConfig.proficiency.levelCallback = (item) => {
            // 可以在这里添加功法修炼等级提升的特殊逻辑
            // 例如：增加功法点上限或提升修炼效率
          }
        }
        
        const action = new Action({
          ...copiedConfig,
          id: index
        })
        actionList.value.push(action)
      }
    })
  }

  /**
   * 添加动作到列表
   * @param {number} actionId - 动作唯一ID
   */
  function addAction(actionId) {
    if (typeof actionId !== 'number') {
      console.error('无效的动作ID')
      return
    }

    const actionConfig = actionConfigurations.value.find(item => item.uniqueId === actionId)
    
    if (actionConfig) {
        const isAlreadyAdded = actionList.value.some(item => item.uniqueId === actionId)
        
        if (!isAlreadyAdded) {
            // 复制动作配置，避免直接修改原配置
            const newActionConfig = JSON.parse(JSON.stringify(actionConfig))
            
            // 为砍树动作动态添加levelCallback，用于更新任务进度
        if (newActionConfig.name === 'chopping') {
            newActionConfig.proficiency.levelCallback = (item) => {
                // 调用任务store的updateActionLevelTaskProgress方法更新任务进度
                const tasks = taskStore();
                // 这里需要计算当前等级，假设executeCount就是等级
                const currentLevel = item.proficiency.executeCount;
                tasks.updateActionLevelTaskProgress(item.uniqueId, currentLevel);
            }
        }
            
            // 为突破动作动态添加levelCallback
            if (newActionConfig.name === 'breakthrough') {
                newActionConfig.proficiency.levelCallback = (item) => {
                    const playAttr = playAttributeStore();
                    // 调用突破方法，突破到下一阶段
                    playAttr.breakthrough();
                }
            }
            
            const newId = actionList.value.length
            const action = new Action({
                ...newActionConfig,
                id: newId
            })
            actionList.value.push(action)
        }
    }
  }

  /**
   * 从列表中移除动作
   * @param {number} actionId - 动作唯一ID
   */
  function removeAction(actionId) {
    if (typeof actionId !== 'number') {
      console.error('无效的动作ID')
      return
    }

    const index = actionList.value.findIndex(item => item.uniqueId === actionId)
    if (index !== -1) {
      actionList.value.splice(index, 1)
    }
  }

  return {
    actionList,
    initialize,
    addAction,
    removeAction
  }
})


