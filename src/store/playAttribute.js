import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { actionData } from './playAction'
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
    if (type === 'frame') {
      val = val / 100
    }

    if (attrTarget === 'EXP' && keyTarget === 'val') {
      // 计算新的经验值，修复精度问题
      let newValue = Number((this.EXP.val + val).toFixed(2))
      
      // 确保动作列表已初始化
      if (actionData().actionList.length === 0) {
        actionData().init()
      }
      
      // 经验值达到上限，触发等级提升
      if (newValue >= this.EXP.max) {
        // 处理等级提升逻辑
        if (this.EXP.stageLevel < this.EXP.stages[this.EXP.stage].levels.length - 1) {
          // 当前阶段内还有等级，提升等级
          this.EXP.stageLevel += 1
          // 更新经验值上限为下一等级的max值
          this.EXP.max = this.EXP.stages[this.EXP.stage].levels[this.EXP.stageLevel].max
          // 处理经验值溢出，修复精度问题
          this.EXP.val = Number((newValue - this.EXP.max).toFixed(2))
        } else {
          // 当前阶段已达上限，经验值不再增加
          this.EXP.val = this.EXP.max
        }
        
        // 显示tp动作
        const tpAction = actionData().actionList.find(action => action.name === 'tp')
        if (tpAction) {
          tpAction.visibility = true
        }
      } else {
        // 经验值正常增加，修复精度问题
        this.EXP.val = newValue
      }
      // 经验值增加永远不会返回错误
      return
    }

    // 其他属性处理
    if (attrTarget === 'EP' && keyTarget === 'val') {
      // 特殊处理EP属性，允许降低到0以下，修复精度问题
      this[attrTarget][keyTarget] = Number((this[attrTarget][keyTarget] + val).toFixed(2))
      // 确保EP不会低于0
      if (this[attrTarget][keyTarget] < 0) {
        this[attrTarget][keyTarget] = 0
      }
      return
    }

    // 其他属性的常规处理
    const newValue = Number((this[attrTarget][keyTarget] + val).toFixed(2))
    if (newValue < 0) {
      return new Error('no')
    }

    this[attrTarget][keyTarget] = newValue
    return
  }

  function regeneration() {
    const list = ['QB', 'EP', 'MP',]
    list.map(m => {
      //属性自动回复，修复精度问题
      if (this[m].val < this[m].max) {
        const val = this[m].perSecond / 100
        const newValue = Number((this[m].val + val).toFixed(2))
        this[m].val = newValue < this[m].max ? newValue : this[m].max
      }
    })
  }
  return { EXP, Life, QB, EP, MP, SE, CHA, CP, SS, SP, setAttr, regeneration }
})

