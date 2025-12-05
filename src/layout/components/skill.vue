<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { skillStore } from '@/store/skill'
import { playAttribute } from '@/store/playAttribute'
import { ArrowDown, ArrowUp, VideoPlay, VideoPause } from '@element-plus/icons-vue'

// 获取功法store
const store = skillStore()
// 获取属性store
const attributeStore = playAttribute()

// 功法折叠状态，键为功法ID，值为是否折叠
const collapsedSkills = ref({})

// 存储每个功法的自动修炼状态
const autoCultivateStates = ref({})

// Return English layer number
const arabicToChinese = (num) => {
  return num
}

// 进度条颜色
const getProgressBarColor = (progressPercentage) => {
  return '#d4af37' // 更深的金色
}

// 检查功法是否所有层级都已完成
const isSkillMaxed = (skill) => {
  return skill.layersDetails.every(layer => layer.isCompleted)
}

// 切换功法折叠状态
const toggleSkillCollapse = (skillId) => {
  collapsedSkills.value[skillId] = !collapsedSkills.value[skillId]
}

// 当功法所有层级完成或未开始修炼时自动折叠
store.fullLearnedSkills.forEach(skill => {
  if (isSkillMaxed(skill) || skill.currentMaxLayer === 0) {
    collapsedSkills.value[skill.id] = true
  }
})

// 自动修炼定时器
let autoCultivateTimer = null
// 自动修炼间隔（毫秒）
const AUTO_CULTIVATE_INTERVAL = 500

// 处理功法自动修炼开关变化
const handleAutoCultivateChange = (skillId, value) => {
  if (value) {
    // 关闭其他所有功法的自动修炼
    Object.keys(autoCultivateStates.value).forEach(id => {
      autoCultivateStates.value[id] = false
    })
    // 开启当前功法的自动修炼
    autoCultivateStates.value[skillId] = true
    startAutoCultivate(skillId)
  } else {
    // 关闭当前功法的自动修炼
    autoCultivateStates.value[skillId] = false
    stopAutoCultivate()
  }
}

// 自动修炼逻辑
const startAutoCultivate = (skillId) => {
  if (autoCultivateTimer) {
    clearInterval(autoCultivateTimer)
  }

  autoCultivateTimer = setInterval(() => {
    // 检查当前功法是否仍在自动修炼列表中
    if (!autoCultivateStates.value[skillId]) {
      stopAutoCultivate()
      return
    }

    // 获取当前功法
    const currentSkill = store.fullLearnedSkills.find(skill => skill.id === skillId)
    if (!currentSkill) {
      stopAutoCultivate()
      return
    }

    // 检查是否可以修炼当前功法
    const canCultivate = currentSkill.currentMaxLayer < currentSkill.layers.length ||
      !currentSkill.layersDetails.find(layer => layer.layer === currentSkill.layers.length)?.isCompleted

    // 检查是否有足够的功法点
    if (canCultivate && attributeStore.SPT.val >= 1) {
      // 执行修炼
      store.cultivateWithSkillPoints(skillId)
    } else if (!canCultivate) {
      // 功法已圆满，停止自动修炼
      autoCultivateStates.value[skillId] = false
      stopAutoCultivate()
    }
  }, AUTO_CULTIVATE_INTERVAL / store.cultivationSpeed)
}

// 停止自动修炼
const stopAutoCultivate = () => {
  if (autoCultivateTimer) {
    clearInterval(autoCultivateTimer)
    autoCultivateTimer = null
  }
}

// 监听修炼速度变化，重新计算自动修炼间隔
let lastCultivationSpeed = store.cultivationSpeed
store.$subscribe((mutation, state) => {
  if (store.cultivationSpeed !== lastCultivationSpeed) {
    lastCultivationSpeed = store.cultivationSpeed
    // 重新启动当前正在修炼的功法的自动修炼
    const activeSkillId = Object.keys(autoCultivateStates.value).find(id => autoCultivateStates.value[id])
    if (activeSkillId) {
      stopAutoCultivate()
      startAutoCultivate(parseInt(activeSkillId))
    }
  }
})

// 组件卸载时清理
onUnmounted(() => {
  stopAutoCultivate()
})
</script>

<template>
  <div class="skill-container">
    <div class="skill-header-section">
      <div class="skill-points-display">
        <span class="label">Current Skill Points:</span>
        <span class="value">{{ Math.floor(attributeStore.SPT.val) }}</span>
      </div>
      <div class="cultivation-speed-display">
        <span class="label">Cultivation Speed:</span>
        <span class="value">{{ store.cultivationSpeed }}x</span>
      </div>
    </div>

    <!-- Skill List -->
    <div class="skill-list">
      <div v-for="skill in store.fullLearnedSkills" :key="skill.id" class="skill-card" :class="{
        'skill-not-started': skill.currentMaxLayer === 0,
        'skill-cultivating': autoCultivateStates[skill.id],
        'skill-perfected': skill.isMaxed
      }">
        <div class="skill-header">
          <div class="skill-info">
            <div class="name-container">
              <h4 class="skill-name">{{ skill.name }}</h4>
              <div class="action-buttons">
                <button 
                  @click.stop="toggleSkillCollapse(skill.id)"
                  class="custom-collapse-btn">
                  <span v-if="collapsedSkills[skill.id]">▼</span>
                  <span v-else>▲</span>
                </button>
              </div>
            </div>
          </div>
          <div class="skill-actions">
            <div class="skill-level">
              <span class="level-value">{{ skill.currentMaxLayer }}/{{ skill.layers.length }}</span>
              <div class="skill-auto-cultivate-btn">
                <button 
                  class="custom-cultivate-btn capsule-btn"
                  :class="{ 'active': autoCultivateStates[skill.id] }"
                  @click="handleAutoCultivateChange(skill.id, !autoCultivateStates[skill.id])">
                  <span class="play-icon" v-if="autoCultivateStates[skill.id]">⏸</span>
                  <span class="play-icon" v-else>▶</span>
                  {{ autoCultivateStates[skill.id] ? 'Stop' : 'Start' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Layer List with Collapse Animation -->
        <transition name="collapse">
          <div class="layers-list" v-if="!collapsedSkills[skill.id]">
            <template v-for="(layer, index) in skill.layersDetails" :key="layer.layer">
              <div class="layer-item-wrapper">
                <div class="layer-item" :class="{
                  'layer-completed': layer.isCompleted,
                  'layer-current': layer.layer === skill.currentMaxLayer && !layer.isCompleted
                }" :style="{
                  borderColor: layer.layer === skill.currentMaxLayer && !layer.isCompleted
                    ? `rgba(212, 175, 55, ${0.2 + (layer.progressPercentage / 100) * 0.8})`
                    : '',
                  backgroundColor: layer.layer === skill.currentMaxLayer && !layer.isCompleted
                    ? `rgba(212, 175, 55, ${0.02 + (layer.progressPercentage / 100) * 0.1})`
                    : ''
                }">
                  <div class="layer-header">
                    <div class="layer-info">
                      <h5 class="layer-name">
                        <span class="layer-number">Layer {{ arabicToChinese(layer.layer) }}</span>
                        {{ layer.name }}
                      </h5>
                      <p class="layer-description">{{ layer.description }}</p>
                    </div>
                  </div>
                  <!-- Layer Progress Bar -->
                  <div class="layer-progress-section">
                    <div class="progress-info">
                      <span class="progress-text">
                        {{ layer.currentProgress }}/{{ layer.maxProgress }}
                      </span>
                    </div>
                    <div class="progress-bar-container">
                      <div class="progress-bar" :style="{
                        width: `${layer.progressPercentage}%`,
                        background: getProgressBarColor(layer.progressPercentage)
                      }"></div>
                    </div>
                  </div>
                </div>
                <!-- Layer Connection Line -->
                <div v-if="index < skill.layersDetails.length - 1" class="layer-connection" :class="{
                  'connected': layer.isCompleted,
                  'current': layer.layer === skill.currentMaxLayer && !layer.isCompleted
                }"></div>
              </div>
            </template>
          </div>
        </transition>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="store.learnedSkillsCount === 0" class="empty-state">
      <p>You haven't learned any skills yet</p>
      <p class="empty-hint">Acquire skills through cultivation or quests</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skill-container {
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  .skill-title {
    font-size: 18px;
    font-weight: 600;
    color: #f0f5fa;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  .skill-header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .skill-points-display {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(230, 162, 60, 0.15);
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid rgba(230, 162, 60, 0.4);
    width: fit-content;

    .label {
      font-size: 14px;
      color: #e6a23c;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: #e6a23c;
    }
  }

  .cultivation-speed-display {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(88, 166, 255, 0.15);
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid rgba(88, 166, 255, 0.4);
    width: fit-content;

    .label {
      font-size: 14px;
      color: #85d7ff;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: #85d7ff;
    }
  }
}

// 功法总览
.skill-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 8px;

  .overview-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .label {
      font-size: 14px;
      color: #a0a8b3;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: #58a6ff;
    }
  }
}

// 功法列表
.skill-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

// 功法卡片
.skill-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: default;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

// 未开始修炼的功法样式
.skill-not-started {
  filter: grayscale(0.7);
  opacity: 0.7;
  border-color: rgba(255, 255, 255, 0.1);
}

// 正在修炼的功法样式
.skill-cultivating {
  /* 移除特殊样式，只保留默认样式 */
}

// 修炼圆满的功法样式
.skill-perfected {
  /* 移除特殊样式，只保留默认样式 */
}

// 功法卡片内部样式
.skill-card {
  .skill-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 12px;

    .skill-info {
      flex: 1;
      min-width: 0;

      .name-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
        flex-wrap: wrap;
      }

      .skill-name {
        font-size: 18px;
        font-weight: 600;
        color: #f0f5fa;
        margin: 0;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .custom-collapse-btn {
        color: #8b949e;
        transition: all 0.3s ease;
        border-radius: 4px;
        padding: 2px 6px;
        min-width: auto;
        height: auto;

        &:hover {
          color: #58a6ff;
          background-color: rgba(88, 166, 255, 0.1);
        }

        .el-icon {
          font-size: 14px;
        }
      }

      .custom-cultivate-btn {
        min-width: auto;
        height: auto;
        padding: 4px 12px;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.3s ease;

        &.capsule-btn {
          border-radius: 20px;
          background-color: rgba(212, 175, 55, 0.8);
          /* 与功法层级一致的淡金色 */
          color: #fff;
          border: none;
          font-weight: 500;

          &:hover {
            background-color: #d4af37;
            /* 与功法层级一致的深金色 */
            box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
          }

          &.active {
            background-color: #d4af37;
            /* 与功法层级一致的深金色 */
            box-shadow: 0 2px 8px rgba(212, 175, 55, 0.5);
          }
        }
      }

      .skill-description {
        font-size: 13px;
        color: #a0a8b3;
        margin: 0;
        line-height: 1.5;
      }
    }

    .skill-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;

      .skill-level {
        display: flex;
        align-items: center;
        gap: 12px;

        .level-value {
          font-size: 16px;
          font-weight: 600;
          color: #67c23a;
          white-space: nowrap;
        }

        .skill-auto-cultivate-btn {
          /* 继承自定义按钮样式 */
        }
      }

      .action-buttons {
        display: flex;
        gap: 8px;
      }
    }
  }
}

// 折叠动画
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
  padding: 0;
  margin: 0;
  border: none;
}

// 层级列表
.layers-list {
  display: flex;
  flex-direction: row;
  gap: 0;
  overflow-x: auto;
  padding: 16px;
  scrollbar-width: thin;
  scrollbar-color: rgba(88, 166, 255, 0.6) transparent;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: 8px;
  max-height: 200px;
  opacity: 1;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(88, 166, 255, 0.6);
    border-radius: 3px;
  }
}

// 层级连接线段
.layer-connection {
  display: flex;
  align-items: center;
  width: 50px;
  position: relative;
  margin: 0 8px;

  &::after {
    content: '';
    flex: 1;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 1px;
    transition: background-color 0.3s ease;
  }

  &.connected::after {
    background-color: rgba(212, 175, 55, 0.8);
    /* 淡金色 */
  }

  &.current::after {
    background-color: rgba(255, 255, 255, 0.15);
    /* 蓝色 */
  }
}

// 层级项容器，包含层级项和连接线
.layer-item-wrapper {
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-child) {
    margin-right: 0;
  }
}

// 层级项
.layer-item {
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  padding: 16px;
  transition: all 0.3s ease;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  &.layer-completed {
    border-color: rgba(212, 175, 55, 0.6);
    /* 淡金色，与进度条一致 */
    border-width: 2px;
    background-color: rgba(212, 175, 55, 0.08);
    /* 淡金色背景 */
  }

  &.layer-current {
    border-width: 2px;
    /* 移除固定蓝色，改为根据进度的动态样式 */
  }

  &.layer-locked {
    border-width: 2px;
    opacity: 0.5;
    background-color: rgba(255, 255, 255, 0.03);
  }

  .layer-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 0;
    align-items: center;
    text-align: center;
    width: 100%;

    .layer-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .layer-name {
        font-size: 12px;
        font-weight: 600;
        color: #f0f5fa;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .layer-number {
          color: #a0a8b3;
          margin-right: 0;
          margin-bottom: 2px;
          font-size: 10px;
        }
      }

      .layer-description {
        display: none;
      }
    }

    .layer-status {
      display: none;
    }
  }

  // 层级进度条
  .layer-progress-section {
    margin-bottom: 0;
    padding-bottom: 0;
    width: 100%;

    .progress-info {
      display: flex;
      justify-content: center;
      margin-bottom: 2px;
      font-size: 10px;

      .progress-text {
        color: #a0a8b3;
        white-space: nowrap;
      }
    }

    .progress-bar-container {
      width: 100%;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 1.5px;
      overflow: hidden;

      .progress-bar {
        height: 100%;
        border-radius: 1.5px;
        transition: width 0.3s ease;
      }
    }
  }
}

// 空状态
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #a0a8b3;

  p {
    margin: 0 0 8px 0;
    font-size: 16px;
  }

  .empty-hint {
    font-size: 14px;
    color: #7e8690;
  }
}
</style>