<script setup >
    import playResources from './playResources.vue'
    import playAction from './action.vue'
</script>
<template>
    <div class="main-content">
        <div>
            <playResources/>
        </div>

        <el-card  :body-style="{ padding: '20px' }" style="width: 1000px;">
            <playAction/>
        </el-card>
    </div>
</template>
<style lang="scss" scoped>
    .main-content{
        display: flex;
        padding: 24px;
        gap: 24px;
    }
        .card{
        border: 1px solid #999;
        border-radius: 8px;
        
        padding: 12px;
    }
</style>