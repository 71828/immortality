<script setup>
// import {ref} from 'vue'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useMainStore } from '@/store/store'
import { playAttribute } from '@/store/playAttribute'
import { useExecutionList, useActionData } from '@/store/playAction'
import { log } from '@/store/log'
import Layout from '../layout/index.vue'  
import { skillStore } from '@/store/skill'

const intervalId = ref(null);
const fps = ref(100);
// 在组件内部初始化store实例
let playAttr;
let mainDate;
let executionListStore;
let actionDataStore;
let logStore;
let skillStoreInstance;

function init() {
  // 初始化所有store实例
  playAttr = playAttribute();
  mainDate = useMainStore();
  executionListStore = useExecutionList();
  actionDataStore = useActionData();
  logStore = log();
  skillStoreInstance = skillStore();
  intervalId.value = setInterval(() => {
    mainDate.increment();
    mainLoop();
  }, 1000 / fps.value);

  if (actionDataStore.actionList.length == 0) {
    actionDataStore.initialize();
  }
}

function mainLoop() {
  // 执行当前执行列表中的动作
  executionListStore.executeActions(fps.value);
  // 执行属性恢复 
  playAttr.regeneration();
  // 自动修炼功法
  skillStoreInstance.autoCultivate(fps.value);
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