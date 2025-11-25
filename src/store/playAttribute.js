import { defineStore } from 'pinia'
import {ref,computed} from 'vue'



export const playAttribute = defineStore('playAttribute', () => {
  const EXP = ref({
    name:'修为值',
    val:0,
    levelName:'fr'
  })
  const QB = ref({
    name:'q',
    val:5,
    max:5,
    perSecond:0.1,
    visable:true,
    haveMax:true,
  })

  const EP = ref({
    name:'j',
    val:10,
    max:10,
    perSecond:0.1,
    visable:true,
    haveMax:true,
  })
    const MP = ref({
    name:'ff',
    val:100,
    max:100,
    perSecond:1,
    visable:false,
    haveMax:true,
  })
  const SE = ref({
    name:'zy',
    val:0,
    max:0,
    visable:false,
    haveMax:false,
  })
  const CHA = ref({
    name:'ml',
    val:0,
    max:0,
    visable:false,
    haveMax:false,
  })
  const CP = ref({
    name:'wx',
    val:0,
    max:0,
    visable:false,
    haveMax:false,
  })
  const SS = ref({
    name:'ss',
    val:0,
    max:0,
    visable:false,
    haveMax:false,
  })
  const SP = ref({
    name:'ys',
    val:0,
    max:0,
    visable:false,
    haveMax:false,
  })
  
  
  return { EXP,QB,EP,MP,SE,CHA,CP,SS,SP  }
})

