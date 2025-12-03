import { defineStore } from 'pinia'
import { ref } from 'vue'
import { playAttribute } from './playAttribute'

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
  // 动作配置列表
  const actionConfigurations = ref([
    {
      uniqueId: 1,              // 唯一动作ID
      name: 'cutting',          // 动作名称
      proficiency: {            // 动作经验对象 
        executeLimit: 0,          // 执行次数限制，0表示无限制
        executeCount: 0,          // 当前执行次数
        experience: 0,          // 当前动作经验值
        experiencePerSecond: 3,  // 每秒经验获取值
        maxExperience: 3,        // 当前经验上限
        levelUpRate: 0.2,        // 等级提升系数
        efficiency: 100,         // 执行效率 0-100
        logForId: 1,             // 日志ID
        levelCallback: (item) => {
          // 等级提升回调
        }
      },
      frameAttributeChanges: [{
        attributeTarget: 'EP',   // 属性目标
        keyTarget: 'val',        // 属性键
        perSecond: -1.1,         // 每秒变动值
      }, {
        attributeTarget: 'EXP',
        keyTarget: 'val',
        perSecond: 10,           // 每秒变动值
      }],
      levelAttributeChanges: [{
        attributeTarget: 'QB',
        keyTarget: 'max',
        perLevel: 1,             // 每级变动值
      },{
        attributeTarget: 'EXP',
        keyTarget: 'val',
        perLevel: 1,             // 每级变动值
      },]
    },
    {
      uniqueId: 2,              // 唯一动作ID
      name: 'tp',     // 动作名称
      proficiency: {            // 动作经验对象 
        executeLimit: 1,          // 执行次数限制，1表示只能执行一次
        executeCount: 0,          // 当前执行次数
        experience: 0,          // 当前经验值
        experiencePerSecond: 3,  // 每秒经验获取值
        maxExperience: 3,        // 当前经验上限
        levelUpRate: 0.2,        // 等级提升系数
        efficiency: 100,         // 执行效率 0-100
        logForId: 1,             // 日志ID
        levelCallback: (item) => {
          const playAttr = playAttribute();
          // 调用突破方法，突破到下一阶段
          playAttr.breakthrough();
        }
      },
    },
  ])
  
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
    
    // 初始化动作列表，只添加非突破动作
    actionConfigurations.value
      .filter(item => item.name !== 'tp')
      .forEach((item, index) => {
        const action = new Action({
          ...item,
          id: index
        })
        actionList.value.push(action)
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
        const newId = actionList.value.length
        const action = new Action({
          ...actionConfig,
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


