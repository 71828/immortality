<script setup >
    import {ref} from 'vue'

    const active =ref('1')
</script>
<template>
    <div>
        <el-tabs v-model="active" type="card" tab-position="top" @tab-click="">
            <el-tab-pane  label="修炼"     name="1"> </el-tab-pane>
        </el-tabs>
        
    </div>
</template>
<style lang="scss" scoped>
    
</style>