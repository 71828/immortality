<script setup>
import { skillStore } from '@/store/skill'
import { playAttribute } from '@/store/playAttribute'
import { ref, onMounted, watch } from 'vue'

// 获取功法store
const skillStoreInstance = skillStore()
// 获取属性store
const attributeStore = playAttribute()

// 是否在自动修炼列表中
const isAutoCultivate = (skillId) => {
  return skillStoreInstance.autoCultivateSkills.findIndex(item => item.skillId === skillId) !== -1
}

// 处理自动修炼按钮点击事件
function handleAutoCultivateChange(skillId) {
  const currentState = isAutoCultivate(skillId)
  if (!currentState) {
    skillStoreInstance.addAutoCultivateSkill(skillId)
  } else {
    skillStoreInstance.removeAutoCultivateSkill(skillId)
  }
}


</script>

<template>
  <div class="skill-container">
    <div class="skill-header-section">
      <div class="skill-points-display">
        <span class="label">Current Skill Points:</span>
        <span class="value">{{ Math.floor(attributeStore.SPT.val) }}</span>
      </div>
      <div class="cultivation-speed-display">
        <span class="label">Cultivation Speed:</span>
        <span class="value">{{ skillStoreInstance.cultivationSpeed }}x</span>
      </div>
    </div>

    <!-- Skill List -->
    <div class="skill-list">
      <div v-for="skill in skillStoreInstance.skills" :key="skill.id" class="skill-card">
        <div class="skill-header">
          <div class="custom-slider-container">
            <!-- 自定义滑动开关 -->
            <div class="custom-slider" @click="handleAutoCultivateChange(skill.skillId)"
              :class="{ active: isAutoCultivate(skill.skillId) }">
              <div class="slider-track">
                <div class="slider-thumb"></div>
              </div>
            </div>

          </div>
          <div class="skill-info">
            <div class="name-container">
              <h4 class="skill-name">{{ skill.name }}</h4>
            </div>
          </div>

        </div>

      </div>
    </div>


  </div>
</template>

<style lang="scss" scoped>
.skill-container {
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  /* 自定义滑动开关样式 */
  .custom-slider-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-right: 12px;
  }

  .custom-slider {
    width: 80px;
    height: 30px;
    cursor: pointer;
    user-select: none;
    transition: transform 0.2s ease;

    .slider-track {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 15px;
      position: relative;
      transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      padding: 2px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .slider-thumb {
      width: 48px;
      height: 24px;
      background:   linear-gradient(135deg, #161b22 0%, #0d1117 100%) ;
      border-radius: 12px;
      position: absolute;
      left: 2px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

     
    }


    &.active {
    

      .slider-thumb {
        left: calc(100% - 50px);

      }
    }
  }



  .skill-header-section {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .skill-points-display {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(230, 162, 60, 0.15);
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid rgba(230, 162, 60, 0.4);
    width: fit-content;

    .label {
      font-size: 14px;
      color: #e6a23c;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: #e6a23c;
    }
  }
  .cultivation-speed-display {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(230, 162, 60, 0.15);
    padding: 6px 12px;
    border-radius: 20px;
    border: 1px solid rgba(230, 162, 60, 0.4);
    width: fit-content;

    .label {
      font-size: 14px;
      color: #e6a23c;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: #e6a23c;
    }
  }



}



// 功法列表
.skill-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

// 功法卡片
.skill-card {
  background: linear-gradient(135deg, #161b22 0%, #0d1117 100%);
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: default;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

// 未开始修炼的功法样式
.skill-not-started {
  filter: grayscale(0.7);
  opacity: 0.7;
  border-color: rgba(255, 255, 255, 0.1);
}

// 正在修炼的功法样式
.skill-cultivating {
  /* 移除特殊样式，只保留默认样式 */
}

// 修炼圆满的功法样式
.skill-perfected {
  /* 移除特殊样式，只保留默认样式 */
}

// 功法卡片内部样式
.skill-card {
  .skill-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 12px;

    .skill-info {
      flex: 1;
      min-width: 0;

      .name-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
        flex-wrap: wrap;
      }

      .skill-name {
        font-size: 18px;
        font-weight: 600;
        color: #f0f5fa;
        margin: 0;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .custom-collapse-btn {
        color: #8b949e;
        transition: all 0.3s ease;
        border-radius: 4px;
        padding: 2px 6px;
        min-width: auto;
        height: auto;

        &:hover {
          color: #58a6ff;
          background-color: rgba(88, 166, 255, 0.1);
        }

        .el-icon {
          font-size: 14px;
        }
      }

      .custom-cultivate-btn {
        min-width: auto;
        height: auto;
        padding: 4px 12px;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.3s ease;

        &.capsule-btn {
          border-radius: 20px;
          background-color: rgba(212, 175, 55, 0.8);
          /* 与功法层级一致的淡金色 */
          color: #fff;
          border: none;
          font-weight: 500;

          &:hover {
            background-color: #d4af37;
            /* 与功法层级一致的深金色 */
            box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
          }

          &.active {
            background-color: #d4af37;
            /* 与功法层级一致的深金色 */
            box-shadow: 0 2px 8px rgba(212, 175, 55, 0.5);
          }
        }
      }

      .skill-description {
        font-size: 13px;
        color: #a0a8b3;
        margin: 0;
        line-height: 1.5;
      }
    }

    .skill-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;

      .skill-level {
        display: flex;
        align-items: center;
        gap: 12px;

        .level-value {
          font-size: 16px;
          font-weight: 600;
          color: #67c23a;
          white-space: nowrap;
        }

        .skill-auto-cultivate-btn {
          /* 继承自定义按钮样式 */
        }
      }

      .action-buttons {
        display: flex;
        gap: 8px;
      }
    }
  }
}

// 折叠动画
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
  padding: 0;
  margin: 0;
  border: none;
}

// 层级列表
.layers-list {
  display: flex;
  flex-direction: row;
  gap: 0;
  overflow-x: auto;
  padding: 16px;
  scrollbar-width: thin;
  scrollbar-color: rgba(88, 166, 255, 0.6) transparent;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: 8px;
  max-height: 200px;
  opacity: 1;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(88, 166, 255, 0.6);
    border-radius: 3px;
  }
}

// 层级连接线段
.layer-connection {
  display: flex;
  align-items: center;
  width: 50px;
  position: relative;
  margin: 0 8px;

  &::after {
    content: '';
    flex: 1;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 1px;
    transition: background-color 0.3s ease;
  }

  &.connected::after {
    background-color: rgba(212, 175, 55, 0.8);
    /* 淡金色 */
  }

  &.current::after {
    background-color: rgba(255, 255, 255, 0.15);
    /* 蓝色 */
  }
}

// 层级项容器，包含层级项和连接线
.layer-item-wrapper {
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-child) {
    margin-right: 0;
  }
}

// 层级项
.layer-item {
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  padding: 16px;
  transition: all 0.3s ease;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  &.layer-completed {
    border-color: rgba(212, 175, 55, 0.6);
    /* 淡金色，与进度条一致 */
    border-width: 2px;
    background-color: rgba(212, 175, 55, 0.08);
    /* 淡金色背景 */
  }

  &.layer-current {
    border-width: 2px;
    /* 移除固定蓝色，改为根据进度的动态样式 */
  }

  &.layer-locked {
    border-width: 2px;
    opacity: 0.5;
    background-color: rgba(255, 255, 255, 0.03);
  }

  .layer-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 0;
    align-items: center;
    text-align: center;
    width: 100%;

    .layer-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .layer-name {
        font-size: 12px;
        font-weight: 600;
        color: #f0f5fa;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .layer-number {
          color: #a0a8b3;
          margin-right: 0;
          margin-bottom: 2px;
          font-size: 10px;
        }
      }

      .layer-description {
        display: none;
      }
    }

    .layer-status {
      display: none;
    }
  }

  // 层级进度条
  .layer-progress-section {
    margin-bottom: 0;
    padding-bottom: 0;
    width: 100%;

    .progress-info {
      display: flex;
      justify-content: center;
      margin-bottom: 2px;
      font-size: 10px;

      .progress-text {
        color: #a0a8b3;
        white-space: nowrap;
      }
    }

    .progress-bar-container {
      width: 100%;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 1.5px;
      overflow: hidden;

      .progress-bar {
        height: 100%;
        border-radius: 1.5px;
        transition: width 0.3s ease;
      }
    }
  }
}

// 空状态
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #a0a8b3;

  p {
    margin: 0 0 8px 0;
    font-size: 16px;
  }

  .empty-hint {
    font-size: 14px;
    color: #7e8690;
  }
}
</style>