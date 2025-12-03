<script setup>
import { log } from '@/store/log'
const logs = log()



</script>
<template>
    <div>
        <div class="card">
            <div class="list">
                <div 
                    class="item" 
                    :class="item.type" 
                    v-for="(item, index) in logs.displayList" 
                    :key="item.id"
                >
                    <div class="header">
                        <div class="date">{{ item.date }}</div>
                        <div class="type-badge" :class="item.type">{{ item.type }}</div>
                    </div>
                    <div class="title">{{ item.title }}</div>
                    <div class="description" v-if="item.description">{{ item.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
    color: #e6edf3;
    border-radius: 12px;
    padding: 16px;
    margin: 12px 0 0 0;
    border: 1px solid var(--el-border-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #58a6ff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.list {
    flex-grow: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(88, 166, 255, 0.5) transparent;
    padding-right: 4px;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(88, 166, 255, 0.5);
        border-radius: 2px;
        transition: background 0.2s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: rgba(88, 166, 255, 0.8);
    }

    &::-webkit-scrollbar-corner {
        background: transparent;
    }

    .item {
        display: flex;
        flex-direction: column;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        font-size: 13px;
        animation: fadeInUp 0.2s ease-out forwards;
        opacity: 0;
        gap: 6px;

        &:last-child {
            border-bottom: none;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
        }

        .date {
            color: #6e7681;
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .type-badge {
            font-size: 10px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            
            &.success {
                background-color: rgba(52, 211, 153, 0.1);
                color: #34d399;
                border: 1px solid rgba(52, 211, 153, 0.3);
            }
            
            &.info {
                background-color: rgba(88, 166, 255, 0.1);
                color: #58a6ff;
                border: 1px solid rgba(88, 166, 255, 0.3);
            }
            
            &.notice {
                background-color: rgba(255, 183, 48, 0.1);
                color: #ffb730;
                border: 1px solid rgba(255, 183, 48, 0.3);
            }
        }

        .title {
            color: #e6edf3;
            font-size: 13px;
            font-weight: 500;
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
            text-transform: none;
            letter-spacing: 0;
            line-height: 1.4;
        }
        
        .description {
            color: #8b949e;
            font-size: 12px;
            line-height: 1.4;
            margin-top: 2px;
        }
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(3px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>