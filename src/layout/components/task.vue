<script setup>
import { task } from '@/store/task'
const alltask = task()
</script>
<template>
    <div>
        <div class="card">
            
            <!-- 当前活跃任务 - 移除进度条，保留数字进度 -->
            <div v-if="alltask.activeTask" class="active-task">
                <!-- 任务名称 -->
                <div class="task-name">{{ alltask.activeTask.name }}</div>
                <!-- 数字进度 -->
                <div class="task-progress">{{ alltask.activeTask.progress.current }}/{{ alltask.activeTask.progress.target }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
    color: #e6edf3;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 0;
    border: 1px solid #30363d;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
}

/* 活跃任务样式 */
.active-task {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.task-name {
    font-size: 14px;
    font-weight: 600;
    color: #e6edf3;
    line-height: 1.4;
}

.task-progress {
    font-size: 13px;
    color: #58a6ff;
    font-weight: 500;
    background: rgba(88, 166, 255, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    align-self: flex-start;
    min-width: 80px;
    text-align: center;
}
</style>