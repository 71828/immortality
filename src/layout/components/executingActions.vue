<script setup>
import { useExecutionList } from '@/store/playAction'

// 初始化executionList store实例
const executionListStore = useExecutionList()
</script>

<template>
    <!-- 展示当前执行中的动作 -->
    <div class="executing-actions-container" :class="{ 'has-execution': executionListStore.executingActions.length > 0 }">
        <div class="executing-actions-list">
            <template v-if="executionListStore.executingActions.length > 0">
                <div class="executing-action-item" v-for="(action, index) in executionListStore.executingActions" :key="index">
                    <!-- 旋转的虚线圆圈 -->
                    <div class="rotating-circle"></div>
                    <div class="action-name">{{ action.name }}</div>
                    <div class="action-time">
                        {{ Math.floor(action.proficiency.experience / (action.proficiency.experiencePerSecond / 100) / 100) }}s
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.executing-actions-container {
    margin-bottom: 16px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
    border-radius: 12px;
    border: 1px solid var(--el-border-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    height: 60px;
    transition: all 0.3s ease;
}

.executing-actions-container.has-execution {
    border: 1px solid #34d399;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.executing-actions-list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
}

.executing-action-item {
    padding: 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 150px;
    justify-content: flex-start;
}

/* 旋转的虚线圆圈 */
.rotating-circle {
    width: 16px;
    height: 16px;
    border: 2px dashed #58a6ff;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
    flex-shrink: 0;
    opacity: 0.8;
    position: relative;
    
    /* 内部填充色 */
    background-color: rgba(88, 166, 255, 0.1);
    
    /* 动画效果 */
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        background-color: #58a6ff;
        border-radius: 50%;
    }
}

/* 旋转动画 */
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.action-name {
    font-size: 14px;
    font-weight: 500;
    color: #e6edf3;
    font-family: 'Courier New', monospace;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
</style>