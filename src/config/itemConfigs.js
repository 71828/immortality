// 物品配置列表 - 管理游戏中所有资源物品的配置

/**
 * 物品配置结构
 * @typedef {Object} ItemConfig
 * @property {number} id - 物品唯一ID
 * @property {string} name - 物品名称
 * @property {string} description - 物品描述
 * @property {number} maxStack - 可叠加上限
 * @property {string} type - 物品类型
 */

/**
 * 物品配置列表
 * @type {ItemConfig[]}
 */
export const itemConfigurations = [
  // 草药类
  {
    id: 1,
    name: 'Herb',
    description: 'A common herb used for crafting',
    maxStack: 99,
    type: 'herb'
  },
  // 矿物类
  {
    id: 2,
    name: 'Stone',
    description: 'A rough stone',
    maxStack: 99,
    type: 'mineral'
  },
  {
    id: 3,
    name: 'Wood',
    description: 'A piece of wood',
    maxStack: 99,
    type: 'material'
  },
  {
    id: 4,
    name: 'Iron Ore',
    description: 'Raw iron ore',
    maxStack: 99,
    type: 'mineral'
  },
  // 消耗品类
  {
    id: 5,
    name: 'Potion',
    description: 'A healing potion',
    maxStack: 20,
    type: 'consumable'
  },
  // 货币类
  {
    id: 6,
    name: 'Gold Coin',
    description: 'A gold coin',
    maxStack: 999,
    type: 'currency'
  }
]

/**
 * 根据ID获取物品配置
 * @param {number} id - 物品ID
 * @returns {ItemConfig|null} - 物品配置，找不到返回null
 */
export function getItemConfigById(id) {
  return itemConfigurations.find(item => item.id === id) || null
}
