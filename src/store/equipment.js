import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { equipmentConfigurations, getEquipmentConfigById } from '@/config/equipmentConfigs'

export const equipment = defineStore('equipment', () => {
  // 法宝装备栏 - 存储已装备的法宝
  // 数组索引对应装备栏位置，值为装备信息对象或null（表示该位置为空）
  const equipmentSlots = ref([
    // 初始装备：位置1-青冥剑，位置2-玄黄盾
    { itemId: 1, quantity: 1 }, // 位置1-青冥剑
    { itemId: 2, quantity: 1 }, // 位置2-玄黄盾
    null, // 位置3
    null  // 位置4
  ])

  // 获取完整的法宝装备列表（包含配置信息）
  const fullEquipmentItems = computed(() => {
    return equipmentSlots.value.map(slot => {
      if (slot) {
        const equipmentConfig = getEquipmentConfigById(slot.itemId)
        if (equipmentConfig) {
          return {
            ...equipmentConfig,
            quantity: slot.quantity
          }
        }
      }
      return null
    })
  })

  // 装备物品到指定位置
  function equipItem(slotIndex, itemId, quantity = 1) {
    // 验证位置索引是否有效
    if (slotIndex < 0 || slotIndex >= equipmentSlots.value.length) {
      console.error(`Invalid slot index: ${slotIndex}`)
      return false
    }

    // 验证物品ID是否存在
    const equipmentConfig = getEquipmentConfigById(itemId)
    if (!equipmentConfig) {
      console.error(`Magic equipment with id ${itemId} not found in config`)
      return false
    }

    // 装备法宝到指定位置
    equipmentSlots.value[slotIndex] = { itemId, quantity }
    return true
  }

  // 从指定位置卸下物品
  function unequipItem(slotIndex) {
    // 验证位置索引是否有效
    if (slotIndex < 0 || slotIndex >= equipmentSlots.value.length) {
      console.error(`Invalid slot index: ${slotIndex}`)
      return null
    }

    // 获取卸下的法宝信息
    const unequippedItem = equipmentSlots.value[slotIndex]
    // 清空该位置
    equipmentSlots.value[slotIndex] = null
    return unequippedItem
  }

  // 清空所有装备栏
  function clearAllEquipment() {
    equipmentSlots.value = equipmentSlots.value.map(() => null)
  }

  // 获取已装备法宝的总数
  const equippedCount = computed(() => {
    return equipmentSlots.value.filter(slot => slot !== null).length
  })

  return { 
    equipmentSlots, 
    fullEquipmentItems, 
    equippedCount,
    equipItem, 
    unequipItem,
    clearAllEquipment
  }
})