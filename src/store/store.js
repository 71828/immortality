import { defineStore } from 'pinia'
import {ref} from 'vue'



export const useMainStore = defineStore('counter', () => {
  const mainDate = ref(0)


  function increment() {
    mainDate.value++
  }

  return { mainDate, increment }
})