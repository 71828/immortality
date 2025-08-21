<script setup >
    import { playAttribute } from '@/store/store'
    const playAttr =playAttribute()

    const list=['HP','MP','PHY','SE','VE','SS','CP','SP']

    
</script>
<template>
    <el-card shadow="never" :body-style="{ padding: '20px' }" style="margin-bottom: 24px;">
      <div class="warp">
            <div class="list">
                    <div class="item"  >
                        <div class="label">修为：</div>
                        <div class="value">{{ playAttr.EXP.val }}</div>
                    </div>
            </div>
        </div>
    </el-card>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <div class="warp">
            <div class="list">
                <template v-for="(item, index) in list" :key="index">
                    <div class="item"  >
                        <div class="label">{{ playAttr[item].name }}：</div>
                        <div class="value">{{ playAttr[item].val }}</div>
                    </div>
                </template>
            </div>
        </div>
    </el-card>
    

   

</template>
<style lang="scss" scoped>
    .list{
        width: 300px;
        .item{
            display: flex;
            
            padding: 2px 8px;
            margin-bottom: 12px;
            border-radius: 4px;
        }
    }
</style>