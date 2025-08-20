<script setup >import {computed, ref} from 'vue'

import { useMainStore } from '../../store/store'


const dateFormat =computed(()=>{
    //道年格式化
    const Allday =parseInt(useMainStore().mainDate/50*8)
    const  year = parseInt(Allday/365)
    const  day =parseInt(Allday%365 )
    return year+'年'+day +'日'
})


</script>
<template>
    <div class="head">
       道历 {{dateFormat}}
    </div>
</template>
<style lang="scss" scoped>
    .head{
        border-bottom: 1px solid #eee;
        text-align: center;
    }
</style>