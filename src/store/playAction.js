import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const executionList = defineStore('executionList', () => {
  const list = ref([])

  function setExecution(action) {
    const onExecution = list.value.find(ele => ele.id == action.id)

    list.value = []
    if (!onExecution) {
      list.value.push(action)
    }
  }

  return {
    list, setExecution
  }
})

export const actionData = defineStore('actionData', () => {
  const actions = ref([
    {
      name: 'cut',
      visibility: true,        //名称
      Proficiency: {      //动作经验对象 
        level: 0,       //动作等级
        val: 0,         //当前动作经验值
        perSecond: 3,    //每秒变动值
        capacity: 3,     //当前经验上限
        levelRate: 0.2,
        maxLevel: 0,
        efficiency: 100,
        logForId: 1,
        levelCallback: (item) => {

        }   //执行效率 0-100
      },
      frameChanges: [{
        attrTarget: 'EP',
        keyTarget: 'val',
        perSecond: -3.1,
      },],
      levelChanges: [{
        attrTarget: 'QB',
        keyTarget: 'max',
        perLevel: 1,
      }, {
        attrTarget: 'EXP',
        keyTarget: 'val',
        perLevel: 3,
      },]
    },
    {
      name: 'tp',
      visibility: true,        //名称
      Proficiency: {      //动作经验对象 
        level: 0,       //动作等级
        val: 0,         //当前经验值
        perSecond: 3,    //每秒变动值
        capacity: 3,     //当前经验上限
        levelRate: 0.2,
        maxLevel: 0,
        efficiency: 100,
        logForId: 1,
        levelCallback: (item) => {

        }   //执行效率 0-100
      },
      frameChanges: [{
        attrTarget: 'EP',
        keyTarget: 'val',
        perSecond: -1.1,
      },],
      levelChanges: [{
        attrTarget: 'QB',
        keyTarget: 'max',
        perLevel: 1,
      }, {
        attrTarget: 'EXP',
        keyTarget: 'val',
        perLevel: 3,
      },]
    },
  ])
  const actionList = ref([])

  function ActionConstruct(params) {

    const {
      id,
      name,
      visibility = false,
      Proficiency,
      frameChanges,
      levelChanges
    } = params
    this.name = name
    this.id = id
    this.visibility = visibility
    this.Proficiency = Proficiency
    this.frameChanges = frameChanges
    this.levelChanges = levelChanges
  }

  function init(params) {
    actions.value.map((item, index) => {
      const action = new ActionConstruct({ ...item, id: index });
      actionList.value.push(action)
    })
  }

  return {
    actionList, init
  }
})


