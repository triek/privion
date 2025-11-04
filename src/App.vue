<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <header class="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <RouterLink to="/" class="flex items-center gap-3 text-left">
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl font-black text-emerald-300 shadow-inner shadow-emerald-500/40">
            P
          </span>
          <div>
            <p class="text-lg font-semibold tracking-wide text-emerald-300">Privion</p>
            <p class="text-sm text-slate-400">Adaptive fitness, finances, and fuel.</p>
          </div>
        </RouterLink>
        <nav class="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-300">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-full px-4 py-2 transition"
            :class="route.path === item.to ? 'bg-emerald-500/20 text-emerald-200 shadow-inner shadow-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-12">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

type NavItem = {
  label: string
  to: string
}

const route = useRoute()

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Log', to: '/log' },
  { label: 'Coach', to: '/coach' },
  { label: 'Insights', to: '/insights' },
  { label: 'Wallet', to: '/wallet' },
]
</script>

<style scoped>
</style>
