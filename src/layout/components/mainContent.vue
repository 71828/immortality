<script setup>
import { ref } from 'vue'
import playResources from './playResources.vue'
import equipment from './equipment.vue'
import action from './action.vue'
import log from './log.vue'
import task from './task.vue'
import executingActions from './executingActions.vue'
import inventory from './inventory.vue'
import skill from './skill.vue'
import cave from './cave.vue'
import ActionDetailCard from '@/components/ActionDetailCard.vue'
import MagicEquipmentDetailCard from '@/components/MagicEquipmentDetailCard.vue'

// 初始化当前激活的tab，默认显示第一个标签页
const activeTab = ref('skills')

// 全局动作详情卡片状态管理
const currentAction = ref(null)
const isDetailCardVisible = ref(false)

// 设置当前选中的动作
const setCurrentAction = (action) => {
  currentAction.value = action
  isDetailCardVisible.value = true
}

// 清空当前选中的动作
const clearCurrentAction = () => {
  // 只隐藏卡片，不清空动作数据，这样当鼠标快速移动到另一个卡片时，内容不会显示为空
  isDetailCardVisible.value = false
  // 延迟清空动作数据，确保动画效果完成，并且避免鼠标快速切换时内容为空
  setTimeout(() => {
    // 只有当卡片仍然隐藏时才清空数据
    if (!isDetailCardVisible.value) {
      currentAction.value = null
    }
  }, 300)
}

// 全局法宝详情卡片状态管理
const currentEquipment = ref(null)
const isEquipmentCardVisible = ref(false)
const cursorPosition = ref({ x: 0, y: 0 })

// 设置当前选中的装备
const setCurrentEquipment = (equipment, event) => {
  currentEquipment.value = equipment
  cursorPosition.value = {
    x: event.clientX,
    y: event.clientY
  }
  isEquipmentCardVisible.value = true
}

// 清空当前选中的装备
const clearCurrentEquipment = () => {
  // 只隐藏卡片，不清空装备数据，这样当鼠标快速移动到另一个卡片时，内容不会显示为空
  isEquipmentCardVisible.value = false
  // 延迟清空装备数据，确保动画效果完成，并且避免鼠标快速切换时内容为空
  setTimeout(() => {
    // 只有当卡片仍然隐藏时才清空数据
    if (!isEquipmentCardVisible.value) {
      currentEquipment.value = null
    }
  }, 300)
}
</script>
<template>
  <div class="main-content">
    <div class="left">
      <playResources />
      <equipment :on-equipment-hover="setCurrentEquipment" :on-equipment-leave="clearCurrentEquipment" />

    </div>
    <div class="center">
      <!-- 展示当前执行中的动作 -->

      <div class="card  executing-actions">
        <executingActions />
      </div>
      <div class="card">
        <el-tabs v-model="activeTab" class="custom-tabs">
          <el-tab-pane label="Actions" name="actions">
            <action :on-action-hover="setCurrentAction" :on-action-leave="clearCurrentAction" />
          </el-tab-pane>
          <el-tab-pane label="Bag" name="bag">
            <inventory />
          </el-tab-pane>
          <el-tab-pane label="Skills" name="skills">
            <skill />
          </el-tab-pane>
          <el-tab-pane label="Cave" name="cave">
            <cave />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="right">
      <task />

      <log />


    </div>

    <!-- 全局动作详情卡片 -->
    <ActionDetailCard :action="currentAction" :visible="isDetailCardVisible" />

    <!-- 全局法宝详情卡片 -->
    <MagicEquipmentDetailCard :equipment="currentEquipment" :visible="isEquipmentCardVisible"
      :cursor-position="cursorPosition" />

  </div>
</template>
<style lang="scss" scoped>
.main-content {
  display: flex;
  padding: 24px;
  gap: 24px;
  background-color: #0f1117;
  min-height: 100vh;

  .left {
    width: 240px;
  }

  .center {
    flex: 1;
  }

  .right {
    width: 320px;
    display: flex;
    flex-direction: column;
  }
}

.card {
  border-radius: 12px;
  padding:12px;
  background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
  border: 1px solid var(--el-border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-bottom: 24px;
  
}

/* 简化tab样式，保持简洁 */
:deep(.custom-tabs) {
  .el-tabs__header {
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .el-tabs__item {
    color: #8b949e;
    font-size: 14px;
    font-weight: 500;
    margin-right: 20px;
    padding: 8px 0;

    &:hover {
      color: #e6edf3;
    }

    &.is-active {
      color: #58a6ff;
    }
  }

  .el-tabs__active-bar {
    background-color: #58a6ff;
    height: 2px;
  }

  .el-tab-pane {
    padding: 0;
  }
}

.tab-content {
  padding: 20px;
  text-align: center;
  color: #8b949e;
  font-size: 14px;
}
</style>