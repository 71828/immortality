<script setup>
import { log } from '@/store/log'
const logs = log()



</script>
<template>
    <div>
        <div class="card">

            <div class="title">rz</div>
            <div class="list">
                <div class="item" v-for="(item, index) in logs.displayList" :key="index">
                    <div class="date"> {{ item.date }}</div>
                    <div class="title" >{{ item.title}}</div>
                </div>
            </div>
        </div>

    </div>



</template>
<style lang="scss" scoped>
.card {
    background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
    color: #e6edf3;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 0;
    border: 1px solid var(--el-border-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #58a6ff;
    border-bottom: 1px solid var(--el-border-color-light);
    padding-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.list {
    max-height: 250px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(88, 166, 255, 0.5) transparent;
    padding-right: 4px;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(88, 166, 255, 0.5);
        border-radius: 2px;
        transition: background 0.2s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: rgba(88, 166, 255, 0.8);
    }

    &::-webkit-scrollbar-corner {
        background: transparent;
    }

    .item {
        display: flex;
        flex-direction: column;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        font-size: 13px;
        animation: fadeInUp 0.2s ease-out forwards;
        opacity: 0;
        gap: 4px;

        &:last-child {
            border-bottom: none;
        }

        .date {
            color: #6e7681;
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .title {
            color: #e6edf3;
            font-size: 13px;
            font-weight: 400;
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
            text-transform: none;
            letter-spacing: 0;
            line-height: 1.4;
        }
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(3px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>