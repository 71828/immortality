<script setup>
import { ref } from 'vue'
import { executionList, actionData } from '@/store/playAction'
const actionList = actionData().actionList
function toAction(item) {
    if (item.isExecution) {
        executionList().list = []
    } else {
        executionList().list.push(item)
    }
    item.isExecution = !item.isExecution
}

</script>
<template> 
    <div class="">

        <div class="aciton-list">
            <template v-for="(item, index) in actionList" :key="index">
                <div class="item" :class="{isExecution:item.isExecution,expand:item.expand}"  @click="toAction(item)">
               
                    <div class="head">
                        <div class="name">{{ item.name }} </div>
                        <div>{{ item.Proficiency.level }} 
                            <span v-if="item.Proficiency.maxLevel">/{{ item.Proficiency.maxLevel }} </span>
                        </div>
                    </div>
                    <div class="content" >
                        <div>
                           sld: <span> {{ item.Proficiency.val === 0 ? 0 : item.Proficiency.val.toFixed(1) }}/{{item.Proficiency.capacity }}</span>
                        </div>
                        <div class="perScond" v-if="item.isExecution">+{{ item.Proficiency.perScond  }}</div>
                    </div>
                    <div class="progress">
                        <div class="bar-wrap">
                            <div class="bar-item"
                                :style="{ width: Number(((item.Proficiency.val / item.Proficiency.capacity) * 100).toFixed(1)) + '%' }">
                            </div>
                        </div>

                    </div>
                    <div class="foot">
                        <div>
                             <el-icon class="icon" @click.stop="item.expand=!item.expand"> <MoreFilled /></el-icon>
                        </div>
                        <el-icon class="icon" v-if="item.isExecution" > <VideoPause /></el-icon>
                        <el-icon class="icon" v-else ><VideoPlay /></el-icon>
                    </div>
                    <div class="desc" v-show="item.expand">
                        <div class="cell">
                            <div class="label">消耗   <span class="mark1">精力 </span> 每秒 </div>
                            <div class="value"></div>
                        </div>
                        <div class="dvi"></div>
                        <div class="cell">
                            <div class="label">完成此动作提升   <span class="mark">气血 </span> +1 </div>
                            <div class="value"></div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.aciton-list {
    
    min-height: 500px;
    overflow: visible;
    .item {
        background-color: #171b23;
        width: 200px;
        color: #ccc;
        padding: 4px 12px;
        border-radius: 16px;
        box-shadow: 0px 0px 20px 10px #171b2304;
        cursor: pointer;
        border: 2px solid #101118;
        transition: .3s;
        position: relative;
        .desc{
            position: absolute;
            left: -2px;
            right: -2px;
            height: 0;
            top: 120px;
            border-radius: 16px;
            background: #171b23;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            transition: .3s;
            font-size: 14px;
            padding: 12px;
            line-height: 21px;
               border-left: 2px solid #171b23;
                    border-right: 2px solid #171b23;
                    border-bottom: 2px solid #171b23;
            .dvi{
                border-bottom: 1px solid #23252f;
            }
            .mark{
                color: #fc263f;
            }
            .mark1{
                color: #ffb730;
            }
        }
        &.isExecution{
            border: 2px solid #7d96f148;
           
                .desc{
                    border-left: 2px solid #7d96f148;
                    border-right: 2px solid #7d96f148;
                    border-bottom: 2px solid #7d96f148;
                }
            
        }
        &:hover{
            border: 2px solid #7a96fa45;
               .desc{
                    border-left: 2px solid #7d96f148;
                    border-right: 2px solid #7d96f148;
                    border-bottom: 2px solid #7d96f148;
                }
        }
        &.expand{
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;
            .desc{
                border-top-left-radius: 0px;
                border-top-right-radius: 0px;
                border-bottom-left-radius: 16px;
                border-bottom-right-radius: 16px;
                height: 100px;
            }
        }
        .head {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 16px;
            .name{
                font-size: 20px;
            }
        }
        .content{
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
            .perScond{
                color: #5378f9;
            }
        }
        .foot{
            padding-top: 8px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            
            .icon{
                font-size: 26px;
                padding: 2px;
                &:hover{
                    color: #fff;
                    font-weight: 700;
                    background-color: #101118;
                    
                    border-radius: 12px;
                }
            }
        }
    }
}

.progress {
    display: flex;
    align-items: center;

    .bar-wrap {
        flex: 1;
        height: 6px;
        border-radius: 20px;
        background-color: #363636;
        position: relative;
        overflow: hidden;

        .bar-item {
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: linear-gradient(90deg, #1d1da3 0%, #4242cf 60%, #5a81ff 100%);
        }
    }

    // .desc {
    //     width: 50px;
    //     text-align: right;
    //     margin-left: 8px;
    //     font-size: 15px;
    // }
}
</style>