<script setup>
// Cave Component
import { ref } from 'vue'

// Sample cave data
const caveData = ref({
  name: 'Nameless Cave',
  location: 'Azure Cloud Mountains',
  level: 1,
  cultivationSpeed: 1.0,
  resources: {
    qi: 1000,
    spiritStone: 50
  },
  facilities: [
    {
      id: 1,
      name: 'Cultivation Room',
      level: 1,
      description: 'Provides cultivation space, increases cultivation speed',
      upgradeCost: { spiritStone: 100 }
    },
    {
      id: 2,
      name: 'Alchemy Room',
      level: 1,
      description: 'Used for refining pills',
      upgradeCost: { spiritStone: 150 }
    },
    {
      id: 3,
      name: 'Artifact Refining Room',
      level: 1,
      description: 'Used for refining magical artifacts',
      upgradeCost: { spiritStone: 200 }
    }
  ]
})
</script>

<template>
  <div class="cave-container">
    <!-- Basic Cave Information -->
    <div class="cave-info-section">
      <h3>{{ caveData.name }}</h3>
      <div class="info-row">
        <div class="info-item">
          <span class="label">Location:</span>
          <span class="value">{{ caveData.location }}</span>
        </div>
        <div class="info-item">
          <span class="label">Level:</span>
          <span class="value">{{ caveData.level }}</span>
        </div>
        <div class="info-item">
          <span class="label">Cultivation Speed:</span>
          <span class="value">{{ caveData.cultivationSpeed }}x</span>
        </div>
      </div>
      <div class="resources-row">
        <div class="resource-item">
          <span class="label">Qi:</span>
          <span class="value">{{ caveData.resources.qi }}</span>
        </div>
        <div class="resource-item">
          <span class="label">Spirit Stones:</span>
          <span class="value">{{ caveData.resources.spiritStone }}</span>
        </div>
      </div>
    </div>

    <!-- Cave Facilities List -->
    <div class="facilities-section">
      <h4>Cave Facilities</h4>
      <div class="facilities-grid">
        <div 
          v-for="facility in caveData.facilities" 
          :key="facility.id" 
          class="facility-card"
        >
          <div class="facility-header">
            <h5>{{ facility.name }}</h5>
            <div class="facility-level">Level {{ facility.level }}</div>
          </div>
          <div class="facility-description">{{ facility.description }}</div>
          <div class="facility-upgrade">
            <div class="upgrade-cost">
              <span>Upgrade Cost:</span>
              <span>{{ facility.upgradeCost.spiritStone }} Spirit Stones</span>
            </div>
            <button class="upgrade-btn">Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cave-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  color: #e6edf3;
}

.cave-info-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.cave-info-section h3 {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #58a6ff;
}

.info-row {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-item .label {
  color: #8b949e;
  font-size: 14px;
}

.info-item .value {
  color: #e6edf3;
  font-size: 14px;
  font-weight: 600;
}

.resources-row {
  display: flex;
  gap: 20px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.resource-item .label {
  color: #8b949e;
  font-size: 14px;
}

.resource-item .value {
  color: #34d399;
  font-size: 14px;
  font-weight: 600;
}

.facilities-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
}

.facilities-section h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #e6edf3;
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.facility-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 12px;
  transition: all 0.2s ease;
}

.facility-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(88, 166, 255, 0.3);
}

.facility-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.facility-header h5 {
  margin: 0;
  font-size: 14px;
  color: #58a6ff;
}

.facility-level {
  font-size: 12px;
  color: rgba(255, 215, 0, 0.8);
  font-weight: 600;
}

.facility-description {
  font-size: 12px;
  color: #8b949e;
  margin-bottom: 12px;
  line-height: 1.4;
}

.facility-upgrade {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.upgrade-cost {
  font-size: 12px;
  color: #8b949e;
  display: flex;
  justify-content: space-between;
}

.upgrade-btn {
  background: rgba(88, 166, 255, 0.2);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: 4px;
  color: rgba(88, 166, 255, 0.8);
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upgrade-btn:hover {
  background: rgba(88, 166, 255, 0.3);
  border-color: rgba(88, 166, 255, 0.5);
  color: rgba(88, 166, 255, 1);
}
</style>