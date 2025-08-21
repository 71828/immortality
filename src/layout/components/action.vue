<script setup >
    import {ref} from 'vue'

    const tabActive =ref('1')
    import { executionList,actionData } from '@/store/store'


    const actionList =actionData().actionList



    function toAction(item) {
        if(item.isExecution){
            executionList().list=[]
        }else{
            executionList().list.push(item)
        }
        item.isExecution=!item.isExecution
    }

</script>
<template>
    <div class="">
        
        <el-tabs v-model="tabActive"  tab-position="top" >
            <el-tab-pane  label="xl"     name="1"> 
                <div class="aciton-list">
                <template v-for="(item, index) in actionList" :key="index">
                    <el-card  @click="toAction(item)" style="width: 300px;" >
                        <div  class="item" >
                            <div>{{ item.isExecution }}</div>
                            <div class="head">
                                <div>{{item.name}} </div>
                                <div>{{item.Proficiency.level}} <span v-if="item.Proficiency.maxLevel">/{{item.Proficiency.maxLevel}} </span></div>
                            </div>

                            <div class="progress">
                                <div class="bar-wrap">
                                    <div class="bar-item" 
                                    :style="{width:Number(((item.Proficiency.val/item.Proficiency.capacity)*100).toFixed(2))+'%'}"
                                    ></div>
                            
                                </div>
                                <div class="desc">
                                    <span> {{ item.Proficiency.val===0?0:item.Proficiency.val.toFixed(2)  }}/{{ item.Proficiency.capacity }}</span>
                                </div>
                            </div>
                        </div>
                    </el-card> 
                </template>
                </div>
            </el-tab-pane>
        </el-tabs>
        
    </div>
</template>
<style lang="scss" scoped>
    .aciton-list{
        .item{
            
            .head{
                display: flex;
                justify-content: space-between;
            }
        }
    }

    .progress{
        display: flex;
        align-items: center;
        .bar-wrap{
            flex: 1;
            height: 10px;
            border-radius: 20px;
            background-color: #eee;
            position: relative;
            overflow: hidden;
            .bar-item{
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #282828;
                transition: .1s;
            }
        }
        .desc{
            width: 50px;
            text-align: right;
            margin-left: 8px;
            font-size: 15px;
        }
    }
</style>