<script setup>
// import {ref} from 'vue'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useMainStore } from '@/store/store'
import { playAttribute } from '@/store/playAttribute'
import { useExecutionList, useActionData } from '@/store/playAction'
import { log } from '@/store/log'
import Layout from '../layout/index.vue'

const intervalId = ref(null);
// 在组件内部初始化store实例
let playAttr;
let mainDate;
let executionListStore;
let actionDataStore;
let logStore;

function init() {
  // 初始化所有store实例
  playAttr = playAttribute();
  mainDate = useMainStore();
  executionListStore = useExecutionList();
  actionDataStore = useActionData();
  logStore = log();
  
  intervalId.value = setInterval(() => {
    mainDate.increment();
    mainLoop();
  }, 10);

  if (actionDataStore.actionList.length == 0) {
    actionDataStore.initialize();
  }
}

function mainLoop() {
  execution();
  playAttr.regeneration();
}

function execution() {
  if (executionListStore.executingActions.length) {
    const item = executionListStore.executingActions[0];
    const { frameAttributeChanges, levelAttributeChanges } = item;
    
    // 检查动作是否达到执行次数限制
    if (item.proficiency.executeLimit > 0 && item.proficiency.executeCount >= item.proficiency.executeLimit) {
      // 从动作列表中移除该动作
      actionDataStore.removeAction(item.uniqueId);
      // 清除执行队列，停止执行
      executionListStore.clearExecutingActions();
      return;
    }
    
    // 检查当前经验是否达到上限，进行等级提升处理
    if (item.proficiency.experience >= item.proficiency.maxExperience) {
      // 修复精度问题
      item.proficiency.experience = Number((item.proficiency.experience - item.proficiency.maxExperience).toFixed(2));
      item.proficiency.maxExperience = Number((item.proficiency.maxExperience * (1 + item.proficiency.levelUpRate)).toFixed(2));
      
      // 执行等级提升属性变化
      if (levelAttributeChanges.length) {
        for (const change of levelAttributeChanges) {
          playAttr.setAttr('level', change.attributeTarget, change.keyTarget, change.perLevel);
        }
      }
      
      // 增加执行次数
      item.proficiency.executeCount += 1;
      
      // 检查动作是否有执行次数限制
      if (item.proficiency.executeLimit > 0 && item.proficiency.executeCount >= item.proficiency.executeLimit) {
        // 从动作列表中移除该动作
        actionDataStore.removeAction(item.uniqueId);
        // 清除执行队列，停止执行
        executionListStore.clearExecutingActions();
      }
      
      // 触发等级回调
      if (item.proficiency.logForId) {
        logStore.addLog(item.proficiency.logForId);
      }
      if (item.proficiency.levelCallback) {
        item.proficiency.levelCallback(item);
      }
      
      return;
    }
    
    // 检查所有消耗资源是否足够
    let canExecute = true;
    for (const change of frameAttributeChanges) {
      // 只检查消耗性变化（perSecond为负数）
      if (change.perSecond < 0) {
        const attrTarget = change.attributeTarget;
        const keyTarget = change.keyTarget;
        const val = change.perSecond;
        
        // 获取当前属性值
        let currentValue = 0;
        switch (attrTarget) {
          case 'QB': currentValue = playAttr.QB.val; break;
          case 'EP': currentValue = playAttr.EP.val; break;
          case 'MP': currentValue = playAttr.MP.val; break;
          case 'EXP': currentValue = playAttr.EXP.val; break;
          case 'Life': currentValue = playAttr.Life.baseVal; break;
          case 'SE': currentValue = playAttr.SE.val; break;
          case 'CHA': currentValue = playAttr.CHA.val; break;
          case 'CP': currentValue = playAttr.CP.val; break;
          case 'SS': currentValue = playAttr.SS.val; break;
          case 'SP': currentValue = playAttr.SP.val; break;
        }
        
        // 计算当前帧的消耗量（val是每秒消耗量，需要除以100得到每帧消耗量）
        const frameCost = Math.abs(val / 100);
        
        // 检查资源是否足够
        if (currentValue < frameCost) {
          canExecute = false;
          break;
        }
      }
    }
    
    // 如果资源不足，不执行后续操作
    if (!canExecute) {
      return;
    }
    
    // 直接更新动作修为，修复精度问题
    item.proficiency.experience = Number((item.proficiency.experience + item.proficiency.experiencePerSecond / 100).toFixed(2));
    
    // 执行每帧属性变化
    if (frameAttributeChanges.length) {
      // 遍历所有frameAttributeChanges，不使用find方法，因为我们需要执行所有变化
      let hasError = false;
      for (const change of frameAttributeChanges) {
        const result = playAttr.setAttr('frame', change.attributeTarget, change.keyTarget, change.perSecond);
        if (result instanceof Error) {
          hasError = true;
          break;
        }
      }
      
      if (hasError) {
        return;
      }
    }
  }
}
onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});
</script>

<template>
  <div>
    <Layout />
  </div>
</template>

<style scoped></style>