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
          <div class="name-container">
            <h4 class="skill-name">{{ skill.name }}</h4>
          </div>
          <div class="custom-slider-container">
            <div class="custom-slider" @click="handleAutoCultivateChange(skill.skillId)"
              :class="{ active: isAutoCultivate(skill.skillId) }">
              <div class="slider-track">
                <div class="slider-thumb"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="layers-container">
          <div v-for="layer in skill.layers" :key="layer.layer" class="layer-item"
          :class="{'layer-full': layer.progress>=layer.maxProgress}"
          >
            <div class="layer-name">Layer {{ layer.layer }}</div>
            <div class="layer-info" v-if="layer.progress<layer.maxProgress&&layer.progress!==0">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${(layer.progress / layer.maxProgress) * 100}%` }"></div>
              </div>
              <span class="layer-progress" >
                {{ Math.trunc(layer.progress) }}/{{ layer.maxProgress }}
              </span>
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
  }

  .custom-slider {
    width: 50px;
    height: 26px;
    cursor: pointer;
    user-select: none;
    transition: transform 0.2s ease;

    .slider-track {
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      position: relative;
      transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      padding: 2px;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .slider-thumb {
      width: 20px;
      height: 20px;
      background: #f0f5fa;
      border-radius: 12px;
      position: absolute;
      left: 2px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      border: 2px solid rgba(230, 162, 60, 0.4);
    }


    &.active {
      .slider-track {
        background-color: rgba(230, 162, 60, 0.4);
      }

      .slider-thumb {
        left: calc(100% - 24px);
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
  flex-wrap: wrap;
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
  width: 300px;
  height: auto;
  .skill-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }
}

// 功法层数容器
.layers-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: auto;
}

// 单个层数项
.layer-item {

  gap: 4px;
  border: 1px solid rgba(230, 162, 60, 0.2);
  padding: 8px;
  border-radius: 8px;
  &.layer-full {
    background-color: rgba(230, 162, 60, 0.15);
  }
}

.layer-name {
  font-size: 14px;
  color: #c9d1d9;
  margin-bottom: 4px;
  font-weight: 500;
}

.layer-info {
  display: flex;
  align-items: center;
  .layer-progress {
    font-size: 14px;
    color: #c9d1d9;
    width: 60px;
    text-align: right;
  }
}

// 进度条容器
.progress-bar {
  width: 100%;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(230, 162, 60, 0.2);
}

// 进度条填充
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(230, 162, 60, 0.8), rgba(250, 204, 21, 0.8));
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(230, 162, 60, 0.5);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  }
}

// 进度条光泽动画
// @keyframes progress-shine {
//   0% {
//     left: -100%;
//   }

//   100% {
//     left: 100%;
//   }
// }</style>