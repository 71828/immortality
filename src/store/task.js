import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// 任务类型枚举
export const TaskTypes = {
  ACTION_COUNT: 'action_count',
  ACTION_LEVEL: 'action_level',
  BREAKTHROUGH: 'breakthrough'
}

// 任务状态枚举
export const TaskStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
}

export const task = defineStore('task', () => {
  /**
   * 任务列表 - 存储所有任务配置和状态
   * @type {Array<Object>}
   */
  const list = ref([
    {
      id: 1,
      name: 'Chopping Skill Level 5',
      description: 'Upgrade the chopping skill to level 5 to master advanced chopping techniques',
      type: TaskTypes.ACTION_LEVEL,
      status: TaskStatus.IN_PROGRESS,
      progress: {
        current: 0,
        target: 5,
        actionId: 1 // 关联切割动作ID
      },
      nextTaskId: 2 // 完成后解锁的下一个任务ID
    },
    {
      id: 2,
      name: 'Breakthrough to Next Stage',
      description: 'Reach maximum cultivation to break through to the next stage',
      type: TaskTypes.BREAKTHROUGH,
      status: TaskStatus.NOT_STARTED,
      progress: {
        current: 0,
        target: 1
      },
      nextTaskId: null // 最后一个任务
    }
  ])

  /**
   * 获取当前活跃的任务
   * @returns {Object|null} 当前活跃任务
   */
  const activeTask = computed(() => {
    // 优先返回进行中的任务
    const inProgressTask = list.value.find(task => task.status === TaskStatus.IN_PROGRESS)
    if (inProgressTask) return inProgressTask
    
    // 如果没有进行中的任务，返回第一个未开始的任务
    return list.value.find(task => task.status === TaskStatus.NOT_STARTED) || null
  })

  /**
   * 更新任务进度
   * @param {number} taskId - 任务ID
   * @param {number} value - 进度变化值
   */
  function updateTaskProgress(taskId, value) {
    const task = list.value.find(t => t.id === taskId)
    if (!task || task.status === TaskStatus.COMPLETED) return

    // 更新进度
    task.progress.current += value
    
    // 确保进度不超过目标
    if (task.progress.current >= task.target) {
      task.progress.current = task.target
      completeTask(taskId) // 自动完成任务
    }
  }

  /**
   * 完成任务
   * @param {number} taskId - 任务ID
   */
  function completeTask(taskId) {
    const task = list.value.find(t => t.id === taskId)
    if (!task || task.status === TaskStatus.COMPLETED) return

    // 更新任务状态为已完成
    task.status = TaskStatus.COMPLETED
    
    // 自动解锁下一个任务
    if (task.nextTaskId) {
      const nextTask = list.value.find(t => t.id === task.nextTaskId)
      if (nextTask) {
        nextTask.status = TaskStatus.IN_PROGRESS
      }
    }
  }

  /**
   * 根据动作执行更新任务进度
   * @param {number} actionId - 动作ID
   */
  function updateActionTaskProgress(actionId) {
    // 更新所有关联该动作的进行中任务
    list.value.forEach(task => {
      if (task.status === TaskStatus.IN_PROGRESS && 
          task.type === TaskTypes.ACTION_COUNT && 
          task.progress.actionId === actionId) {
        updateTaskProgress(task.id, 1)
      }
    })
  }

  /**
   * 根据动作等级更新任务进度
   * @param {number} actionId - 动作ID
   * @param {number} level - 当前动作等级
   */
  function updateActionLevelTaskProgress(actionId, level) {
    // 更新所有关联该动作的进行中任务
    list.value.forEach(task => {
      if (task.status === TaskStatus.IN_PROGRESS && 
          task.type === TaskTypes.ACTION_LEVEL && 
          task.progress.actionId === actionId) {
        // 直接设置当前进度为动作等级
        task.progress.current = level
        // 检查是否完成
        if (level >= task.progress.target) {
          completeTask(task.id)
        }
      }
    })
  }

  /**
   * 更新突破任务进度
   */
  function updateBreakthroughTaskProgress() {
    // 更新所有进行中的突破任务
    list.value.forEach(task => {
      if (task.status === TaskStatus.IN_PROGRESS && 
          task.type === TaskTypes.BREAKTHROUGH) {
        updateTaskProgress(task.id, 1)
      }
    })
  }

  // 监听任务列表变化，自动推进任务
  watch(() => list.value.map(task => task.status), (newStatuses) => {
    // 可以在这里添加自动推进的额外逻辑
  })

  return {
    list,
    activeTask,
    updateActionTaskProgress,
    updateActionLevelTaskProgress,
    updateBreakthroughTaskProgress
  }
})

