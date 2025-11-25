import { defineStore } from 'pinia'
import {ref,computed} from 'vue'



export const useMainStore = defineStore('counter', () => {
  const mainDate = ref(0)
  const dayforamts=['春','夏','秋','冬']
  const fromatDay =computed(()=>{
      return  parseInt(mainDate.value/100*8/365+1)+'年-'+dayforamts[parseInt(parseInt(mainDate.value/100*8%365 )/91)] 
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


