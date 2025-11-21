import { defineStore } from 'pinia'
import {ref,computed} from 'vue'



export const inventory  = defineStore('inventory', () => {
  const equip = ref([{
      
  }])

  const pack = ref([{
      
  }])



  
  
  return { equip,pack }
})

