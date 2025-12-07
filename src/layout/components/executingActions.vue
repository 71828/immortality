<script setup>
import { useExecutionList } from '@/store/playAction'
import { skillStore } from '@/store/skill'
// 初始化executionList store实例
const executionListStore = useExecutionList()
const skillStoreInstance = skillStore()
//autoCultivateSkills
</script>

<template>
    <!-- 展示当前执行中的动作 -->
    <div class="executing-actions-container">
        <div class="executing-actions-list">

            <!-- 显示其他执行中的动作 -->
            <template v-if="executionListStore.executingActions.length > 0">
                <div class="executing-action-item has-execution"
                    v-for="(action, index) in executionListStore.executingActions" :key="index">
                    <!-- 旋转的虚线圆圈 -->
                    <div class="rotating-circle"></div>

                    <div class="action-name">{{ action.name }}</div>
                   
                </div>
            </template>
              <!-- 显示其自动修炼中的功法 -->
            <template v-if="skillStoreInstance.autoCultivateSkills.length > 0">
                <div class="executing-action-item has-execution skill-execution"
                    v-for="(skill, index) in skillStoreInstance.autoCultivateSkills" :key="index">
                    <!-- 旋转的虚线圆圈 -->
                    <div class="rotating-circle"></div>
                    <div class="action-name">{{ skill.name }}</div>
                    
                </div>
            </template>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.executing-actions-container {
    padding: 0;
    background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    min-height: 60px;
}
.executing-actions-list {
    width: 100%;
    display: flex;
    align-items: center;

    gap: 12px;
    flex-wrap: wrap;
}

.executing-action-item {
    padding: 8px 0;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 250px;
    min-width: 150px;
    justify-content: flex-start;
    height: 50px;

    &.has-execution {
            border: 1px solid #34d39984;
            border-radius: 8px;
            padding: 4px 8px;
            background: rgba(52, 211, 153, 0.05);
            box-sizing: border-box;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

            &.skill-execution {
                border: 1px solid #e6a23c84;
                background: rgba(230, 162, 60, 0.05);
            }
        }
}

/* 旋转的虚线圆圈 */
.rotating-circle {
    width: 16px;
    height: 16px;
    border: 2px dashed #34d399;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
    flex-shrink: 0;
    opacity: 0.8;
    position: relative;

    /* 内部填充色 */

    /* 动画效果 */
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        background-color: #34d399;
        border-radius: 50%;
    }
}

/* skill-execution类型的旋转圆圈样式 */
.skill-execution .rotating-circle {
    border: 2px dashed #e6a23c;
    &::before {
        background-color: #e6a23c;
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
    padding: 1px 6px;
    border-radius: 10px;
    white-space: nowrap;
}
</style>