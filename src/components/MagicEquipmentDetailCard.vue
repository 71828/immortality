<script setup>
import { ref, defineProps, computed } from 'vue'

const props = defineProps({
  // 接收当前选中的装备数据
  equipment: {
    type: Object,
    default: null
  },
  // 控制卡片显示状态
  visible: {
    type: Boolean,
    default: false
  },
  // 光标位置，用于确定卡片显示位置
  cursorPosition: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  }
})

// 计算卡片的显示样式
const cardStyle = computed(() => {
  return {
    left: `${props.cursorPosition.x + 10}px`,
    top: `${props.cursorPosition.y + 10}px`,
    opacity: props.visible ? 1 : 0,
    pointerEvents: props.visible ? 'auto' : 'none'
  }
})
</script>

<template>
  <div class="magic-equipment-detail-card" :style="cardStyle">
    <div class="card-content" v-if="equipment">
      <div class="detail-section">
        <h4>{{ equipment.name }}</h4>
        <div class="info-item">
          <span class="label">类型:</span>
          <span class="value">{{ equipment.equipmentType }}</span>
        </div>
        <div class="info-item">
          <span class="label">描述:</span>
          <span class="value">{{ equipment.description }}</span>
        </div>
      </div>
      
      <div class="detail-section">
        <h4>属性</h4>
        <div class="info-item">
          <span class="label">攻击力:</span>
          <span class="value">{{ equipment.stats.attack }}</span>
        </div>
        <div class="info-item">
          <span class="label">防御力:</span>
          <span class="value">{{ equipment.stats.defense }}</span>
        </div>
        <div class="info-item">
          <span class="label">法术强度:</span>
          <span class="value">{{ equipment.stats.spellPower }}</span>
        </div>
      </div>
      
      <div class="detail-section">
        <h4>效果类型</h4>
        <div class="effect-types">
          <span 
            v-for="(effect, index) in equipment.effectTypes" 
            :key="index" 
            class="effect-tag"
          >
            {{ effect }}
          </span>
        </div>
      </div>
    </div>
    <div class="card-content" v-else>
      <div class="empty-state">
        <p>将鼠标移动到装备上查看详细信息</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.magic-equipment-detail-card {
  position: fixed;
  width: 250px;
  background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
  border: 1px solid var(--el-border-color);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: all 0.2s ease;
  color: #e6edf3;
  max-height: 80vh;
  overflow-y: auto;
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
  color: #58a6ff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 6px;
}

.info-item {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  gap: 4px;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: #8b949e;
  font-weight: 500;
  font-size: 13px;
}

.info-item .value {
  color: #e6edf3;
  font-weight: 600;
  font-size: 14px;
}

.effect-types {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 0;
}

.effect-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(88, 166, 255, 0.2);
  color: rgba(88, 166, 255, 0.8);
  white-space: nowrap;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #8b949e;
  font-size: 14px;
}

/* 滚动条样式 */
.magic-equipment-detail-card::-webkit-scrollbar {
  width: 6px;
}

.magic-equipment-detail-card::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.magic-equipment-detail-card::-webkit-scrollbar-thumb {
  background-color: rgba(88, 166, 255, 0.6);
  border-radius: 3px;
}
</style>