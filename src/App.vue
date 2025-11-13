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
              <p class="text-sm text-slate-400">Adaptive Fitness</p>
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

    <div ref="bookMenuRef" class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
      <div
        v-if="isBookMenuOpen"
        class="w-56 rounded-2xl border border-white/10 bg-slate-900/95 p-2 text-sm text-slate-200 shadow-[0_20px_45px_-15px_rgba(16,185,129,0.35)]"
        role="menu"
      >
        <p class="px-3 pb-1 text-xs uppercase tracking-wide text-slate-500">Browse</p>
        <RouterLink
          v-for="option in bookMenuItems"
          :key="option.to"
          :to="option.to"
          class="flex items-center justify-between gap-3 rounded-xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
          role="menuitem"
          @click="handleBookMenuSelection"
        >
          <span>{{ option.label }}</span>
          <svg
            v-if="option.icon === 'recipe'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 5.75h8.5a2 2 0 0 1 2 2v11.5" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 5.75V18a2 2 0 0 0 2 2h10.25" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 9h4" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h2.5" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 3.75h9a2.25 2.25 0 0 1 2.25 2.25v12a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75Z"
            />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 6v2.25A2.25 2.25 0 0 1 12.75 10.5H6" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5h3" />
          </svg>
        </RouterLink>
      </div>

      <button
        type="button"
        class="inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/20 text-emerald-200 shadow-xl shadow-emerald-500/40 transition hover:bg-emerald-400/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        :aria-expanded="isBookMenuOpen"
        aria-haspopup="menu"
        aria-label="Open collections"
        @click.stop="toggleBookMenu"
        @keydown.escape.prevent="isBookMenuOpen = false"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.75 5.75h9.5a2 2 0 0 1 2 2v10.5a.75.75 0 0 1-1.167.624L12 16.25l-3.083 2.624A.75.75 0 0 1 7.75 18.25V7.75a2 2 0 0 0-2-2Z"
          />
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.75 7.75h2.5a.75.75 0 0 1 .75.75v9.75" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

type NavItem = {
  label: string
  to: string
}

const route = useRoute()
const isMenuOpen = ref(false)
const isBookMenuOpen = ref(false)
const bookMenuRef = ref<HTMLElement | null>(null)

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Workout', to: '/workout' },
  { label: 'Nutrition', to: '/nutrition' },
  { label: 'Login', to: '/login' },
  { label: 'Signup', to: '/signup' },
]

const bookMenuItems: Array<NavItem & { icon: 'recipe' | 'ingredient' }> = [
  { label: 'Recipe book', to: '/recipes', icon: 'recipe' },
  { label: 'Ingredient book', to: '/ingredients', icon: 'ingredient' },
]

const handleDocumentClick = (event: MouseEvent) => {
  if (!bookMenuRef.value) return
  if (!bookMenuRef.value.contains(event.target as Node)) {
    isBookMenuOpen.value = false
  }
}

const toggleBookMenu = () => {
  isBookMenuOpen.value = !isBookMenuOpen.value
}

const handleBookMenuSelection = () => {
  isBookMenuOpen.value = false
  isMenuOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
    isBookMenuOpen.value = false
  }
)
</script>

<style scoped>
</style>
