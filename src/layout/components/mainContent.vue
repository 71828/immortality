<script setup >
    import playResources from './playResources.vue'
    import playAction from './playAction.vue'
</script>
<template>
    <div class="main-content">
        <playResources/>
        <playAction/>
    </div>
</template>
<style lang="scss" scoped>
    .main-content{
        display: flex;
        padding: 24px;
        gap: 24px;
    }
</style>