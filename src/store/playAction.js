import { fa } from 'element-plus/es/locales.mjs'
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
        id:1,
        isExecution:false,   //执行标识符
        name:'cut',        //名称
        Proficiency:{      //动作经验对象 
            level:0,       //动作等级
            val:0,         //当前动作经验值
            perSecond:1,    //每秒变动值
            capacity:3,     //当前经验上限
            levelRate:0.2,
            maxLevel:0,
            efficiency:100,    //执行效率 0-100
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


