<script setup>
import playResources from './playResources.vue'
import action from './action.vue'
import log from './log.vue'
import task from './task.vue'
</script>
<template>
    <div class="main-content">
        <div class="left">
            <div class="card">
                <playResources />
            </div>
        </div>
        <div class="center" >
            <div class="card">
                <action />
            </div>
        </div>
        <div class="right">
            <div class="card" style="margin-bottom: 24px;">
                <task />
            </div>
            <div class="card">
                <log />
            </div>

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
        width: 360px;
    }

    .center {
        flex: 1;
    }

    .right {
        width: 320px;
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
</style>