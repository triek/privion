<template>
  <div class="mx-auto max-w-xl space-y-10">
    <header class="space-y-3 text-center">
      <h1 class="text-3xl font-bold text-white">Create your account</h1>
      <p class="text-sm text-slate-400">Sync workouts, meals, and recovery into one adaptive hub.</p>
    </header>

    <!-- Signup form -->
    <form
      class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-emerald-500/10"
      @submit.prevent="handleSubmit"
    >
      <div v-if="error" class="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
        {{ error }}
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <!-- Name -->
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium text-slate-200">Full name *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Jane Doe"
            required
            class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          />
        </div>
        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-slate-200">Email *</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          />
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <!-- Password -->
          <label for="password" class="text-sm font-medium text-slate-200">Password *</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Create a strong password"
            required
            class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          />
        </div>
        <div class="space-y-2">
          <!-- Primary goal -->
          <label for="goal" class="text-sm font-medium text-slate-200">Primary goal *</label>
          <select
            id="goal"
            v-model="form.goal"
            required
            class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          >
            <option class="bg-slate-900" value="Build strength">Build strength</option>
            <option class="bg-slate-900" value="Improve endurance">Improve endurance</option>
            <option class="bg-slate-900" value="Dial in nutrition">Dial in nutrition</option>
          </select>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <!-- Location -->
          <label for="location" class="text-sm font-medium text-slate-200">Location *</label>
          <input
            id="location"
            v-model="form.location"
            type="text"
            placeholder="City, Country"
            required
            class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          />
        </div>
        <div class="space-y-2">
          <!-- Training focus -->
          <label for="focus" class="text-sm font-medium text-slate-200">Training focus *</label>
          <input
            id="focus"
            v-model="form.focus"
            type="text"
            placeholder="Hypertrophy, cardio, mobility..."
            required
            class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          />
        </div>
      </div>

      <div class="space-y-2">
        <!-- Experience level -->
        <label for="experience" class="text-sm font-medium text-slate-200">Experience level *</label>
        <select
          id="experience"
          v-model="form.experience"
          required
          class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        >
          <option class="bg-slate-900" value="Beginner">Beginner</option>
          <option class="bg-slate-900" value="Intermediate">Intermediate</option>
          <option class="bg-slate-900" value="Advanced">Advanced</option>
        </select>
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        class="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/40 transition hover:-translate-y-0.5 hover:bg-emerald-300"
      >
        Create account
      </button>
    </form>

    <!-- Already have an account -->
    <p class="text-center text-sm text-slate-400">
      Already have an account?
      <RouterLink to="/login" class="font-semibold text-emerald-300 hover:text-emerald-200">Log in here</RouterLink>.
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  goal: 'Build strength',
  location: '',
  focus: '',
  experience: 'Beginner',
})

const error = ref('')

const handleSubmit = () => {
  try {
    error.value = ''
    authStore.signup(form)
    router.push('/profile')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unable to sign up right now.'
  }
}
</script>
