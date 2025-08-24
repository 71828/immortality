<script setup>
// import {ref} from 'vue'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useMainStore } from '@/store/store'
import { playAttribute } from '@/store/playAttribute'
import { executionList } from '@/store/playAction'

const playAttr =playAttribute()
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
  if (executionList().list.length) {
    const item=executionList().list[0]
    let {level,val,perScond,capacity,levelRate, maxLevel,} =item.Proficiency
    const {frameChanges,levelChanges}=item
    val+=perScond/100

    if (val<capacity) {
       item.Proficiency.val= Number(val);
        if (frameChanges.length) {
          frameChanges.map(m=>{
            playAttr[m.attrTarget][m.keyTarget]+=m.perScond/100
          })
        }
    }else{
      if(level<maxLevel||maxLevel===0){
        item.Proficiency.val= Number(val)-capacity;
        item.Proficiency.capacity=((1+levelRate)*capacity).toFixed(0)
        item.Proficiency.level+=1
      }
      if (levelChanges.length) {
          levelChanges.map(m=>{
            console.log(m);
            
            playAttr[m.attrTarget][m.keyTarget]+=m.perLevel
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
    <layout/>
    
 </div>
</template>

<style scoped>

</style>
