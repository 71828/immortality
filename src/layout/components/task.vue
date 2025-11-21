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
    background-color: #1e2029;
    color: #ddd;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
}

.list {
    .item {
        display: flex;
        justify-content: space-between;
    }
}
</style>