<script setup>
import { ref, watch } from 'vue'

// Props 定义 - 简化版本
const props = defineProps({
  // 是否显示弹窗
  modelValue: {
    type: Boolean,
    default: false
  },
  // 弹窗内容
  content: {
    type: String,
    default: ''
  }
})

// Emits 定义
const emit = defineEmits(['update:modelValue', 'close'])

// 弹窗可见性状态
const isVisible = ref(props.modelValue)

// 监听外部modelValue变化
watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
})

// 关闭弹窗
const closeDialog = () => {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('close')
}

// 点击遮罩层关闭
const handleModalClick = () => {
  closeDialog()
}

// 点击内容区域不关闭
const handleContentClick = (e) => {
  e.stopPropagation()
}
</script>

<template>
  <!-- 弹窗遮罩层 -->
  <transition name="dialog-fade">
    <div v-if="isVisible" class="game-dialog-overlay" @click="handleModalClick">
      <!-- 弹窗内容 -->
      <div class="game-dialog" @click="handleContentClick">
        <!-- 弹窗主体 - 简化设计，移除标题和关闭按钮 -->
        <div class="game-dialog-body">
          <div class="game-dialog-content" v-html="content"></div>
        </div>
        
        <!-- 弹窗底部 -->
        <div class="game-dialog-footer">
          <button class="game-dialog-button" @click="closeDialog">
            知道了
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
// 弹窗动画
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

// 遮罩层样式
.game-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

// 弹窗容器样式 - 极简设计
.game-dialog {
  background: #1a1d23;
  border: 1px solid #30363d;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
}

// 弹窗主体
.game-dialog-body {
  padding: 24px;
}

// 弹窗内容
.game-dialog-content {
  font-size: 14px;
  line-height: 1.5;
  color: #e6edf3;
  text-align: center;
}

// 弹窗底部
.game-dialog-footer {
  display: flex;
  justify-content: center;
  padding: 0 24px 24px;
}

// 弹窗按钮 - 简化设计
.game-dialog-button {
  background: #238636;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  max-width: 160px;
  
  &:hover {
    background: #2ea043;
  }
  
  &:active {
    background: #238636;
  }
}
</style>