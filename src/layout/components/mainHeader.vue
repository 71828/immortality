<script setup >

import { useMainStore } from '@/store/store'




</script>
<template>
    <div class="head">
       Dao Calendar {{useMainStore().fromatDay}}
    </div>
</template>
<style lang="scss" scoped>
    .head{
        background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
        border-bottom: 1px solid #30363d;
        text-align: center;
        color: #7ee787;
        font-size: 20px;
        height: 60px;
        line-height: 60px;
        font-weight: 700;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
        letter-spacing: 2px;
        text-shadow: 0 0 8px rgba(126, 231, 135, 0.4), 0 0 16px rgba(126, 231, 135, 0.2);
        font-family: 'Microsoft YaHei', 'SimHei', sans-serif;
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