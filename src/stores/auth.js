import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  function login(email, password) {
    // Simulated login - in production, this would call an API
    const mockUser = {
      id: 1,
      email: email,
      name: email.split('@')[0]
    }
    const mockToken = 'mock-jwt-token-' + Date.now()
    
    user.value = mockUser
    token.value = mockToken
    localStorage.setItem('token', mockToken)
    localStorage.setItem('user', JSON.stringify(mockUser))
    
    return Promise.resolve({ user: mockUser, token: mockToken })
  }

  function register(email, password, name) {
    // Simulated registration - in production, this would call an API
    const mockUser = {
      id: Date.now(),
      email: email,
      name: name
    }
    const mockToken = 'mock-jwt-token-' + Date.now()
    
    user.value = mockUser
    token.value = mockToken
    localStorage.setItem('token', mockToken)
    localStorage.setItem('user', JSON.stringify(mockUser))
    
    return Promise.resolve({ user: mockUser, token: mockToken })
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function initializeAuth() {
    const savedUser = localStorage.getItem('user')
    if (savedUser && token.value) {
      user.value = JSON.parse(savedUser)
    }
  }

  // Initialize auth on store creation
  initializeAuth()

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout
  }
})
