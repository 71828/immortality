<script setup>
import { ref, computed } from 'vue'
import { executionList, actionData } from '@/store/playAction'
const { actionList } = actionData()
const { setExecution } = executionList()
function actionChange(item) {
    // 设置当前动作的执行状态并添加到执行队列
    setExecution(item)
}

// function isExecution(action) {
//     console.log(executionList().list.find(ele => ele.id === action.id));
// }
const isExecution = computed(() => {
    return (action) => {
        return executionList().list.some(ele => ele.id === action.id);
    }
});
</script>
<template>
    <div class="">
        <div class="aciton-list">
            <template v-for="(item, index) in actionList" :key="index">
                <div class="item" :class="{ isExecution: isExecution(item), expand: item.expand }" v-if="item.visibility"
                    @click="actionChange(item)">
                    <div class="head">
                        <div class="name">{{ item.name }} </div>
                        <div>{{ item.Proficiency.level }}
                            <span v-if="item.Proficiency.maxLevel">/{{ item.Proficiency.maxLevel }} </span>
                        </div>
                    </div>
                    <div class="content">
                        <div>
                            s: <span> {{ item.Proficiency.val === 0 ? 0 : item.Proficiency.val.toFixed(1)
                            }}/{{ item.Proficiency.capacity.toFixed(1) }}</span>
                        </div>
                        <div class="perSecond" v-if="isExecution(item)">

                            +{{ item.Proficiency.perSecond }}</div>
                    </div>
                    <div class="progress">
                        <div class="bar-wrap">
                            <div class="bar-item"
                                :style="{ width: Number(((item.Proficiency.val / item.Proficiency.capacity) * 100).toFixed(1)) + '%' }">
                            </div>
                        </div>

                    </div>
                    <div class="foot">
                        <div>
                            <el-icon class="icon" @click.stop="item.expand = !item.expand">
                                <MoreFilled />
                            </el-icon>
                        </div>
                        <el-icon class="icon" v-if="isExecution(item)">
                            <VideoPause />
                        </el-icon>
                        <el-icon class="icon" v-else>
                            <VideoPlay />
                        </el-icon>
                    </div>
                    <div class="desc" v-show="item.expand">
                        <div class="cell">
                            <div class="label">消耗 <span class="mark1">精力 </span> 每秒 -1 </div>
                            <div class="value"></div>
                        </div>
                        <div class="dvi"></div>
                        <div class="cell">
                            <div class="label">完成此动作提升 <span class="mark">气血 </span> +1 </div>
                            <div class="value"></div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.aciton-list {
    min-height: 500px;
    overflow: visible;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 20px;
    padding: 8px;

    .item {
        background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
        width: 180px;
        color: #e6edf3;
        padding: 12px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        border: 1px solid var(--el-border-color);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #58a6ff, #79c0ff, #58a6ff);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        &:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
            border-color: #58a6ff;

            &::before {
                transform: scaleX(1);
            }
        }

        .desc {
            position: absolute;
            left: -1px;
            right: -1px;
            top: 100%;
            background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
            border-radius: 0 0 16px 16px;
            transition: all 0.3s ease;
            font-size: 14px;
            padding: 16px;
            line-height: 24px;
            border: 1px solid var(--el-border-color);
            border-top: none;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

            .dvi {
                border-bottom: 1px solid var(--el-border-color-light);
                margin: 8px 0;
            }

            .mark {
                color: #f85149;
                font-weight: 500;
            }

            .mark1 {
                color: #ffb730;
                font-weight: 500;
            }
        }

        &.isExecution {
            border: 1px solid #58a6ff;
            box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);

            .desc {
                border: 1px solid #58a6ff;
                border-top: none;
            }
        }

        &.expand {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;

            .desc {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        }

        .head {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
            align-items: center;

            .name {
                font-size: 14px;
                font-weight: 600;
            }
        }

        .content {
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #8b949e;

            .perSecond {
                color: #58a6ff;
                font-weight: 500;
            }
        }

        .foot {
            padding-top: 8px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;

            .icon {
                font-size: 20px;
                padding: 3px;
                border-radius: 6px;
                transition: all 0.2s ease;

                &:hover {
                    color: #58a6ff;
                    background-color: rgba(88, 166, 255, 0.1);
                    transform: scale(1.1);
                }
            }
        }
    }
}

.progress {
    display: flex;
    align-items: center;

    .bar-wrap {
        flex: 1;
        height: 8px;
        border-radius: 4px;
        background-color: var(--el-border-color-light);
        position: relative;
        overflow: hidden;

        .bar-item {
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: linear-gradient(90deg, #1d1da3 0%, #4242cf 60%, #5a81ff 100%);
            border-radius: 4px;
        }
    }
}


</style>