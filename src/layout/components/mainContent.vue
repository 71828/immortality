<script setup >
    import playResources from './playResources.vue'
    import action from './action.vue'
    import actionDetail from './actionDetail.vue'
</script>
<template>
    <div class="main-content">
            <div class="card">
                <playResources/>
            </div>
            <div class="card" style="flex: 1;">
                <action />
            </div>
            <div class="card" >
                <actionDetail />
            </div>
            
      
    </div>
</template>
<style lang="scss" scoped>
    .main-content{
        display: flex;
        padding: 24px;
        gap: 32px;
    }
    .card{
        border-radius: 4px;
        padding: 24px;
        background-color: #101118;

    }
</style>