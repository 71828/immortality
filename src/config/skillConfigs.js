// 功法配置列表 - 管理游戏中所有功法的配置

/**
 * 功法层级配置结构
 * @typedef {Object} SkillLayer
 * @property {number} layer - 层级编号
 * @property {string} name - 层级名称
 * @property {string} description - 层级描述
 * @property {number} maxProgress - 层级最大进度
 * @property {Object} effects - 层级效果
 */

/**
 * 功法配置结构
 * @typedef {Object} SkillConfig
 * @property {number} id - 功法唯一ID
 * @property {string} name - 功法名称
 * @property {string} description - 功法描述
 * @property {string} type - 功法类型
 * @property {number} maxLevel - 功法最大等级
 * @property {number} cultivationSpeed - 修炼速度倍率
 * @property {SkillLayer[]} layers - 功法层级列表
 */

/**
 * 功法配置列表
 * @type {SkillConfig[]}
 */
export const skillConfigurations = [
  // 功法
  { id: 1,
    name: 'Yin Qi Jue',
    description: 'Entry-level Qi cultivation technique, suitable for beginners',
    type: 'martial',
    layers: [
      {
        layer: 1,
        maxProgress: 10,
        effects: { 
          'MP.max': 10, // 法力值上限增加10
          'EP.perSecond': 0.05 // 精力值回复速度增加0.05/秒
        }
      },
      {
        layer: 2,
        maxProgress: 20,
        effects: { 
          'MP.max': 20, // 法力值上限增加20
          'EP.max': 5, // 精力值上限增加5
          'QB.max': 10 // 气血值上限增加10
        }
      },
      {
        layer: 3,
        maxProgress: 30,
        effects: { 
          'MP.perSecond': 0.1, // 法力值回复速度增加0.1/秒
          'EP.perSecond': 0.05, // 精力值回复速度增加0.05/秒
          'QB.perSecond': 0.05 // 气血值回复速度增加0.05/秒
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Qing Ming Ning Shen Fa',
    description: 'Entry-level Mind Clearing technique, suitable for beginners',
    type: 'martial',
    layers: [
      {
        layer: 1,
        maxProgress: 100,
        effects: { 
          'MP.max': 15, // 法力值上限增加15
          'SPT.val': 5 // 功法点增加5
        }
      },
      {
        layer: 2,
        maxProgress: 200,
        effects: { 
          'MP.max': 25, // 法力值上限增加25
          'EP.max': 8, // 精力值上限增加8
          'EP.perSecond': 0.08 // 精力值回复速度增加0.08/秒
        }
      },
      {
        layer: 3,
        maxProgress: 300,
        effects: { 
          'MP.perSecond': 0.15, // 法力值回复速度增加0.15/秒
          'QB.max': 15, // 气血值上限增加15
          'QB.perSecond': 0.08 // 气血值回复速度增加0.08/秒
        }
      }
    ]
  }

]

/**
 * 根据ID获取功法配置
 * @param {number} id - 功法ID
 * @returns {SkillConfig|null} - 功法配置，找不到返回null
 */
export function getSkillConfigById(id) {
  return skillConfigurations.find(skill => skill.id === id) || null
}
