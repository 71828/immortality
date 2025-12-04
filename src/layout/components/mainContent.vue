<script setup>
import { ref } from 'vue'
import playResources from './playResources.vue'
import action from './action.vue'
import log from './log.vue'
import task from './task.vue'
import executingActions from './executingActions.vue'
import inventory from './inventory.vue'
import skill from './skill.vue'

// 初始化当前激活的tab，默认显示第一个标签页
const activeTab = ref('skills')
</script>
<template>
    <div class="main-content">
        <div class="left">
                <playResources />
          
        </div>
        <div class="center">
                <!-- 展示当前执行中的动作 -->
                <executingActions />
           
            <div class="card">
                <el-tabs v-model="activeTab" class="custom-tabs">
                    <el-tab-pane label="Actions" name="actions">
                        <action />
                    </el-tab-pane>
                    <el-tab-pane label="Bag" name="bag">
                        <inventory />
                    </el-tab-pane>
                    <el-tab-pane label="Skills" name="skills">
                        <skill />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="right">
                <task />
        
                <log />
       

        </div>


    </div>
</template>
<style lang="scss" scoped>
.main-content {
    display: flex;
    padding: 24px;
    gap: 24px;
    background-color: #0f1117;
    min-height: 100vh;

    .left {
        width: 240px;
    }

    .center {
        flex: 1;
    }

    .right {
        width: 320px;
        display: flex;
        flex-direction: column;
    }
}

.card {
    border-radius: 12px;
    padding: 24px;
    background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
    border: 1px solid var(--el-border-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    margin-bottom: 24px;
}

/* 简化tab样式，保持简洁 */
:deep(.custom-tabs) {
    .el-tabs__header {
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .el-tabs__item {
        color: #8b949e;
        font-size: 14px;
        font-weight: 500;
        margin-right: 20px;
        padding: 8px 0;
        
        &:hover {
            color: #e6edf3;
        }
        
        &.is-active {
            color: #58a6ff;
        }
    }
    
    .el-tabs__active-bar {
        background-color: #58a6ff;
        height: 2px;
    }
    
    .el-tab-pane {
        padding: 0;
    }
}

.tab-content {
    padding: 20px;
    text-align: center;
    color: #8b949e;
    font-size: 14px;
}
</style>