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
    let { level, val, perSecond, capacity, levelRate, maxLevel } = item.Proficiency
    const { frameChanges, levelChanges } = item
    // const notExecution = frameChanges.find(m => ((playAttr[m.attrTarget][m.keyTarget] * 100 + m.perSecond) < 0))
    // if (notExecution) {

    //   //item.Proficiency.efficiency = (playAttr[notExecution.attrTarget].perSecond / Math.abs(notExecution.perSecond)).toFixed(2) * 100
    //   // item.isExecution=false
    //   // executionList().list = []
    //   return
    // } else {
    //   //item.Proficiency.efficiency = 100
    // }
    val += perSecond / 100
    if (val < capacity) {
      // item.Proficiency.val = Number(val);
      if (frameChanges.length) {

        
        
        const error =frameChanges.find(m => ( playAttr.setAttr('frame', m.attrTarget, m.keyTarget, m.perSecond)) ) 

        if (error) {
          return
        }
        item.Proficiency.val = Number(val);
      }
    } else {
      if (level < maxLevel || maxLevel === 0) {
        item.Proficiency.val = Number(val) - capacity;
        item.Proficiency.capacity = ((1 + levelRate) * capacity)
        item.Proficiency.level += 1
        if (item.Proficiency.logForId) {
          log().addLog(item.Proficiency.logForId)
        }
        if (item.Proficiency.levelCallback) {
          item.Proficiency.levelCallback(item)
        }
      }
      if (levelChanges.length) {
        //属性执行变动事件列表
        levelChanges.map(m => {
          playAttr.setAttr('level', m.attrTarget, m.keyTarget, m.perLevel)
        })
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
