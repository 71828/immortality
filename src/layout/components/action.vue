<script setup>
import { ref, computed } from 'vue'
import { useExecutionList, useActionData } from '@/store/playAction'

// 初始化store实例
const actionDataStore = useActionData();
const executionListStore = useExecutionList();

function actionChange(item) {
    // 设置当前动作的执行状态并添加到执行队列
    executionListStore.setExecutingAction(item);
}

// function isExecution(action) {
//     console.log(executionList().list.find(ele => ele.id === action.id));
// }
const isExecution = computed(() => {
    return (action) => {
        return executionListStore.executingActions.some(ele => ele.uniqueId === action.uniqueId);
    }
});
</script>
<template>
    <div class="">
        <div class="aciton-list">
            <!-- 动作列表 -->
            <template v-for="(item, index) in actionDataStore.actionList" :key="index">
                <div class="item" :class="{ isExecution: isExecution(item) }"
                    @click="actionChange(item)">
                    <div class="head">
                        <div class="name">{{ item.name }} </div>
                        <div class="level">{{ item.proficiency.executeCount }}
                            <span v-if="item.proficiency.executeLimit">/{{ item.proficiency.executeLimit }} </span>
                        </div>
                    </div>
                    <div class="content">
                        <div class="progress-text">
                            s: <span> {{ item.proficiency.experience === 0 ? 0 : item.proficiency.experience.toFixed(1)
                            }}/{{ item.proficiency.maxExperience.toFixed(1) }}</span>
                        </div>
                        <div class="perSecond" v-if="isExecution(item)">
                            +{{ item.proficiency.experiencePerSecond }}
                        </div>
                    </div>
                    <div class="progress">
                        <div class="bar-wrap">
                            <div class="bar-item"
                                :style="{ width: Number(((item.proficiency.experience / item.proficiency.maxExperience) * 100).toFixed(1)) + '%' }">
                            </div>
                        </div>
                    </div>
                    <div class="foot">
                        <div class="play-icon-container">
                            <el-icon class="play-icon" v-if="isExecution(item)">
                                <VideoPause />
                            </el-icon>
                            <el-icon class="play-icon" v-else>
                                <VideoPlay />
                            </el-icon>
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
    gap: 24px;
    padding: 16px;
}

.item {
    background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
    width: 190px;
    color: #e6edf3;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    border: 1px solid var(--el-border-color);
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 160px;
}

.item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #1d1da3 0%, #4242cf 60%, #5a81ff 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.item:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    border-color: #58a6ff;
}

.item.isExecution {
    border: 1px solid #58a6ff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
    background: linear-gradient(135deg, #1a1f2e 0%, #121520 100%);
    position: relative;
    overflow: hidden;
}

.item.isExecution::before {
    transform: scaleX(1);
}

.item.isExecution .bar-item {
    background: linear-gradient(90deg, #1d1da3 0%, #4242cf 50%, #5a81ff 100%);
}

.item.isExecution .play-icon {
    color: #58a6ff;
}

.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.head .name {
    font-size: 16px;
    font-weight: 600;
    color: #e6edf3;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.head .level {
    font-size: 14px;
    font-weight: 500;
    color: #58a6ff;
    background-color: rgba(88, 166, 255, 0.1);
    padding: 2px 8px;
    border-radius: 12px;
    white-space: nowrap;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #8b949e;
    gap: 8px;
    flex-shrink: 0;
    min-height: 24px;
}

.content .progress-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.content .perSecond {
    color: #58a6ff;
    font-weight: 600;
    font-size: 12px;
    background-color: rgba(88, 166, 255, 0.15);
    padding: 2px 6px;
    border-radius: 8px;
    white-space: nowrap;
    flex-shrink: 0;
    min-width: 48px;
    text-align: right;
}

.progress {
    display: flex;
    align-items: center;
    width: 100%;
    flex-shrink: 0;
}

.bar-wrap {
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
}

.bar-item {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #1d1da3 0%, #4242cf 60%, #5a81ff 100%);
    border-radius: 3px;
}

.foot {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 4px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    flex-shrink: 0;
    min-height: 36px;
}

.foot .play-icon-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
}

.foot .play-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 6px;
    border-radius: 8px;
    transition: all 0.2s ease;
    color: #8b949e;
    flex-shrink: 0;
    min-width: 32px;
    min-height: 32px;
}

.foot .play-icon:hover {
    color: #58a6ff;
    background-color: rgba(88, 166, 255, 0.1);
    transform: scale(1.05);
}


</style>