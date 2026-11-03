import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useGeneratorStore = defineStore('generator', () => {
  const generatedCode = ref('')
  const isGenerating = ref(false)
  const error = ref(null)
  const history = ref([])

  async function generateCode(prompt, language, framework) {
    isGenerating.value = true
    error.value = null
    
    try {
      // Simulated AI code generation
      // In production, this would call an actual AI API (OpenAI, Anthropic, etc.)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResponse = generateMockCode(prompt, language, framework)
      generatedCode.value = mockResponse
      
      // Add to history
      history.value.unshift({
        id: Date.now(),
        prompt,
        language,
        framework,
        code: mockResponse,
        timestamp: new Date().toISOString()
      })
      
      return mockResponse
    } catch (err) {
      error.value = err.message || 'Failed to generate code'
      throw err
    } finally {
      isGenerating.value = false
    }
  }

  function generateMockCode(prompt, language, framework) {
    // This is a mock function - replace with actual AI API call
    const prompts = {
      'component': `// ${language} ${framework} Component\n// Generated for: ${prompt}\n\nexport default {\n  name: 'GeneratedComponent',\n  data() {\n    return {\n      message: 'Hello from AI Builder!'\n    }\n  },\n  methods: {\n    handleClick() {\n      console.log('Button clicked')\n    }\n  }\n}`,
      'api': `// ${language} API Service\n// Generated for: ${prompt}\n\nimport axios from 'axios'\n\nconst api = axios.create({\n  baseURL: process.env.VUE_APP_API_URL\n})\n\nexport const ApiService = {\n  async getData() {\n    const response = await api.get('/data')\n    return response.data\n  },\n  \n  async postData(data) {\n    const response = await api.post('/data', data)\n    return response.data\n  }\n}`,
      'default': `// ${language} Code\n// Generated for: ${prompt}\n\n// Your AI-generated code will appear here\n// This is a placeholder implementation\n\nfunction main() {\n  console.log('AI-generated code initialized')\n  return true\n}\n\nexport default main`
    }
    
    const promptLower = prompt.toLowerCase()
    if (promptLower.includes('component')) return prompts.component
    if (promptLower.includes('api') || promptLower.includes('service')) return prompts.api
    return prompts.default
  }

  function clearCode() {
    generatedCode.value = ''
    error.value = null
  }

  function clearHistory() {
    history.value = []
  }

  return {
    generatedCode,
    isGenerating,
    error,
    history,
    generateCode,
    clearCode,
    clearHistory
  }
})
