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