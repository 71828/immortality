<script setup>
import { inventory } from '@/store/inventory'

const inventoryStore = inventory()

// 固定格子数量
const gridSize = 16
</script>
<template>
  <div class="inventory-container">
    <div class="inventory-title">Storage Bag</div>
    <div class="inventory-grid">
      <!-- 固定格子布局 -->
      <div 
        v-for="index in gridSize" 
        :key="index" 
        class="inventory-slot"
      >
        <!-- 检查当前格子是否有物品 -->
        <div v-if="inventoryStore.pack[index - 1]" class="item">
          <div class="item-icon">{{ inventoryStore.pack[index - 1].icon }}</div>
          <div class="item-info">
            <div class="item-name">{{ inventoryStore.pack[index - 1].name }}</div>
            <div class="item-quantity">{{ inventoryStore.pack[index - 1].quantity }}</div>
          </div>
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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;
  flex-grow: 1;
  overflow-y: auto;
}

.inventory-slot {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
  min-height: 80px;
  
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
  padding: 8px;
  gap: 4px;
}

.item-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.item-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 100%;
}

.item-name {
  font-size: 12px;
  font-weight: 500;
  color: #e6edf3;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.item-quantity {
  font-size: 10px;
  color: #58a6ff;
  background: rgba(88, 166, 255, 0.1);
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 600;
}
</style>