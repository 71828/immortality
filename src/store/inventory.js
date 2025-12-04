import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { itemConfigurations, getItemConfigById } from '@/config/itemConfigs'

export const inventory = defineStore('inventory', () => {
  // 装备栏 - 存储已装备的物品
  const equip = ref([
    // 示例装备数据
    // { itemId: 1, quantity: 1 } // 只存储物品ID和数量，其他信息通过配置表获取
  ])

  // 背包 - 只存储物品ID和数量
  const pack = ref([
    // 示例物品数据 - 只存储itemId和quantity
    { itemId: 1, quantity: 5 },
  
  ])

  // 获取背包物品数量
  const packCount = computed(() => pack.value.length)

  // 获取完整的背包物品列表（包含配置信息）
  const fullPackItems = computed(() => {
    return pack.value.map(item => {
      const itemConfig = getItemConfigById(item.itemId)
      if (itemConfig) {
        return {
          ...itemConfig,
          quantity: item.quantity
        }
      }
      return null
    }).filter(Boolean) // 过滤掉找不到配置的物品
  })

  // 添加物品到背包
  function addItem(itemId, quantity = 1) {
    // 验证物品ID是否存在
    const itemConfig = getItemConfigById(itemId)
    if (!itemConfig) {
      console.error(`Item with id ${itemId} not found in config`)
      return false
    }

    // 查找背包中是否已存在该物品
    const existingItemIndex = pack.value.findIndex(item => item.itemId === itemId)
    if (existingItemIndex !== -1) {
      // 物品已存在，增加数量，考虑可叠加上限
      const existingItem = pack.value[existingItemIndex]
      const newQuantity = Math.min(existingItem.quantity + quantity, itemConfig.maxStack)
      pack.value[existingItemIndex].quantity = newQuantity
      
      // 返回实际添加的数量
      return newQuantity - existingItem.quantity
    } else {
      // 物品不存在，直接添加
      pack.value.push({ itemId, quantity: Math.min(quantity, itemConfig.maxStack) })
      return Math.min(quantity, itemConfig.maxStack)
    }
  }

  // 从背包移除物品
  function removeItem(itemId, quantity = 1) {
    const index = pack.value.findIndex(item => item.itemId === itemId)
    if (index !== -1) {
      const item = pack.value[index]
      if (item.quantity > quantity) {
        // 如果物品数量大于要移除的数量，减少数量
        item.quantity -= quantity
        return true
      } else {
        // 否则移除整个物品
        pack.value.splice(index, 1)
        return true
      }
    }
    return false
  }

  return { 
    equip, 
    pack, // 原始背包数据（只包含itemId和quantity）
    fullPackItems, // 完整的物品列表（包含配置信息）
    packCount, 
    addItem, 
    removeItem 
  }
})

