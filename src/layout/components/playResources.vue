<script setup>
import { playAttribute } from '@/store/playAttribute.js'
import { useMainStore } from '@/store/store'

const playAttr = playAttribute()

const list1 = ['QB', 'EP', 'MP']


</script>
<template>
    <div>
        <div class="card">
            <div class="list">
                <div class="item">
                    <div class="cell" style="display: flex;justify-content: space-between;">
                        <div class="label">xw：{{
                            playAttr.expStages[playAttr.EXP.stage].levels[playAttr.EXP.stageLevel].name }}

                        </div>
                        <div class="value">{{ Math.floor(playAttr.EXP.val) }}/{{ playAttr.EXP.max }}</div>

                    </div>
                </div>
                <div class="item">
                    <div class="label">ss：{{ playAttr.Life.baseVal + useMainStore().year }}/{{ playAttr.Life.max }}</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="list">
                <template v-for="(item, index) in list1" :key="index">
                    <div class="item" v-if="playAttr[item].visable">
                        <div class="cell">
                            <div class="label">{{ playAttr[item].name }}：</div>
                            <div class="value">{{ playAttr[item].val.toFixed(1) }}
                                <span v-if="playAttr[item].haveMax">/{{ playAttr[item].max.toFixed(1) }}</span>
                            </div>
                        </div>

                        <div class="line">
                            <div class="line-progress" :class="[item]"
                                :style="{ width: Number(((playAttr[item].val / playAttr[item].max) * 100)) + '%' }">
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>


</template>
<style lang="scss" scoped>
.list {
    width: 100%;
    padding: 16px;
    min-width: 0;

    .item {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 16px;
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0;

        &:nth-child(1) { animation-delay: 0.1s; }
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.3s; }
        &:nth-child(4) { animation-delay: 0.4s; }

        .cell {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            color: #e6edf3;
            width: 100%;
            min-width: 0;

            .label {
                font-weight: 500;
                color: #8b949e;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex-shrink: 1;
                max-width: 120px;
            }

            .value {
                font-weight: 500;
                color: #e6edf3;
                white-space: nowrap;
                flex-shrink: 0;
            }
        }

        .line {
            background-color: var(--el-border-color-light);
            height: 8px;
            position: relative;
            z-index: 1;
            border-radius: 4px;
            margin-top: 8px;
            overflow: hidden;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);

            .line-progress {
                width: 0%;
                height: 100%;
                position: absolute;
                z-index: 2;
                border-radius: 4px;

                &.QB {
                    background: #fc263f;
                }

                &.EP {
                    background: #ffb730;
                }

                &.MP {
                    background: #2c5afb;
                }
            }
        }
    }
}

.card {
    background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
    color: #e6edf3;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
    border: 1px solid var(--el-border-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}


</style>