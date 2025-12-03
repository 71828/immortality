<script setup>
import { useExecutionList } from '@/store/playAction'

// 初始化executionList store实例
const executionListStore = useExecutionList()
</script>

<template>
    <!-- 展示当前执行中的动作 -->
    <div class="executing-actions-section">
        <div class="section-content">
            <template v-if="executionListStore.executingActions.length > 0">
                <div class="executing-action-item" v-for="(action, index) in executionListStore.executingActions" :key="index">
                    <div class="action-info">
                        <div class="action-name">{{ action.name }}</div>
                        <div class="action-time">
                            {{ Math.floor(action.proficiency.experience / (action.proficiency.experiencePerSecond / 100) / 100) }}s
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.executing-actions-section {
    margin-bottom: 16px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    border: 1px solid var(--el-border-color-light);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    height: 40px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
}

.section-content {
    padding: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.executing-action-item {
    padding: 8px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.action-info {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    justify-content: space-between;
}

.action-name {
    font-size: 14px;
    font-weight: 500;
    color: #e6edf3;
    font-family: 'Courier New', monospace;
}

.action-time {
    font-size: 12px;
    color: #8b949e;
    font-family: 'Courier New', monospace;
    background-color: rgba(88, 166, 255, 0.1);
    padding: 1px 6px;
    border-radius: 10px;
    border: 1px solid rgba(88, 166, 255, 0.2);
    white-space: nowrap;
}

/* 当没有执行动作时的样式 */
.executing-actions-section:empty::after {
    content: 'No actions in progress';
    font-size: 13px;
    color: #6e7681;
    text-align: center;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>