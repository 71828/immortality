import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Log from '../layout/components/log.vue'



export const playAttribute = defineStore('playAttribute', () => {
  const EXP = ref({
    name: 'xw',
    val: 0,
    max: 9,
    stage: 0,
    stageLevel: 0,
    stages: [{
      levels: [{
        name: 'fr',
        max: 9,
      }]
    }, {
      levels: [{
        name: 'lq1',
        max: 19,
      }, {
        name: 'lq2',
        max: 39,
      }, {
        name: 'lq3',
        max: 59,
      }, {
        name: 'lq4',
        max: 79,
      }, {
        name: 'lq5',
        max: 99,
      }, {
        name: 'lq6',
        max: 119,
      },]
    }]
  })
  const Life = ref({
    name: 'Life',
    baseVal: 10,
    max: 60,
  })
  const QB = ref({
    name: 'q',
    val: 5,
    max: 5,
    perSecond: 0.1,
    visable: true,
    haveMax: true,
  })

  const EP = ref({
    name: 'j',
    val: 10,
    max: 10,
    perSecond: 0.1,
    visable: true,
    haveMax: true,
  })
  const MP = ref({
    name: 'ff',
    val: 100,
    max: 100,
    perSecond: 1,
    visable: false,
    haveMax: true,
  })
  const SE = ref({
    name: 'zy',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false,
  })
  const CHA = ref({
    name: 'ml',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false,
  })
  const CP = ref({
    name: 'wx',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false,
  })
  const SS = ref({
    name: 'ss',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false,
  })
  const SP = ref({
    name: 'ys',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false,
  })

  function setAttr(type, attrTarget, keyTarget, val, ) {
    if (attrTarget === 'EXP') {

    }
    if (type === 'frame') {

      val = val / 100
    }


    if (this[attrTarget][keyTarget] + val < 0) {

      return  new Error('no')
    }




    this[attrTarget][keyTarget] += val
    return

  }

  function regeneration() {
    const list = ['QB', 'EP', 'MP',]
    list.map(m => {
      //属性自动回复
      if (this[m].val < this[m].max) {
        const val = this[m].perSecond / 100
        this[m].val = ((this[m].val + val) < this[m].max) ? this[m].val + val : this[m].max
      }
    })
  }
  return { EXP, Life, QB, EP, MP, SE, CHA, CP, SS, SP, setAttr, regeneration }
})

