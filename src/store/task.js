import { defineStore } from 'pinia'
import {ref,computed} from 'vue'



export const task  = defineStore('task', () => {
  const list = ref([{
      name:'xzxrmkkkdjjdajiodj'
  }])




  
  
  return { list }
})

