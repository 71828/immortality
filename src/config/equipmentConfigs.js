// 法宝装备配置列表 - 管理游戏中所有法宝装备的配置

/**
 * 法宝装备配置结构
 * @typedef {Object} MagicEquipmentConfig
 * @property {number} id - 法宝唯一ID
 * @property {string} name - 法宝名称
 * @property {string} description - 法宝描述
 * @property {string} equipmentType - 法宝类型（如：剑、盾、镜、旗、印等）
 * @property {string[]} effectTypes - 效果类型（如：进攻、防御、控制、削弱、增强等，可同时拥有多种效果）
 * @property {Object} stats - 法宝属性
 * @property {number} stats.attack - 攻击力
 * @property {number} stats.defense - 防御力
 * @property {number} stats.spellPower - 法术强度
 */

/**
 * 法宝装备配置列表
 * @type {MagicEquipmentConfig[]}
 */
export const equipmentConfigurations = [
  // 示例法宝数据
  {
    id: 1,
    name: '青冥剑',
    description: '一把由青冥石打造的仙剑，蕴含着强大的灵气',
    equipmentType: '剑',
    effectTypes: ['进攻', '增强'],
    stats: {
      attack: 100,
      defense: 20,
      spellPower: 50
    }
  },
  {
    id: 2,
    name: '玄黄盾',
    description: '由玄黄之气凝聚而成的盾牌，防御力惊人',
    equipmentType: '盾',
    effectTypes: ['防御', '增强'],
    stats: {
      attack: 10,
      defense: 150,
      spellPower: 20
    }
  },
  {
    id: 3,
    name: '紫霞衣',
    description: '云霞炼制的仙衣，具有强大的防御力',
    equipmentType: '衣',
    effectTypes: ['防御', '增强'],
    stats: {
      attack: 5,
      defense: 80,
      spellPower: 30
    }
  },
  {
    id: 4,
    name: '混元珠',
    description: '蕴含混元之气的宝珠，能够提升法术强度',
    equipmentType: '珠',
    effectTypes: ['增强', '进攻'],
    stats: {
      attack: 20,
      defense: 30,
      spellPower: 100
    }
  },
  // 新增示例法宝
  {
    id: 5,
    name: '定风旗',
    description: '能够稳定周围气流，削弱敌人攻势',
    equipmentType: '旗',
    effectTypes: ['控制', '削弱'],
    stats: {
      attack: 15,
      defense: 50,
      spellPower: 80
    }
  },
  {
    id: 6,
    name: '照妖镜',
    description: '能够照出妖邪本相，增强攻击效果',
    equipmentType: '镜',
    effectTypes: ['进攻', '控制'],
    stats: {
      attack: 80,
      defense: 30,
      spellPower: 60
    }
  },
  {
    id: 7,
    name: '翻天印',
    description: '威力巨大的印章，能够镇压敌人',
    equipmentType: '印',
    effectTypes: ['进攻', '控制', '削弱'],
    stats: {
      attack: 120,
      defense: 40,
      spellPower: 70
    }
  }
]

/**
 * 根据ID获取法宝装备配置
 * @param {number} id - 法宝ID
 * @returns {MagicEquipmentConfig|null} - 法宝配置，找不到返回null
 */
export function getEquipmentConfigById(id) {
  return equipmentConfigurations.find(item => item.id === id) || null
}