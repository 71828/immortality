<script setup >
    import {ref} from 'vue'
    import { useMainStore } from '../store/store'

</script>
<template>
    <div class="warp">
        <div class="list" v-for="(item, index) in list" :key="index">
            
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .warp{
        border: 1px solid #999;
        border-radius: 12px;
        width: 200px;
        padding: 32px;
    }
</style>