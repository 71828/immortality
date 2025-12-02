import { defineStore } from 'pinia'
import {ref,computed} from 'vue'



export const useMainStore = defineStore('counter', () => {
  const mainDate = ref(0)
  const dayforamts=['c','cc','ccc','ccccc']
  const fromatDay =computed(()=>{
      return  parseInt(mainDate.value/100*8/365+1)+'y-'+dayforamts[parseInt(parseInt(mainDate.value/100*8%365 )/91)] 
  })
  const year =computed(()=>{
      return parseInt(mainDate.value/100*8/365+1)
  })

  function increment() {
    mainDate.value++ 
  }
  return { 
    year,
    mainDate,  
    fromatDay,
    increment
  }
})


