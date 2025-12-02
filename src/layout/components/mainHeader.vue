<script setup >

import { useMainStore } from '@/store/store'




</script>
<template>
    <div class="head">
       dl {{useMainStore().fromatDay}}
    </div>
</template>
<style lang="scss" scoped>
    .head{
        background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
        border-bottom: 1px solid var(--el-border-color);
        text-align: center;
        color: #58a6ff;
        font-size: 18px;
        height: 60px;
        line-height: 60px;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        letter-spacing: 1px;
        animation: fadeInDown 0.5s ease forwards;
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>