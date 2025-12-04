/**
 * 动作配置文件
 * 定义游戏中所有可执行动作的配置信息
 * 包含动作的基本属性、修为设置、属性变化和等级提升效果
 */

/**
 * 动作配置类型定义
 * @typedef {Object} ActionConfig
 * @property {number} uniqueId - 唯一动作ID，用于标识不同动作
 * @property {string} name - 动作名称，用于标识动作类型
 * @property {Object} proficiency - 动作经验配置
 * @property {number} proficiency.executeLimit - 执行次数限制，0表示无限制
 * @property {number} proficiency.executeCount - 当前执行次数
 * @property {number} proficiency.experience - 当前动作修为
 * @property {number} proficiency.experiencePerSecond - 每秒获取的动作修为
 * @property {number} proficiency.maxExperience - 当前等级的经验上限
 * @property {number} proficiency.levelUpRate - 等级提升系数，决定经验上限的增长速度
 * @property {number} [proficiency.efficiency=100] - 动作执行效率，范围0-100
 * @property {number} [proficiency.logForId] - 动作日志ID，用于记录动作执行日志
 * @property {Function|null} [proficiency.levelCallback] - 等级提升回调函数
 * @property {Array<Object>} [frameAttributeChanges=[]] - 每帧属性变化列表
 * @property {string} frameAttributeChanges[].attributeTarget - 属性目标，如'EXP'、'EP'等
 * @property {string} frameAttributeChanges[].keyTarget - 属性键，如'val'、'max'等
 * @property {number} frameAttributeChanges[].perSecond - 每秒属性变动值，负数表示减少
 * @property {Array<Object>} [levelAttributeChanges=[]] - 等级提升时的属性变化列表
 * @property {string} levelAttributeChanges[].attributeTarget - 属性目标
 * @property {string} levelAttributeChanges[].keyTarget - 属性键
 * @property {number} levelAttributeChanges[].perLevel - 每级属性变动值
 */

/**
 * 动作配置列表
 * 存储游戏中所有可执行动作的完整配置信息
 * @type {Array<ActionConfig>}
 */
export const actionConfigurations = [
  /**
   * Chopping Action Configuration
   * Basic action that consumes energy and gains cultivation
   */
  {
    uniqueId: 1,
    name: 'chopping',
    proficiency: {
      executeLimit: 0,          // 无执行次数限制
      executeCount: 0,          // 初始执行次数为0
      experience: 0,          // 初始动作修为为0
      experiencePerSecond: 3,  // 每秒获得3点动作经验
      maxExperience: 3,        // 当前等级经验上限为3
      levelUpRate: 0.2,        // 每次升级经验上限增加20%
    },
    frameAttributeChanges: [
      /**
       * Energy Consumption per Frame
       */
      {
        attributeTarget: 'EP',
        keyTarget: 'val',
        perSecond: -1.1,         // 每秒消耗1.1点精力值
      },
      /**
       * 每帧获得修为
       */
      {
        attributeTarget: 'EXP',
        keyTarget: 'val',
        perSecond: 5,           // 每秒获得5点修为，减慢修为增长速度
      }
    ],
    levelAttributeChanges: [
      /**
       * Qi Limit Increase on Level Up
       */
      {
        attributeTarget: 'QB',
        keyTarget: 'max',
        perLevel: 1,             // 每级增加1点气血上限
      }
    ]
  },
  /**
   * Breakthrough Action Configuration
   * Advanced action used to break through to the next stage
   */
  {
    uniqueId: 2,
    name: 'breakthrough',
    proficiency: {
      executeLimit: 1,          // 只能执行1次
      executeCount: 0,          // 初始执行次数为0
      experience: 0,          // 初始动作修为为0
      experiencePerSecond: 3,  // 每秒获得3点动作经验
      maxExperience: 3,        // 当前等级经验上限为3
      levelUpRate: 0.2,        // 每次升级经验上限增加20%
      efficiency: 100,         // 执行效率100%
      logForId: 1,             // 日志ID为1
      levelCallback: null      // 等级回调函数，由playAction.js动态设置
    },
    // 突破动作没有每帧属性变化
    frameAttributeChanges: [],
    // 突破动作没有等级提升属性变化
    levelAttributeChanges: []
  },
  /**
   * Skill Cultivation Action Configuration
   * Action to gain skill points for cultivation
   */
  {
    uniqueId: 3,
    name: 'skillCultivation',
    proficiency: {
      executeLimit: 0,          // 无执行次数限制
      executeCount: 0,          // 初始执行次数为0
      experience: 0,          // 初始动作修为为0
      experiencePerSecond: 5,  // 每秒获得5点动作经验
      maxExperience: 5,        // 当前等级经验上限为5
      levelUpRate: 0.2,        // 每次升级经验上限增加20%
    },
    frameAttributeChanges: [
      /**
       * Mana Consumption per Frame
       */
      {
        attributeTarget: 'MP',
        keyTarget: 'val',
        perSecond: -1.0,         // 每秒消耗1.0点法力值
      },
      /**
       * Skill Points Gain per Frame
       */
      {
        attributeTarget: 'SPT',
        keyTarget: 'val',
        perSecond: 2,           // 每秒获得2点功法点
      }
    ],
  },
  /**
   * Mining Action Configuration
   * Action to gain spirit stones
   */
  {
    uniqueId: 4,
    name: 'mining',
    proficiency: {
      executeLimit: 0,          // 无执行次数限制
      executeCount: 0,          // 初始执行次数为0
      experience: 0,          // 初始动作修为为0
      experiencePerSecond: 4,  // 每秒获得4点动作经验
      maxExperience: 4,        // 当前等级经验上限为4
      levelUpRate: 0.2,        // 每次升级经验上限增加20%
    },
    frameAttributeChanges: [
      /**
       * Energy Consumption per Frame
       */
      {
        attributeTarget: 'EP',
        keyTarget: 'val',
        perSecond: -1.5,         // 每秒消耗1.5点精力值
      },
      /**
       * 每帧获得修为
       */
      {
        attributeTarget: 'EXP',
        keyTarget: 'val',
        perSecond: 4,           // 每秒获得4点修为
      },
      /**
       * Spirit Stone Gain per Frame
       */
      {
        attributeTarget: 'SPIRIT_STONE',
        keyTarget: 'val',
        perSecond: 3,           // 每秒获得3点灵石
      }
    ],
    levelAttributeChanges: [
      /**
       * 等级提升时增加气血上限
       */
      {
        attributeTarget: 'QB',
        keyTarget: 'max',
        perLevel: 1,             // 每级增加1点气血上限
      }
    ]
  }
]
