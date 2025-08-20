<script setup>
// import {ref} from 'vue'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useMainStore } from '../store/store'
import layout from '../layout/index.vue'
const mainDate = useMainStore();
// const   FRAM_ERATE =ref(1)
    const intervalId = ref(null);

    function init() {

      intervalId.value = setInterval(() => {
        mainDate.increment()
        mainLoop()




      }, 20);



    }


function mainLoop(params) {
  
}

 
onMounted(() => {
  

});
 
onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

init()
</script>

<template>
 <div>
    <layout/>
    
 </div>
</template>

<style scoped>

</style>
