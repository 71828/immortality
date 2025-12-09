import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getSkillConfigById } from '@/config/skillConfigs'
// 导入属性store
import { playAttribute } from './playAttribute'
import Decimal from 'decimal.js'

export const skillStore = defineStore('skill', () => {
    // 已学习的功法列表 - 存储功法ID和各层级进度
    const skills = ref([])
    //自动修炼功法列表 - 存储自动修炼的功法ID
    const autoCultivateSkills = ref([])
    //自动修炼功法数量上限
    const maxAutoCultivateSkills = ref(1)
    const cultivationSpeed = ref(10.0)
    //添加功法到skills
    function addSkill(skillId) {
        const skillConfig = getSkillConfigById(skillId)
        if (skillConfig) {
            skills.value.push({
                skillId,
                name: skillConfig.name,
                description: skillConfig.description,
                type: skillConfig.type,
                state: 'unlocked',
                currentLayer: 0,
                layers: skillConfig.layers.map(layer => ({
                    layer: layer.layer,
                    progress: 0,
                    maxProgress: layer.maxProgress,
                    effects: layer.effects,
                })),
                
            })
            console.log(skills.value);

        }
    }
    //添加功法对象到autoCultivateSkills
    function addAutoCultivateSkill(skillId) {
        const skill = skills.value.find(skill => skill.skillId === skillId)
        if (!skill) {
            console.error(`Skill with ID ${skillId} not found`)
            return
        }
        // 检查是否已达最大自动修炼功法数量
        if (autoCultivateSkills.value.length >= maxAutoCultivateSkills.value) {
            // 移除最早添加的功法
            autoCultivateSkills.value.shift()
        }
        if (!autoCultivateSkills.value.includes(skill)) {
            autoCultivateSkills.value.push(skill)
        }
    }

    //移除功法从autoCultivateSkills
    function removeAutoCultivateSkill(skillId) {
        autoCultivateSkills.value = autoCultivateSkills.value.filter(skill => skill.skillId !== skillId)
    }
    //自动修炼方法 - 自动修炼已学习的功法
    function autoCultivate(fps) {
        // 检查是否有功法需要自动修炼
        if (autoCultivateSkills.value.length === 0) {
            return
        }
        //判断功法点是否足够
        const { SPT } = playAttribute()
        if (SPT.val < 1) {
            return
        }
        autoCultivateSkills.value.forEach(skill => {
            if (skill) {
                const layerProgress = skill.layers[skill.currentLayer]
                // 检查是否已到最大层级
                if (skill.currentLayer >= skill.layers.length) {
                    skill.state = 'cultivated'
                    return
                }
                if (layerProgress.progress >= layerProgress.maxProgress) {

                    layerProgress.progress = layerProgress.maxProgress
                    skill.currentLayer += 1
                } else {
                    const progressIncrement = new Decimal(cultivationSpeed.value).div(new Decimal(fps)).toNumber()

                    
                    layerProgress.progress = new Decimal(layerProgress.progress).add(progressIncrement).toNumber()
                    SPT.val -= progressIncrement
                }


            }
        })
    }
    //初始添加id1和id2功法
    addSkill(1)
    addSkill(2)
    // 自动修炼id1和id2功法

    return {
        skills,
        cultivationSpeed,
        autoCultivateSkills,
        maxAutoCultivateSkills,
        addSkill,
        addAutoCultivateSkill,
        removeAutoCultivateSkill,
        autoCultivate,
    }
})
