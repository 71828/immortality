<script setup>
// import {ref} from 'vue'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useMainStore } from '@/store/store'
import { playAttribute } from '@/store/playAttribute'
import { executionList } from '@/store/playAction'

const playAttr = playAttribute()
import layout from '../layout/index.vue'
const mainDate = useMainStore();
const intervalId = ref(null);
function init() {
  intervalId.value = setInterval(() => {
    mainDate.increment()
    mainLoop()
  }, 10);
}


function mainLoop() {
  execution()
  regeneration()
}
function regeneration() {
  const list = ['QB','EP','MP',]
  list.map(m=>{
    if (playAttr[m].val<playAttr[m].max) {
      const val = playAttr[m].perSecond / 100      
       playAttr[m].val=((playAttr[m].val+val)<playAttr[m].max)?playAttr[m].val+val:playAttr[m].max
    }
  })
}
function execution() {
  if (executionList().list.length) {
    const item = executionList().list[0]
    let { level, val, perSecond, capacity, levelRate, maxLevel, } = item.Proficiency
    const { frameChanges, levelChanges } = item
    val += perSecond / 100

    if (val < capacity) {
      item.Proficiency.val = Number(val);
      if (frameChanges.length) {
        frameChanges.map(m => {

          
          playAttr[m.attrTarget][m.keyTarget] = (playAttr[m.attrTarget][m.keyTarget]*100+m.perSecond )/100
        })
      }
    } else {
      if (level < maxLevel || maxLevel === 0) {
        item.Proficiency.val = Number(val) - capacity;
        item.Proficiency.capacity = ((1 + levelRate) * capacity)
        item.Proficiency.level += 1
      }
      if (levelChanges.length) {
        levelChanges.map(m => {
          playAttr[m.attrTarget][m.keyTarget] += m.perLevel
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
