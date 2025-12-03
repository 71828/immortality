import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const inventory = defineStore('inventory', () => {
  // 装备栏 - 存储已装备的物品
  const equip = ref([
    // 示例装备数据
    // { id: 1, name: 'Sword', icon: '⚔️', type: 'weapon', level: 1, stats: { attack: 5 } }
  ])

  // 背包 - 存储物品
  const pack = ref([
    // 示例物品数据
    { id: 1, name: 'Herb', icon: '🌿', quantity: 5, description: 'A common herb used for crafting' },
    { id: 2, name: 'Stone', icon: '🪨', quantity: 10, description: 'A rough stone' },
    { id: 3, name: 'Wood', icon: '🪵', quantity: 8, description: 'A piece of wood' },
    { id: 4, name: 'Iron Ore', icon: '⛏️', quantity: 3, description: 'Raw iron ore' },
    { id: 5, name: 'Potion', icon: '🧪', quantity: 2, description: 'A healing potion' },
    { id: 6, name: 'Gold Coin', icon: '🪙', quantity: 15, description: 'A gold coin' }
  ])

  // 获取背包物品数量
  const packCount = computed(() => pack.value.length)

  // 添加物品到背包
  function addItem(item) {
    const existingItem = pack.value.find(i => i.id === item.id)
    if (existingItem) {
      // 如果物品已存在，增加数量
      existingItem.quantity += item.quantity
    } else {
      // 否则添加新物品
      pack.value.push(item)
    }
  }

  // 从背包移除物品
  function removeItem(itemId, quantity = 1) {
    const index = pack.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      if (pack.value[index].quantity > quantity) {
        // 如果物品数量大于要移除的数量，减少数量
        pack.value[index].quantity -= quantity
      } else {
        // 否则移除整个物品
        pack.value.splice(index, 1)
      }
    }
  }

  return { 
    equip, 
    pack, 
    packCount, 
    addItem, 
    removeItem 
  }
})

