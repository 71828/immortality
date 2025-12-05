<script setup>
import { ref, defineProps, computed } from 'vue'
import { playAttribute } from '@/store/playAttribute'

const props = defineProps({
  // 接收当前选中的动作数据
  action: {
    type: Object,
    default: null
  },
  // 控制卡片显示状态
  visible: {
    type: Boolean,
    default: false
  }
})

// 计算卡片的显示样式
const cardStyle = computed(() => {
  return {
    right: props.visible ? '0px' : '-320px',
    opacity: props.visible ? 1 : 0
  }
})
</script>

<template>
  <div class="action-detail-card" :style="cardStyle">

    <div class="card-content" v-if="action">
      <div class="detail-section">
        <h4>基本信息</h4>
        <div class="info-item">
          <span class="label">熟练度等级:</span>
          <span class="value">{{ action.proficiency.executeCount }}
            <span v-if="action.proficiency.executeLimit">/{{ action.proficiency.executeLimit }}</span>
          </span>
        </div>
        <div class="info-item">
          <span class="label">当前经验:</span>
          <span class="value">{{ action.proficiency.experience === 0 ? 0 : action.proficiency.experience.toFixed(1) }}/{{ action.proficiency.maxExperience.toFixed(1) }}</span>
        </div>
        <div class="info-item">
          <span class="label">每秒经验:</span>
          <span class="value">{{ action.proficiency.experiencePerSecond }}</span>
        </div>
      </div>
      
      <div class="detail-section">
        <h4>属性需求</h4>
        <div class="info-item" v-for="(value, key) in action.attributeRequirements" :key="key">
          <span class="label">{{ key }}:</span>
          <span class="value">{{ value }}</span>
        </div>
      </div>
      
      <div class="detail-section">
        <h4>资源消耗</h4>
        <div class="info-item" v-for="(cost, index) in action.resourceCost" :key="index">
          <span class="label">{{ cost.type }}:</span>
          <span class="value">{{ cost.value }}</span>
        </div>
      </div>
    </div>
    <div class="card-content" v-else>
      <div class="empty-state">
        <p>将鼠标移动到动作卡片上查看详细信息</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action-detail-card {
  position: fixed;
  top: 83px;
  right: -350px;
  bottom: 0;
  width: 350px;
  background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
  border: 1px solid var(--el-border-color);
  border-radius: 12px 0 0 12px;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.5), -12px 0 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  opacity: 0;
  max-height: 100vh;
  overflow-y: auto;
  color: #e6edf3;
}

.card-header {
  padding: 16px;
  border-bottom: 1px solid var(--el-border-color);
  background-color: rgba(88, 166, 255, 0.1);
  border-radius: 12px 0 0 0;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #58a6ff;
}

.card-content {
  padding: 16px;
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 500;
  color: #f0f5fa;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 6px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: #8b949e;
  font-weight: 500;
}

.info-item .value {
  color: #e6edf3;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #8b949e;
  font-size: 14px;
}

/* 滚动条样式 */
.action-detail-card::-webkit-scrollbar {
  width: 6px;
}

.action-detail-card::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.action-detail-card::-webkit-scrollbar-thumb {
  background-color: rgba(88, 166, 255, 0.6);
  border-radius: 3px;
}
</style>