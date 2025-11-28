import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useMainStore } from '@/store/store'


export const log = defineStore('log', () => {
  const displayList = ref([])



  const addLog = function (id) {
    let log ={
      date :useMainStore().fromatDay
    }
    switch (id) {
      case 1:
        log.title = 'eeeeeeeeeeeeeeeeeee'
        break;

      default:
        break;
    }
     displayList.value.unshift(log)
  }


  return { displayList, addLog }
})

