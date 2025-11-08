<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex w-full items-center justify-between sm:w-auto">
          <RouterLink to="/" class="flex items-center gap-3 text-left">
            <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl font-black text-emerald-300 shadow-inner shadow-emerald-500/40">
              P
            </span>
            <div>
              <p class="text-lg font-semibold tracking-wide text-emerald-300">Privion</p>
              <p class="text-sm text-slate-400">Adaptive fitness and fuel.</p>
            </div>
          </RouterLink>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:hidden"
            @click="isMenuOpen = !isMenuOpen"
            :aria-expanded="isMenuOpen"
            aria-controls="primary-navigation"
          >
            <span class="sr-only">Toggle navigation</span>
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav
          id="primary-navigation"
          class="flex-col gap-2 text-sm font-medium text-slate-300 sm:flex sm:flex-row sm:flex-wrap sm:items-center"
          :class="isMenuOpen ? 'flex' : 'hidden sm:flex'"
        >
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-full px-4 py-2 transition"
            :class="route.path === item.to ? 'bg-emerald-500/20 text-emerald-200 shadow-inner shadow-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 pb-12 pt-32">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

type NavItem = {
  label: string
  to: string
}

const route = useRoute()
const isMenuOpen = ref(false)

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Workout', to: '/workout' },
  { label: 'Nutrition', to: '/nutrition' },
  { label: 'Login', to: '/login' },
  { label: 'Signup', to: '/signup' },
]

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
  }
)
</script>

<style scoped>
</style>
