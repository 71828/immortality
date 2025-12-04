<script setup>

import { useMainStore } from '@/store/store'
import { playAttribute } from '@/store/playAttribute.js'

const playAttr = playAttribute()

</script>
<template>
    <div class="head">
        <div class="left-section">
            <div class="attribute-item">
                <div style="display: flex; align-items: center; justify-content: flex-start;">
                    <div class="label">{{ playAttr.Life.name }}</div>
                    <div class="value">{{ playAttr.Life.baseVal + useMainStore().year }}/{{ playAttr.Life.max }}</div>
                </div>
            </div>
            <div class="attribute-item">
                <div style="display: flex; align-items: center; justify-content: flex-start;">
                    <div class="label">{{ playAttr.SPIRIT_STONE.name }}</div>
                    <div class="value">{{ Math.floor(playAttr.SPIRIT_STONE.val) }}</div>
                </div>
            </div>
        </div>
        <div class="center-section">
            <div class="attribute-item exp-item">
                <div
                    style="display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%; justify-content: flex-end;">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <div class="label">{{
                            playAttr.expStages[playAttr.EXP.stage].levels[playAttr.EXP.stageLevel].name }}</div>
                        <div class="value exp-value"> {{ Math.floor(playAttr.EXP.val) }}/{{ playAttr.EXP.max }}</div>
                    </div>
                    <div class="grid-progress">
                        <div class="grid-container">
                            <!-- 固定最大格子数量为10个，根据max值动态调整每个格子代表的修为值 -->
                            <div v-for="i in 10" :key="i" class="grid-item"
                                :class="{ 'filled': (i * (playAttr.EXP.max / 10)) <= Math.floor(playAttr.EXP.val) }">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-section">
            Dao Calendar {{ useMainStore().fromatDay }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
.head {
    background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
    border-bottom: 1px solid #30363d;
    color: #7ee787;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
    font-weight: 700;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    letter-spacing: 2px;
    text-shadow: 0 0 8px rgba(126, 231, 135, 0.4), 0 0 16px rgba(126, 231, 135, 0.2);
    font-family: 'Microsoft YaHei', 'SimHei', sans-serif;
    animation: fadeInDown 0.5s ease forwards;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.left-section {
    display: flex;
    gap: 30px;
    height: 100%;
    align-items: center;
}

.right-section {
    margin-left: auto;
    color: #8b949e;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: none;
}

.attribute-item {
    display: flex;
    flex-direction: row;
    align-items: center;

    background: transparent;
    min-width: 140px;

}

.attribute-item .label {
    font-size: 11px;
    color: #8b949e;
    line-height: 16px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-right: 8px;
}

.attribute-item .value {
    font-size: 14px;
    color: #e6edf3;
    line-height: 20px;
    font-weight: 600;
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
    letter-spacing: 0.5px;
    white-space: nowrap;
}

/* 为不同属性添加特定颜色 */
.attribute-item:nth-child(1) .value {
    color: #7ee787;
}

.attribute-item:nth-child(2) .value {
    color: #85d7ff;
}

/* 修为数值显示为灰色 */
.exp-value {
    color: #8b949e !important;
}

.exp-item {
    flex-direction: column;
    width: 600px;
    height: 40px;
    border: 1px solid var(--el-border-color);
    border-radius: 2px;
    padding: 8px 12px;
    padding-left: 10px;
    background: transparent;
    .grid-progress {
        width: 100%;
    }
}

/* 格子进度条样式 */
.grid-progress {
    margin-top: 6px;
    width: 100%;
}

.grid-container {
    display: flex;
    gap: 3px;
    
    align-items: center;
    width: 100%;
}

.grid-item {
    flex: 1;
    height: 1px;
    background: #8b949e;
    border-radius: 0;
    transition: all 0.3s ease;
}

.grid-item.filled {
    background: #c79a31;
    border-color: #c79a31;
    box-shadow: 0 0 4px rgba(88, 166, 255, 0.5);
}

.center-section {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>