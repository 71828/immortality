<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { skillStore } from '@/store/skill'
import { playAttribute } from '@/store/playAttribute'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

// 获取功法store
const store = skillStore()
// 获取属性store
const attributeStore = playAttribute()

// 自动修炼开关状态
const autoCultivate = ref(false)
// 自动修炼定时器
let autoCultivateTimer = null
// 自动修炼间隔（毫秒）
const AUTO_CULTIVATE_INTERVAL = 500

// 功法折叠状态，键为功法ID，值为是否折叠
const collapsedSkills = ref({})

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

// 当功法所有层级完成时自动折叠
store.fullLearnedSkills.forEach(skill => {
  if (isSkillMaxed(skill)) {
    collapsedSkills.value[skill.id] = true
  }
})

// 自动修炼逻辑
const startAutoCultivate = () => {
  if (autoCultivateTimer) return
  
  autoCultivateTimer = setInterval(() => {
    // 获取当前选中的功法
    const currentSkill = store.fullLearnedSkills.find(skill => skill.id === store.currentCultivatingSkill)
    if (!currentSkill) return
    
    // 检查是否可以修炼当前功法
    const canCultivate = currentSkill.currentMaxLayer < currentSkill.layers.length || 
      !currentSkill.layersDetails.find(layer => layer.layer === currentSkill.layers.length)?.isCompleted
    
    // 检查是否有足够的功法点
    if (canCultivate && attributeStore.SPT.val >= 1) {
      // 执行修炼
      store.cultivateWithSkillPoints(store.currentCultivatingSkill)
    } else if (!canCultivate) {
      // 功法已圆满，停止自动修炼
      autoCultivate.value = false
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

// 自动修炼开关变化处理
const handleAutoCultivateChange = (value) => {
  autoCultivate.value = value
  if (value) {
    startAutoCultivate()
  } else {
    stopAutoCultivate()
  }
}

// 监听修炼速度变化，重新计算自动修炼间隔
let lastCultivationSpeed = store.cultivationSpeed
store.$subscribe((mutation, state) => {
  if (store.cultivationSpeed !== lastCultivationSpeed && autoCultivate.value) {
    lastCultivationSpeed = store.cultivationSpeed
    stopAutoCultivate()
    startAutoCultivate()
  }
})

// 组件挂载时初始化
onMounted(() => {
  if (autoCultivate.value) {
    startAutoCultivate()
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
      <div class="auto-cultivate-switch">
        <span class="label">Auto Cultivate:</span>
        <el-switch
          v-model="autoCultivate"
          @change="handleAutoCultivateChange"
        />
      </div>
    </div>
    
    <!-- Skill List -->
    <div class="skill-list">
      <div 
        v-for="skill in store.fullLearnedSkills" 
        :key="skill.id" 
        class="skill-card"
        :class="{ 'skill-card-selected': store.currentCultivatingSkill === skill.id }"
        @click="store.setCurrentCultivatingSkill(skill.id)"
      >
        <div class="skill-header">
          <div class="skill-info">
            <div class="name-container">
              <h4 class="skill-name">{{ skill.name }}</h4>
              <div v-if="store.currentCultivatingSkill === skill.id" class="cultivating-badge">
                Currently Cultivating
              </div>
              <div v-if="skill.isMaxed" class="perfection-badge">
                Perfection
              </div>
            </div>
            <p class="skill-description">{{ skill.description }}</p>
          </div>
          <div class="skill-actions">
            <div class="skill-level">
              <span class="level-value">{{ skill.currentMaxLayer }}/{{ skill.layers.length }}</span>
            </div>
            <div class="action-buttons">
              <el-button 
                v-if="!skill.isMaxed"
                size="small" 
                type="primary"
                @click.stop="store.cultivateWithSkillPoints(skill.id)"
                class="custom-cultivate-btn"
              >
                Cultivate
              </el-button>
              <el-button 
                size="small" 
                type="text"
                @click.stop="toggleSkillCollapse(skill.id)"
                class="custom-collapse-btn"
              >
                <el-icon v-if="collapsedSkills[skill.id]">
                  <ArrowDown />
                </el-icon>
                <el-icon v-else>
                  <ArrowUp />
                </el-icon>
              </el-button>
            </div>
          </div>
        </div>
        
        <!-- Layer List with Collapse Animation -->
        <transition name="collapse">
          <div class="layers-list" v-if="!collapsedSkills[skill.id]">
          <template v-for="(layer, index) in skill.layersDetails" :key="layer.layer">
            <div class="layer-item-wrapper">
              <div 
                class="layer-item"
                :class="{ 
                  'layer-completed': layer.isCompleted, 
                  'layer-current': layer.layer === skill.currentMaxLayer && !layer.isCompleted 
                }"
              >
                <div class="layer-header">
                  <div class="layer-info">
                    <h5 class="layer-name">
                      <span class="layer-number">Layer {{ arabicToChinese(layer.layer) }}</span>
                      {{ layer.name }}
                      <span v-if="layer.layer === skill.currentMaxLayer && !layer.isCompleted" class="status-current">Cultivating</span>
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
                <span 
                  v-if="!layer.isCompleted && layer.currentProgress > 0" 
                  class="progress-percentage"
                >
                  {{ layer.progressPercentage }}%
                </span>
              </div>
              <div class="progress-bar-container">
                <div 
                  class="progress-bar" 
                  :style="{
                    width: `${layer.progressPercentage}%`,
                    backgroundColor: getProgressBarColor(layer.progressPercentage)
                  }"
                ></div>
              </div>
            </div>
              </div>
              <!-- Layer Connection Line -->
              <div 
                v-if="index < skill.layersDetails.length - 1" 
                class="layer-connection"
                :class="{
                  'connected': layer.isCompleted,
                  'current': layer.layer === skill.currentMaxLayer && !layer.isCompleted
                }"
              ></div>
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
  
  .auto-cultivate-switch {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .label {
      font-size: 14px;
      color: #a0a8b3;
    }
    
    :deep(.el-switch) {
      --el-switch-on-color: #67c23a;
      --el-switch-off-color: #a0a8b3;
      --el-switch-on-border-color: #67c23a;
      --el-switch-off-border-color: #a0a8b3;
      --el-switch-core-height: 22px;
      --el-switch-core-width: 40px;
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
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
    border-color: rgba(88, 166, 255, 0.6);
  }
  
  // 选中状态样式
  &.skill-card-selected {
    border-color: rgba(88, 166, 255, 0.9);
  }
  
  .skill-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 12px;
    
    .skill-info {
      flex: 1;
      
      .name-container {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }
      
      .skill-name {
        font-size: 16px;
        font-weight: 600;
        color: #f0f5fa;
        margin: 0;
      }
      
      .cultivating-badge {
        background-color: rgba(230, 162, 60, 0.25);
        color: #e6a23c;
        font-size: 11px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 14px;
        border: 1px solid rgba(230, 162, 60, 0.6);
      }
      
      .perfection-badge {
        background-color: rgba(103, 194, 58, 0.25);
        color: #67c23a;
        font-size: 11px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 14px;
        border: 1px solid rgba(103, 194, 58, 0.6);
      }
      
      .custom-cultivate-btn {
        background: linear-gradient(135deg, #58a6ff 0%, #388bfd 100%);
        border: none;
        border-radius: 6px;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(88, 166, 255, 0.3);
        
        &:hover {
          background: linear-gradient(135deg, #388bfd 0%, #1f6feb 100%);
          box-shadow: 0 4px 12px rgba(88, 166, 255, 0.4);
        }
      }
      
      .custom-collapse-btn {
        color: #8b949e;
        transition: all 0.3s ease;
        border-radius: 6px;
        padding: 4px 8px;
        
        &:hover {
          color: #58a6ff;
          background-color: rgba(88, 166, 255, 0.1);
        }
        
        .el-icon {
          font-size: 16px;
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
      gap: 8px;
      
      .skill-level {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .level-label {
          font-size: 14px;
          color: #a0a8b3;
        }
        
        .level-value {
          font-size: 16px;
          font-weight: 600;
          color: #67c23a;
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
  padding: 6px 8px 12px;
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
  width: 60px;
  position: relative;
  margin: 0;
  
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 1px;
  }
  
  &.connected::after {
    background-color: rgba(212, 175, 55, 0.6); /* 淡金色 */
  }
  
  &.current::after {
    background-color: rgba(88, 166, 255, 0.6); /* 蓝色 */
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
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s ease;
  width: 140px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: 70px;
  margin: 0;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
  
  &.layer-completed {
    border-color: rgba(212, 175, 55, 0.6); /* 淡金色，与进度条一致 */
    border-width: 1px;
    background-color: rgba(212, 175, 55, 0.08); /* 淡金色背景 */
  }
  
  &.layer-current {
    border-color: rgba(88, 166, 255, 0.6);
    border-width: 1px;
    background-color: rgba(88, 166, 255, 0.08);
  }
  
  &.layer-locked {
    border-width: 1px;
    opacity: 0.5;
    background-color: rgba(255, 255, 255, 0.03);
  }
  
  .layer-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 0;
    
    .layer-info {
      flex: 1;
      
      .layer-name {
        font-size: 13px;
        font-weight: 600;
        color: #f0f5fa;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .layer-number {
          color: #a0a8b3;
          margin-right: 4px;
        }
        
        .status-current {
          color: #58a6ff;
          font-size: 11px;
          font-weight: 500;
          margin-left: 4px;
        }
      }
      
      .layer-description {
        font-size: 11px;
        color: #a0a8b3;
        margin: 0;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
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
    
    .progress-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
      font-size: 11px;
      
      .progress-text {
        color: #a0a8b3;
      }
      
      .progress-percentage {
        color: #58a6ff;
        font-weight: 500;
      }
    }
    
    .progress-bar-container {
      width: 100%;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 2px;
      overflow: hidden;
      
      .progress-bar {
        height: 100%;
        border-radius: 2px;
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