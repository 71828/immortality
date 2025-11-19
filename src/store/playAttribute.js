import { defineStore } from 'pinia'
import {ref,computed} from 'vue'



export const playAttribute = defineStore('playAttribute', () => {
  const EXP = ref({
    name:'修为值',
    val:0,
    levelName:'fr'
  })
  const QB = ref({
    name:'qx',
    val:100,
    max:100,
    ecovery‌:0,
    visable:true,
    haveMax:true,
  })

  const EP = ref({
    name:'jl',
    val:100,
    max:100,
    ecovery‌:0,
    visable:true,
    haveMax:true,
  })
    const MP = ref({
    name:'法力',
    val:100,
    max:100,
    ecovery‌:0,
    visable:false,
    haveMax:true,
  })
  const SE = ref({
    name:'真元',
    val:0,
    max:0,
    ecovery‌:0,
    visable:false,
    haveMax:false,
  })
  const CHA = ref({
    name:'魅力',
    val:0,
    max:0,
    ecovery‌:0,
    visable:false,
    haveMax:false,
  })
  const CP = ref({
    name:'悟性',
    val:0,
    max:0,
    ecovery‌:0,
    visable:false,
    haveMax:false,
  })
  const SS = ref({
    name:'神识',
    val:0,
    max:0,
    ecovery‌:0,
    visable:false,
    haveMax:false,
  })
  const SP = ref({
    name:'元神',
    val:0,
    max:0,
    ecovery‌:0,
    visable:false,
    haveMax:false,
  })
  
  
  return { EXP,QB,EP,MP,SE,CHA,CP,SS,SP  }
})

