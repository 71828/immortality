<script setup >import {computed, ref} from 'vue'

import { useMainStore } from '@/store/store'




</script>
<template>
    <div class="head">
       <!-- 道历 {{useMainStore().fromatDay}} -->
    </div>
</template>
<style lang="scss" scoped>
    .head{
        border-bottom: 1px solid #23252f;
        text-align: center;
        color: #ccc;
        font-size: 18px;
        height: 50px;
        line-height: 50px;
    }
</style>