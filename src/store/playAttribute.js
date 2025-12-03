import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useActionData } from './playAction';
import { Decimal } from 'decimal.js';

export const playAttribute = defineStore('playAttribute', () => {
  // 经验值表 - 定义各阶段各等级的经验值上限
  const expStages = ref([{
    levels: [{
      name: 'fr',
      max: 9
    }]
  }, {
    levels: [{
      name: 'lq1',
      max: 19
    }, {
      name: 'lq2',
      max: 39
    }, {
      name: 'lq3',
      max: 59
    }, {
      name: 'lq4',
      max: 79
    }, {
      name: 'lq5',
      max: 99
    }, {
      name: 'lq6',
      max: 119
    }]
  }]);

  // 经验值属性
  const EXP = ref({
    name: 'xw',
    val: 0,
    max: 9,
    stage: 0,
    stageLevel: 0
  });

  const Life = ref({
    name: 'Life',
    baseVal: 10,
    max: 60
  });

  const QB = ref({
    name: 'q',
    val: 5,
    max: 5,
    perSecond: 0.1,
    visable: true,
    haveMax: true
  });

  const EP = ref({
    name: 'j',
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
    name: 'ff',
    val: 100,
    max: 100,
    perSecond: 1,
    visable: false,
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
    name: 'zy',
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
    name: 'ml',
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
    name: 'wx',
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
    name: 'ss',
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
    name: 'ys',
    val: 0,
    max: 0,
    visable: false,
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

    // 特殊处理经验值变化
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
   * 处理经验值变化
   * 管理经验值的升级和突破逻辑
   * 
   * @param {number} newValue - 新的经验值
   */
  function handleExpChange(newValue) {
    const actionDataStore = useActionData();
    // 判断是否经验到达上限
    if (newValue >= EXP.value.max) {
      // 经验值已达上限，触发突破逻辑
      EXP.value.val = EXP.value.max;
      if (EXP.value.stage === 0) {
        actionDataStore.addAction(2);
        // 基础阶段，经验值达到上限后，设置为上限值
        
      }
      if (EXP.value.stage === 1) {
        // 突破阶段，调用突破方法，该方法会自动处理经验值和等级
        breakthrough();
      }
    } else {
      // 经验值未达上限，正常赋值
      EXP.value.val = newValue;
    }
  }
  /**
   * 修为突破方法
   * 突破到下一等级，清空当前经验值，并更新经验值上限
   * 
   * 突破逻辑：
   * 1. 检查当前等级是否是当前阶段的最后一个等级
   * 2. 如果是最后一个等级，突破到下一阶段，等级重置为0
   * 3. 如果不是最后一个等级，突破到当前阶段的下一等级
   * 4. 清空当前经验值
   * 5. 从经验值表中获取对应的经验值上限
   * 
   * @returns {boolean|Error} - 突破成功返回true，失败返回Error对象
   */
  function breakthrough() {
    // 获取当前状态
    const currentStage = EXP.value.stage;
    const currentStageLevel = EXP.value.stageLevel;
    const stage = expStages.value[currentStage];

    // 检查当前经验值是否达到突破要求
    if (EXP.value.val < EXP.value.max) {
      return new Error('经验值不足，无法突破');
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

    // 清空当前经验值
    EXP.value.val = 0;

    // 从经验值表中获取对应的经验值上限
    const targetStage = expStages.value[newStage];
    const targetLevel = targetStage.levels[newStageLevel];
    EXP.value.max = targetLevel.max;

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
    EXP,         // 经验值属性
    expStages,   // 经验值表配置
    Life,        // 生命值属性
    QB,          // 气血值属性
    EP,          // 精力值属性
    MP,          // 法力值属性
    SE,          // 神识属性
    CHA,         // 魅力属性
    CP,          // 悟性属性
    SS,          // 寿元属性
    SP,          // 运势属性
    setAttr,     // 设置属性值的方法
    regeneration,// 属性自动回复方法
    handleExpChange, // 处理经验值变化的方法
    breakthrough // 修为突破方法
  };
});
