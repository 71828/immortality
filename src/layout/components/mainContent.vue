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
    gap: 32px;
    border: 1px solid #101118;

    .left {}

    .center {
        flex: 1;
    }

    .right {
        width: 300px;
    }

}

.card {
    border-radius: 4px;
    padding: 24px;
    background-color: #101118;
    border: 2px solid #333;
    border-radius: 8px;

}
</style>