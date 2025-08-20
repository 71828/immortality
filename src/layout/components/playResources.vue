<script setup >
    import { playAttribute } from '@/store/store'
    const playAttr =playAttribute()
</script>
<template>
    <div class="card">
        <div class="warp">
            <div class="list">
                <div class="item">
                    {{ playAttr.cultivation }}
                </div>
            </div>
        </div>
    </div>

</template>
<style lang="scss" scoped>
    .card{
        border: 1px solid #999;
        border-radius: 12px;
        width: 200px;
        padding: 12px;
    }
</style>