<script setup>
import { playAttribute } from '@/store/playAttribute.js'
const playAttr = playAttribute()

const list1 = ['QB', 'EP', 'MP']


</script>
<template>
    <div>
        <div class="card">
            <div class="list">
                <div class="item">
                    <div class="cell">
                        <div class="label">修为：{{ playAttr.EXP.levelName }}</div>
                        <!-- <div class="value">{{ playAttr.EXP.val }}</div> -->
                    </div>
                </div>
                <div class="item">
                    <div class="label">寿元：{{ playAttr.EXP.levelName }}</div>
                    <!-- <div class="value">{{ playAttr.EXP.val }}</div> -->
                </div>
            </div>
        </div>
        <div class="card">
            <div class="list">
                <template v-for="(item, index) in list1" :key="index">
                    <div class="item" v-if="playAttr[item].visable">
                        <div class="cell">
                            <div class="label">{{ playAttr[item].name }}：</div>
                            <div class="value">{{ playAttr[item].val.toFixed(1) }}
                                <span v-if="playAttr[item].haveMax">/{{ playAttr[item].max.toFixed(1) }}</span>
                            </div>
                        </div>

                        <div class="line">
                            <div class="line-progress" :class="[item]"
                                :style="{ width: Number(((playAttr[item].val / playAttr[item].max) * 100).toFixed(1)) + '%' }">
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>



</template>
<style lang="scss" scoped>
.list {
    width: 250px;
    padding: 12px;
    .item {
        border-bottom: #1e2029;
        font-size: 18px;
        line-height: 27px;
        margin-bottom: 12px;
        .cell {
            display: flex;
        }
        .line {
            background: #4a4e5e;
            height: 5px;
            position: relative;
            z-index: 1;
            border-radius: 50px;
            margin-top: 8px;
            box-shadow: 0px 0px 20px 10px #101118;
            border: 2px solid #101118;
            .line-progress {
                width: 0%;
                height: 100%;
                position: absolute;
                z-index: 2;
                border-radius: 50px;
                &.QB {
                    background: #fc263f;
                }
                &.EP {
                    background: #ffb730;
                }
                &.MP {
                    background: #2c5afb;
                }
            }
        }
    }

}

.card {
    background-color: #1e2029;
    color: #ddd;
    border-radius: 8px;
    padding: 0 12px;
    margin-bottom: 12px;
}
</style>