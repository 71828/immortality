import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMainStore } from '@/store/store'

export const log = defineStore('log', () => {
  const displayList = ref([])
  const MAX_LOGS = 100 // 限制最大日志数量

  // 优化后的日志添加方法
  const addLog = function (event) {
    // 事件类型映射，便于管理和扩展
    const eventTypes = {
      ACTION_COMPLETE: { 
        type: 'success', 
        defaultTitle: 'Action Completed' 
      },
      EXPERIENCE_FULL: { 
        type: 'info', 
        defaultTitle: 'Cultivation Full' 
      },
      SYSTEM_NOTICE: { 
        type: 'notice', 
        defaultTitle: 'System Notice' 
      }
    }

    const eventConfig = eventTypes[event.type] || eventTypes.SYSTEM_NOTICE
    
    const log = {
      id: Date.now(), // 唯一标识
      date: useMainStore().fromatDay,
      type: eventConfig.type,
      title: event.title || eventConfig.defaultTitle,
      description: event.description || '', // 详细描述
      actionName: event.actionName || '', // 相关动作名称（如果有）
      experience: event.experience || 0 // 相关修为（如果有）
    }

    // 添加到日志列表开头
    displayList.value.unshift(log)
    
    // 限制日志数量，超过则移除最旧的
    if (displayList.value.length > MAX_LOGS) {
      displayList.value = displayList.value.slice(0, MAX_LOGS)
    }
  }

  return { displayList, addLog }
})

