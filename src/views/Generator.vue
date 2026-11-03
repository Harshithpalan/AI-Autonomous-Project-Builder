<script setup>
import { ref } from 'vue'
import { useGeneratorStore } from '../stores/generator'

const generatorStore = useGeneratorStore()

const prompt = ref('')
const language = ref('JavaScript')
const framework = ref('Vue.js')

const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust']
const frameworks = ['Vue.js', 'React', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'None']

const handleGenerate = async () => {
  if (!prompt.value.trim()) return
  await generatorStore.generateCode(prompt.value, language.value, framework.value)
}

const handleCopy = () => {
  navigator.clipboard.writeText(generatorStore.generatedCode)
}

const handleClear = () => {
  generatorStore.clearCode()
  prompt.value = ''
}
</script>

<template>
  <div class="generator">
    <div class="generator-container">
      <div class="input-section">
        <h1>AI Code Generator</h1>
        <p class="subtitle">Describe what you want to build, and AI will generate the code</p>
        
        <div class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label>Language</label>
              <select v-model="language">
                <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Framework</label>
              <select v-model="framework">
                <option v-for="fw in frameworks" :key="fw" :value="fw">{{ fw }}</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label>Prompt</label>
            <textarea
              v-model="prompt"
              placeholder="Describe the code you want to generate... (e.g., 'Create a Vue component with a counter button')"
              rows="4"
            ></textarea>
          </div>
          
          <div class="button-group">
            <button
              @click="handleGenerate"
              :disabled="generatorStore.isGenerating || !prompt.trim()"
              class="btn-primary"
            >
              {{ generatorStore.isGenerating ? 'Generating...' : 'Generate Code' }}
            </button>
            <button @click="handleClear" class="btn-secondary">Clear</button>
          </div>
        </div>
      </div>
      
      <div class="output-section">
        <div class="output-header">
          <h2>Generated Code</h2>
          <button
            v-if="generatorStore.generatedCode"
            @click="handleCopy"
            class="btn-copy"
          >
            Copy
          </button>
        </div>
        
        <div class="code-display">
          <div v-if="generatorStore.isGenerating" class="loading">
            <div class="spinner"></div>
            <p>AI is generating your code...</p>
          </div>
          
          <div v-else-if="generatorStore.error" class="error-message">
            <p>{{ generatorStore.error }}</p>
          </div>
          
          <pre v-else-if="generatorStore.generatedCode"><code>{{ generatorStore.generatedCode }}</code></pre>
          
          <div v-else class="placeholder">
            <p>Your generated code will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.generator {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.generator-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: calc(100vh - 200px);
}

.input-section {
  display: flex;
  flex-direction: column;
}

.input-section h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}

.form-section {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #333;
}

select,
textarea {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
}

select:focus,
textarea:focus {
  outline: none;
  border-color: #667eea;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.btn-primary {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.output-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.output-header h2 {
  font-size: 1.25rem;
  color: #333;
}

.btn-copy {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-copy:hover {
  background: #5568d3;
}

.code-display {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
  background: #f8f9fa;
}

.code-display pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #333;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e0e0e0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #e74c3c;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
}

@media (max-width: 768px) {
  .generator-container {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
