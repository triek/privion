import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type UserProfile = {
  name: string
  email: string
  goal: string
  location: string
  focus: string
  experience: string
}

type Credentials = {
  email: string
  password: string
}

type SignupPayload = UserProfile & { password: string }

export const useAuthStore = defineStore('auth', () => {
  const profile = ref<UserProfile | null>(null)
  const credentials = ref<Credentials | null>(null)

  const isAuthenticated = computed(() => profile.value !== null)

  const signup = (payload: SignupPayload) => {
    const requiredFields = ['name', 'email', 'password', 'goal', 'location', 'focus', 'experience'] as const
    const missing = requiredFields.filter((field) => !payload[field])

    if (missing.length) {
      throw new Error('Please fill out all required fields before signing up.')
    }

    profile.value = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      goal: payload.goal,
      location: payload.location.trim(),
      focus: payload.focus,
      experience: payload.experience,
    }

    credentials.value = { email: payload.email.trim(), password: payload.password }
  }

  const login = (email: string, password: string) => {
    if (!credentials.value) {
      throw new Error('No account found. Please sign up first.')
    }

    if (credentials.value.email !== email.trim() || credentials.value.password !== password) {
      throw new Error('Invalid email or password.')
    }

    if (profile.value) return

    profile.value = {
      name: email.split('@')[0],
      email: credentials.value.email,
      goal: 'Staying consistent',
      location: 'Not provided yet',
      focus: 'Daily movement',
      experience: 'Beginner',
    }
  }

  const logout = () => {
    profile.value = null
  }

  return {
    profile,
    isAuthenticated,
    signup,
    login,
    logout,
  }
})
