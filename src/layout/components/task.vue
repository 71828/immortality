<script setup>
import { task } from '@/store/task'
const alltask = task()



</script>
<template>
    <div>
        <div class="card">

            <div class="title">mb</div>
            <div class="list">
                <div class="item" v-for="(item, index) in alltask.list" :key="index">
                    <div class="name"> {{ item.name }}</div>
                    <div class="num" v-if="item.target">{{ item.val }}/{{ item.target }}</div>
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
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #58a6ff;
    border-bottom: 1px solid var(--el-border-color-light);
    padding-bottom: 8px;
}

.list {
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid var(--el-border-color-light);
        font-size: 14px;
        animation: fadeInUp 0.3s ease forwards;
        opacity: 0;

        &:last-child {
            border-bottom: none;
        }

        &:nth-child(1) { animation-delay: 0.1s; }
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.3s; }
        &:nth-child(4) { animation-delay: 0.4s; }
        &:nth-child(5) { animation-delay: 0.5s; }



        .name {
            color: #e6edf3;
            font-weight: 500;
        }

        .num {
            color: #58a6ff;
            font-weight: 500;
            background-color: rgba(88, 166, 255, 0.1);
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
        }
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>