<script setup>
// import {ref} from 'vue'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useMainStore } from '@/store/store'
import { playAttribute } from '@/store/playAttribute'
import { executionList, actionData } from '@/store/playAction'
import { log } from '@/store/log'

const playAttr = playAttribute()
import layout from '../layout/index.vue'
const mainDate = useMainStore();
const intervalId = ref(null);
function init() {
  intervalId.value = setInterval(() => {
    mainDate.increment()
    mainLoop()
  }, 10);

  if (actionData().actionList.length == 0) {
    actionData().init()
  }

}


function mainLoop() {
  execution()
  playAttr.regeneration()
}


function execution() {
  if (executionList().list.length) {
    const item = executionList().list[0]
    const { frameChanges, levelChanges } = item
    
    // 检查动作是否达到执行次数限制
    if (item.executeLimit && item.executeCount >= item.executeLimit) {
      // 隐藏动作，不再显示
      item.visibility = false
      // 清除执行队列，停止执行
      executionList().list = []
      return
    }
    
    // 直接更新动作经验值，修复精度问题
    item.Proficiency.val = Number((item.Proficiency.val + item.Proficiency.perSecond / 100).toFixed(2))
    
    if (item.Proficiency.val < item.Proficiency.capacity) {
      // 执行每帧属性变化
      if (frameChanges.length) {
        // 遍历所有frameChanges，不使用find方法，因为我们需要执行所有变化
        let hasError = false
        for (const change of frameChanges) {
          const result = playAttr.setAttr('frame', change.attrTarget, change.keyTarget, change.perSecond)
          if (result instanceof Error) {
            hasError = true
            break
          }
        }
        
        if (hasError) {
          return
        }
      }
    } else {
      // 动作等级提升
      if (item.Proficiency.level < item.Proficiency.maxLevel || item.Proficiency.maxLevel === 0) {
        // 修复精度问题
        item.Proficiency.val = Number((item.Proficiency.val - item.Proficiency.capacity).toFixed(2))
        item.Proficiency.capacity = Number((item.Proficiency.capacity * (1 + item.Proficiency.levelRate)).toFixed(2))
        item.Proficiency.level += 1
        if (item.Proficiency.logForId) {
          log().addLog(item.Proficiency.logForId)
        }
        if (item.Proficiency.levelCallback) {
          item.Proficiency.levelCallback(item)
        }
      }
      
      // 执行等级提升属性变化
      if (levelChanges.length) {
        for (const change of levelChanges) {
          playAttr.setAttr('level', change.attrTarget, change.keyTarget, change.perLevel)
        }
      }
      
      // 检查动作是否有执行次数限制
      if (item.executeLimit) {
        // 增加执行次数
        item.executeCount += 1
        
        // 检查是否达到执行次数限制
        if (item.executeCount >= item.executeLimit) {
          // 隐藏动作，不再显示
          item.visibility = false
          // 清除执行队列，停止执行
          executionList().list = []
          return
        }
      } else if (item.name === 'tp' && item.Proficiency.level >= item.Proficiency.maxLevel) {
        // tp动作特殊处理（兼容旧逻辑）
        item.executeCount += 1
        item.visibility = false
        executionList().list = []
      }
    }
  }
}
onMounted(() => {
  init()

});

onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});


</script>

<template>
  <div>
    <layout />

  </div>
</template>

<style scoped></style>
