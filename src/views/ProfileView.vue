<template>
  <div class="mx-auto max-w-3xl space-y-8">
    <header class="space-y-3 text-center">
      <p class="text-sm uppercase tracking-[0.3em] text-emerald-300">Profile</p>
      <h1 class="text-3xl font-bold text-white">Your training identity</h1>
      <p class="text-sm text-slate-400">We keep your signup details here so workouts, meals, and recovery stay in sync.</p>
    </header>

    <section
      v-if="profile"
      class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-emerald-500/10"
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-500">Name</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ profile.name }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-500">Email</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ profile.email }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-500">Primary goal</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ profile.goal }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-500">Training focus</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ profile.focus }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-500">Location</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ profile.location }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p class="text-xs uppercase tracking-wide text-slate-500">Experience level</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ profile.experience }}</p>
        </div>
      </div>

      <div class="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
        Keep this info updated so Privion can align your programming, nutrition, and recovery cues automatically.
      </div>
    </section>

    <section
      v-else
      class="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center text-slate-200 shadow-lg shadow-emerald-500/10"
    >
      <p class="text-lg font-semibold">No profile yet</p>
      <p class="text-sm text-slate-400">Create an account to generate a profile and sync your data.</p>
      <div class="flex justify-center gap-3">
        <RouterLink
          to="/signup"
          class="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/40 transition hover:-translate-y-0.5 hover:bg-emerald-300"
        >
          Go to signup
        </RouterLink>
        <RouterLink
          to="/login"
          class="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/5"
        >
          Go to login
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)
</script>
