<script setup>
// import {ref} from 'vue'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useMainStore ,executionList} from '../store/store'

import layout from '../layout/index.vue'
const mainDate = useMainStore();
const action =executionList()
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
    val+=perScond/100
    if (val<capacity) {
       item.Proficiency.val= Number(val);
    }else{
      item.Proficiency.val= Number(val)-capacity;
      item.Proficiency.capacity=((1+levelRate)*capacity).toFixed(0)
      item.Proficiency.level+=1

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
