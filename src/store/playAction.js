import { defineStore } from 'pinia'
import { ref } from 'vue'
// 导入动作配置
import { actionConfigurations as actionConfigs } from '../config/actionConfigs'
// 导入playAttribute，避免循环依赖
import { playAttribute as playAttributeStore } from './playAttribute'

// 执行列表Store - 管理当前正在执行的动作
export const useExecutionList = defineStore('executionList', () => {
  const executingActions = ref([])

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
    
    if (!isExecuting) {
      // 替换当前执行的动作（每次只允许执行一个动作）
      executingActions.value = [action]
    } else {
      // 如果动作已在执行中，则停止执行
      executingActions.value = []
    }
  }

  /**
   * 清除所有执行中的动作
   */
  function clearExecutingActions() {
    executingActions.value = []
  }

  return {
    executingActions,
    setExecutingAction,
    clearExecutingActions
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
    
    // 只添加id为1的动作
    const actionConfig = actionConfigurations.value.find(item => item.uniqueId === 1)
    
    if (actionConfig) {
      // 复制动作配置，避免直接修改原配置
      const copiedConfig = JSON.parse(JSON.stringify(actionConfig))
      
      // 为tp动作动态添加levelCallback
      if (copiedConfig.name === 'tp') {
        copiedConfig.proficiency.levelCallback = (item) => {
          const playAttr = playAttributeStore();
          // 调用突破方法，突破到下一阶段
          playAttr.breakthrough();
        }
      }
      
      const action = new Action({
        ...copiedConfig,
        id: 0
      })
      actionList.value.push(action)
    }
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
        
        // 为tp动作动态添加levelCallback
        if (newActionConfig.name === 'tp') {
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


