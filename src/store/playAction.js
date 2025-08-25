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
        name:'砍柴',
        Proficiency:{
            level:0,
            val:0,
            perSecond:1,
            capacity:3,
            levelRate:0.2,
            maxLevel:0,
        },
        frameChanges:[{
          attrTarget:'EP',
          keyTarget:'val',
          perSecond:-3,
        },],
        levelChanges:[{
          attrTarget:'QB',
          keyTarget:'max',
          perLevel:1,
        },]

    }])
  return { 
    actionList,  

  }
})


