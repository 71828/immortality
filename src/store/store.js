import { defineStore } from 'pinia'
import {ref,computed} from 'vue'



export const useMainStore = defineStore('counter', () => {

  const mainDate = ref(0)
  const fromatDay =computed(()=>{
      return  parseInt(mainDate.value/50*8/365)+'年'+parseInt(mainDate.value/50*8%365 ) +'日'
  })

  function increment() {
    mainDate.value++
  }

  return { 
    mainDate,  
    fromatDay,
    increment
  }
})

export const playAttribute = defineStore('playAttribute', () => {
  const cultivation = ref(0)
  
  return { cultivation,  }
})

