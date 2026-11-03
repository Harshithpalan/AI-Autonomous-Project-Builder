<script setup>
import { useAuthStore } from '../stores/auth'
import { useGeneratorStore } from '../stores/generator'
import { computed } from 'vue'

const authStore = useAuthStore()
const generatorStore = useGeneratorStore()

const recentGenerations = computed(() => generatorStore.history.slice(0, 5))
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Welcome, {{ authStore.user?.name || 'User' }}!</h1>
      <p class="subtitle">Start building your next project with AI</p>
    </div>
    
    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📝</div>
          <div class="stat-info">
            <h3>{{ generatorStore.history.length }}</h3>
            <p>Total Generations</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-info">
            <h3>AI Powered</h3>
            <p>Code Generation</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-info">
            <h3>Fast</h3>
            <p>Instant Results</p>
          </div>
        </div>
      </div>
      
      <div class="action-section">
        <h2>Quick Actions</h2>
        <div class="action-cards">
          <router-link to="/generator" class="action-card">
            <div class="action-icon">🤖</div>
            <h3>Generate Code</h3>
            <p>Create new code with AI assistance</p>
          </router-link>
          
          <div class="action-card">
            <div class="action-icon">📚</div>
            <h3>View History</h3>
            <p>Browse your past generations</p>
          </div>
          
          <div class="action-card">
            <div class="action-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Configure your preferences</p>
          </div>
        </div>
      </div>
      
      <div v-if="recentGenerations.length > 0" class="recent-section">
        <h2>Recent Generations</h2>
        <div class="history-list">
          <div v-for="item in recentGenerations" :key="item.id" class="history-item">
            <div class="history-info">
              <h4>{{ item.prompt.substring(0, 50) }}...</h4>
              <p>{{ item.language }} • {{ item.framework }}</p>
            </div>
            <span class="history-date">{{ new Date(item.timestamp).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info h3 {
  font-size: 2rem;
  color: #667eea;
  margin-bottom: 0.25rem;
}

.stat-info p {
  color: #666;
  font-size: 0.9rem;
}

.action-section h2,
.recent-section h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.action-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.action-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.action-card p {
  color: #666;
  font-size: 0.9rem;
}

.history-list {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.history-item {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-item:last-child {
  border-bottom: none;
}

.history-info h4 {
  color: #333;
  margin-bottom: 0.25rem;
}

.history-info p {
  color: #666;
  font-size: 0.875rem;
}

.history-date {
  color: #999;
  font-size: 0.875rem;
}
</style>
