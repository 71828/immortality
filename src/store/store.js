import { defineStore } from 'pinia'
import {ref,computed} from 'vue'



export const useMainStore = defineStore('counter', () => {
  const mainDate = ref(0)
  const dayforamts=['春','夏','秋','冬']
  const fromatDay =computed(()=>{
      return  parseInt(mainDate.value/100*8/365)+'年-'+dayforamts[parseInt(parseInt(mainDate.value/100*8%365 )/91)] 
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
        name:'引气入体',
        Proficiency:{
            level:0,
            val:0,
            perScond:1,
            capacity:3,
            levelRate:0.2,
            maxLevel:0,
        },
    }])
  return { 
    actionList,  

  }
})
export const playAttribute = defineStore('playAttribute', () => {
  const EXP = ref({
    val:0
  })
  const HP = ref({
    name:'气血',
    val:0,
    max:0,
    ecovery‌:0,
  })
  const MP = ref({
    name:'法力',
    val:0,
    max:0,
    ecovery‌:0,
  })
  const PHY = ref({
    name:'体魄',
    val:0,
    max:0,
    ecovery‌:0,
  })
  const SE = ref({
    name:'真元',
    val:0,
    max:0,
    ecovery‌:0,
  })
  const VE = ref({
    name:'精血',
    val:0,
    max:0,
    ecovery‌:0,
  })
  const CP = ref({
    name:'悟性',
    val:0,
    max:0,
    ecovery‌:0,
  })
  const SS = ref({
    name:'神识',
    val:0,
    max:0,
    ecovery‌:0,
  })
  const SP = ref({
    name:'元神',
    val:0,
    max:0,
    ecovery‌:0,
  })
  
  
  return { EXP,HP,MP,PHY,SE,VE,CP,SS,SP  }
})

