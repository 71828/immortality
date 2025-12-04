import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useActionData } from './playAction';
import { Decimal } from 'decimal.js';
// 导入任务store，用于更新任务进度
import { task as taskStore } from './task';
import { log as logStore } from './log';

export const playAttribute = defineStore('playAttribute', () => {
  // 修为表 - 定义各阶段各等级的修为上限
  const expStages = ref([{
    levels: [{
      name: 'Mortal Body',
      max: 9
    }]
  }, {
    levels: [{
      name: 'Qi Refining Layer 1',
      max: 19
    }, {
      name: 'Qi Refining Layer 2',
      max: 39
    }, {
      name: 'Qi Refining Layer 3',
      max: 59
    }, {
      name: 'Qi Refining Layer 4',
      max: 79
    }, {
      name: 'Qi Refining Layer 5',
      max: 99
    }, {
      name: 'Qi Refining Layer 6',
      max: 119
    }]
  }]);

  // 修为属性
  const EXP = ref({
    name: 'Cultivation',
    val: 0,
    max: 9,
    stage: 0,
    stageLevel: 0
  });
  
  // 日志标志位，避免重复添加日志
  const logFlags = ref({
    experienceFull: false // 修为达到上限日志是否已添加
  });

  const Life = ref({
    name: 'Longevity',
    baseVal: 10,
    max: 60
  });

  const QB = ref({
    name: 'Qi',
    val: 5,
    max: 5,
    perSecond: 0.1,
    visable: true,
    haveMax: true
  });

  const EP = ref({
    name: 'Energy',
    val: 10,
    max: 10,
    perSecond: 0.1,
    visable: true,
    haveMax: true
  });

  /**
   * 法力值属性 (Magic Points)
   * 用于法术和特殊能力
   * 
   * 属性说明：
   * - name: 属性名称标识
   * - val: 当前法力值
   * - max: 最大法力值
   * - perSecond: 每秒回复量
   * - visable: 是否在UI中显示
   * - haveMax: 是否有最大值限制
   */
  const MP = ref({
    name: 'Mana',
    val: 100,
    max: 100,
    perSecond: 1,
    visable: true,
    haveMax: true
  });

  /**
   * 神识属性 (Spiritual Energy)
   * 用于精神层面的能力和感知
   * 
   * 属性说明：
   * - name: 属性名称标识
   * - val: 当前神识值
   * - max: 最大神识值
   * - visable: 是否在UI中显示
   * - haveMax: 是否有最大值限制
   */
  const SE = ref({
    name: 'Spirit',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false
  });

  /**
   * 魅力属性 (Charisma)
   * 影响角色与NPC的互动和社交
   * 
   * 属性说明：
   * - name: 属性名称标识
   * - val: 当前魅力值
   * - max: 最大魅力值
   * - visable: 是否在UI中显示
   * - haveMax: 是否有最大值限制
   */
  const CHA = ref({
    name: 'Charisma',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false
  });

  /**
   * 悟性属性 (Comprehension)
   * 影响角色的学习和领悟能力
   * 
   * 属性说明：
   * - name: 属性名称标识
   * - val: 当前悟性值
   * - max: 最大悟性值
   * - visable: 是否在UI中显示
   * - haveMax: 是否有最大值限制
   */
  const CP = ref({
    name: 'Wisdom',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false
  });

  /**
   * 寿元属性 (Longevity)
   * 影响角色的寿命和衰老
   * 
   * 属性说明：
   * - name: 属性名称标识
   * - val: 当前寿元值
   * - max: 最大寿元值
   * - visable: 是否在UI中显示
   * - haveMax: 是否有最大值限制
   */
  const SS = ref({
    name: 'Longevity',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false
  });

  /**
   * 运势属性 (Luck)
   * 影响角色的随机事件和机遇
   * 
   * 属性说明：
   * - name: 属性名称标识
   * - val: 当前运势值
   * - max: 最大运势值  
   * - visable: 是否在UI中显示
   * - haveMax: 是否有最大值限制
   */
  const SP = ref({
    name: 'Luck',
    val: 0,
    max: 0,
    visable: false,
    haveMax: false
  });

  /**
   * 功法点属性 (Skill Points)
   * 用于功法修炼和突破
   * 
   * 属性说明：
   * - name: 属性名称标识
   * - val: 当前功法点
   * - max: 最大功法点
   * - visable: 是否在UI中显示（设为false，不在左侧面板显示）
   * - haveMax: 是否有最大值限制（设为false，无上限）
   */
  const SPT = ref({
    name: 'Skill Points',
    val: 500,
    max: 0,
    visable: false,
    haveMax: false
  });

  /**
   * 灵石属性 (Spirit Stone)
   * 用于游戏内交易和资源兑换
   * 
   * 属性说明：
   * - name: 属性名称标识
   * - val: 当前灵石数量
   * - max: 最大灵石数量（设为0，无上限）
   * - visable: 是否在UI中显示（设为true，在左侧面板显示）
   * - haveMax: 是否有最大值限制（设为false，无上限）
   */
  const SPIRIT_STONE = ref({
    name: 'Spirit Stone',
    val: 0,
    max: 0,
    visable: true,
    haveMax: false
  });

  /**
   * 设置属性值
   * 处理各种属性的变化逻辑
   * 
   * @param {string} type - 操作类型 ('frame' 每帧变化, 'level' 等级变化)
   * @param {string} attrTarget - 属性目标 (如 'EXP', 'QB', 'EP' 等)
   * @param {string} keyTarget - 属性键 (如 'val', 'max' 等)
   * @param {number} val - 变化的值
   * @returns {Error|null} - 可能的错误信息，成功则返回null
   */
  function setAttr(type, attrTarget, keyTarget, val) {
    // 如果是每帧变化，将值除以100（因为每秒100帧）
    if (type === 'frame') {
      val = val / 100;
    }

    // 特殊处理修为变化
    if (attrTarget === 'EXP' && keyTarget === 'val') {
      const currentVal = new Decimal(EXP.value.val);
      const changeVal = new Decimal(val);
      const newValue = currentVal.plus(changeVal).toNumber();
      handleExpChange(newValue);
      return;
    }

    // 根据属性目标找到对应的属性引用
    let attrRef;
    switch (attrTarget) {
      case 'QB': attrRef = QB; break;
      case 'EP': attrRef = EP; break;
      case 'MP': attrRef = MP; break;
      case 'Life': attrRef = Life; break;
      case 'SE': attrRef = SE; break;
      case 'CHA': attrRef = CHA; break;
      case 'CP': attrRef = CP; break;
      case 'SS': attrRef = SS; break;
      case 'SP': attrRef = SP; break;
      case 'SPT': attrRef = SPT; break;
      case 'SPIRIT_STONE': attrRef = SPIRIT_STONE; break;
      default: return new Error(`Attribute ${attrTarget} not found`);
    }

    // 特殊处理精力值变化，确保不小于0
    if (attrTarget === 'EP' && keyTarget === 'val') {
      const currentVal = new Decimal(attrRef.value[keyTarget]);
      const changeVal = new Decimal(val);
      const newValue = currentVal.plus(changeVal).toNumber();
      attrRef.value[keyTarget] = Math.max(newValue, 0);
      return;
    }

    // 处理其他属性的变化
    const currentVal = new Decimal(attrRef.value[keyTarget]);
    const changeVal = new Decimal(val);
    const newValue = currentVal.plus(changeVal).toNumber();

    // 确保属性值不小于0
    if (newValue < 0) {
      return new Error('Attribute value cannot be negative');
    }

    // 更新属性值
    attrRef.value[keyTarget] = newValue;
    return;
  }
  /**
   * 处理修为变化
   * 管理修为的升级和突破逻辑
   * 
   * @param {number} newValue - 新的修为
   */
  function handleExpChange(newValue) {
    const actionDataStore = useActionData();
    const logs = logStore();
    
    // 判断是否修为到达上限
    if (newValue >= EXP.value.max) {
      // 修为已达上限，触发突破逻辑
      EXP.value.val = EXP.value.max;
      
      // 只有当标志位为false时才添加日志，避免重复添加
      if (!logFlags.value.experienceFull) {
        // 添加修为达到上限日志
        logs.addLog({
        type: 'EXPERIENCE_FULL',
        title: 'Cultivation Reached Limit',
        description: `Cultivation has reached the limit of ${EXP.value.max} for this stage, ready to breakthrough`
      });
        
        // 设置标志位为true，防止重复添加
        logFlags.value.experienceFull = true;
      }
      
      if (EXP.value.stage === 0) {
        actionDataStore.addAction(2);
        // 基础阶段，修为达到上限后，设置为上限值
        
      }
      if (EXP.value.stage === 1) {
        // 突破阶段，调用突破方法，该方法会自动处理修为和等级
        const result = breakthrough();
        if (result === true) {
          logs.addLog({
        type: 'ACTION_COMPLETE',
        title: 'Breakthrough Successful',
        description: `Successfully broke through to a new stage. Current stage: ${EXP.value.stage}, Level: ${EXP.value.stageLevel}`
      });
          // 突破成功后重置标志位，以便下次达到上限时能再次添加日志
          logFlags.value.experienceFull = false;
        }
      }
    } else {
      // 修为未达上限，正常赋值
      EXP.value.val = newValue;
      
      // 重置标志位，以便下次达到上限时能再次添加日志
      logFlags.value.experienceFull = false;
    }
  }
  /**
   * 修为突破方法
   * 突破到下一等级，清空当前修为，并更新修为上限
   * 
   * 突破逻辑：
   * 1. 检查当前等级是否是当前阶段的最后一个等级
   * 2. 如果是最后一个等级，突破到下一阶段，等级重置为0
   * 3. 如果不是最后一个等级，突破到当前阶段的下一等级
   * 4. 清空当前修为
   * 5. 从修为表中获取对应的修为上限
   * 
   * @returns {boolean|Error} - 突破成功返回true，失败返回Error对象
   */
  function breakthrough() {
    // 获取当前状态
    const currentStage = EXP.value.stage;
    const currentStageLevel = EXP.value.stageLevel;
    const stage = expStages.value[currentStage];

    // 检查当前修为是否达到突破要求
    if (EXP.value.val < EXP.value.max) {
      return new Error('修为不足，无法突破');
    }

    // 执行突破逻辑
    let newStage = currentStage;
    let newStageLevel = currentStageLevel;

    // 检查当前等级是否是当前阶段的最后一个等级
    if (currentStageLevel >= stage.levels.length - 1) {
      // 当前等级是当前阶段的最后一个等级，尝试突破到下一阶段

      // 检查是否可以突破到下一阶段
      if (currentStage >= expStages.value.length - 1) {
        return new Error('当前已经是最高阶段，无法继续突破');
      }

      // 突破到下一阶段
      newStage = currentStage + 1;
      newStageLevel = 0; // 等级重置为0
    } else {
      // 当前等级不是当前阶段的最后一个等级，突破到下一等级
      newStageLevel = currentStageLevel + 1;
    }

    // 更新阶段和等级
    EXP.value.stage = newStage;
    EXP.value.stageLevel = newStageLevel;

    // 清空当前修为
    EXP.value.val = 0;

    // 更新修为上限
    const targetStage = expStages.value[newStage];
    const targetLevel = targetStage.levels[newStageLevel];
    EXP.value.max = targetLevel.max;
    
    // 更新突破任务进度
    const tasks = taskStore();
    tasks.updateBreakthroughTaskProgress();
    
    // 突破到第二阶段（stage 1）时添加突破日志
    if (newStage === 1) {
      // 添加突破成功日志
      const logs = logStore();
      logs.addLog({
        type: 'ACTION_COMPLETE',
        title: 'Stage Breakthrough',
        description: 'Successfully broke through to the second stage!'
      });
    }

    return true;
  }

  /**
   * 属性自动回复
   * 处理属性的自动回复机制
   * 
   * 该函数负责：
   * - 遍历需要自动回复的属性（QB、EP、MP）
   * - 计算每帧的回复量（基于每秒回复量 / 100，因为游戏以100帧/秒运行）
   * - 更新属性值，确保不超过最大值
   */
  function regeneration() {
    // 遍历需要自动回复的属性
    [QB, EP, MP].forEach(attrRef => {
      // 只有当前值小于最大值时才回复
      if (attrRef.value.val < attrRef.value.max) {
        // 计算每帧回复量（每秒回复量 / 100帧）
        const perSecond = new Decimal(attrRef.value.perSecond);
        const val = perSecond.dividedBy(100).toNumber();

        // 计算新的属性值
        const currentVal = new Decimal(attrRef.value.val);
        const changeVal = new Decimal(val);
        const newValue = currentVal.plus(changeVal).toNumber();

        // 更新属性值，确保不超过最大值
        attrRef.value.val = Math.min(newValue, attrRef.value.max);
      }
    });
  }

  return {
    EXP,         // 修为属性
    expStages,   // 修为表配置
    Life,        // 生命值属性
    QB,          // 气血值属性
    EP,          // 精力值属性
    MP,          // 法力值属性
    SE,          // 神识属性
    CHA,         // 魅力属性
    CP,          // 悟性属性
    SS,          // 寿元属性
    SP,          // 运势属性
    SPT,         // 功法点属性
    SPIRIT_STONE, // 灵石属性
    setAttr,     // 设置属性值的方法
    regeneration,// 属性自动回复方法
    handleExpChange, // 处理修为变化的方法
    breakthrough // 修为突破方法
  };
});