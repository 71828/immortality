<script setup>
import { inventory } from '@/store/inventory'

const inventoryStore = inventory()

// 固定格子数量
const gridSize = 6
</script>
<template>
  <div class="inventory-container">
    <div class="inventory-grid">
      <!-- 固定格子布局 -->
      <div 
        v-for="index in gridSize" 
        :key="index" 
        class="inventory-slot"
      >
        <!-- 检查当前格子是否有物品 -->
        <div v-if="inventoryStore.fullPackItems[index - 1]" class="item">
          <div class="item-icon">{{ inventoryStore.fullPackItems[index - 1].name.substring(0, 1) }}</div>
          <div class="item-info">
            <div class="item-name">{{ inventoryStore.fullPackItems[index - 1].name }}</div>
          </div>
          <div class="item-quantity">{{ inventoryStore.fullPackItems[index - 1].quantity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inventory-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.inventory-title {
  font-size: 18px;
  font-weight: 600;
  color: #58a6ff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: repeat(2, 80px);
  gap: 8px;
  flex-grow: 1;
  overflow-y: auto;
  padding: 8px;
}

.inventory-slot {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #58a6ff;
  }
}

.item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px;
  gap: 2px;
  position: relative;
}

.item-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.item-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  width: 100%;
}

.item-name {
  font-size: 10px;
  font-weight: 500;
  color: #e6edf3;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.item-quantity {
  font-size: 12px;
  color: #58a6ff;
  background: rgba(88, 166, 255, 0.1);
  padding: 1px 4px;
  border-radius: 6px;
  font-weight: 600;
  position: absolute;
  top: 4px;
  left: 4px;
}
</style>