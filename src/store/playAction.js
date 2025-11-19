import { defineStore } from 'pinia'
import {ref,computed} from 'vue'




export const executionList = defineStore('executionList', () => {
  const list = ref([])
  return { 
    list,  
  }
})

export const actionData = defineStore('actionData', () => {
  const actionList = ref([{
        actionId:1,
        isExecution:false,
        name:'cut',
        Proficiency:{
            level:0,
            val:0,
            perScond:1,
            capacity:3,
            levelRate:0.2,
            maxLevel:0,
        },
        frameChanges:[{
          attrTarget:'MP',
          keyTarget:'max',
          perScond:1,
        },],
        levelChanges:[{
          attrTarget:'HP',
          keyTarget:'max',
          perLevel:1,
        },]

    }])
  return { 
    actionList,  

  }
})


