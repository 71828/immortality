import { defineStore } from 'pinia'
import {ref,computed} from 'vue'



export const log  = defineStore('log', () => {
  const list = ref([])




  
  
  return { list }
})

