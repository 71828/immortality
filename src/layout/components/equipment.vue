<script setup>
// 法宝装备栏组件
import { equipment } from '@/store/equipment'
import { defineProps } from 'vue'

const props = defineProps({
  // 接收装备悬停事件处理函数
  onEquipmentHover: {
    type: Function,
    default: null
  },
  // 接收装备离开事件处理函数
  onEquipmentLeave: {
    type: Function,
    default: null
  }
})

const equipmentStore = equipment()

// 固定格子数量
const gridSize = 4
</script>
<template>
  <div class="card magic-equipment-container">
    <div class="equipment-grid">
      <!-- 固定格子布局 -->
      <div 
        v-for="(item, index) in equipmentStore.fullEquipmentItems" 
        :key="index" 
        class="equipment-slot"
        @mouseenter="item && props.onEquipmentHover && props.onEquipmentHover(item, $event)"
        @mouseleave="props.onEquipmentLeave && props.onEquipmentLeave()"
      >
        <!-- 装备格子内容 -->
        <div class="slot-content">

          <div v-if="item" class="equipment-info">
            <div class="equipment-name">{{ item.equipmentType }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.magic-equipment-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;


}



.equipment-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.equipment-slot {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(88, 166, 255, 0.3);
  }
}

.slot-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 100%;
  height: 100%;
}

.slot-index {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
  position: absolute;
  top: 4px;
  left: 4px;
}

.equipment-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  width: 100%;
  text-align: center;
}

.equipment-name {
  font-size: 18px;

  color: #58a6ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 1.2;
}



.stat-item {
  font-size: 7px;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 1.2;
}

.equipment-slot {
  position: relative;
}
</style>