<script setup>
import { playAttribute } from '@/store/playAttribute'
const playAttr = playAttribute()

const list1 = ['QB', 'EP', 'MP', 'SPIRIT_STONE']


</script>
<template>
    <div>
        <div class="card">
            <div class="desc">

            </div>
        </div>

    </div>



</template>
<style lang="scss" scoped>
.desc {
    width: 300px;
    padding: 12px;


}

.card {
    background-color: #1e2029;
    color: #ddd;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
}
</style>