<template>
  <div class="mx-auto max-w-xl space-y-10">
    <header class="space-y-3 text-center">
      <h1 class="text-3xl font-bold text-white">Create your account</h1>
      <p class="text-sm text-slate-400">Sync workouts, meals, and recovery into one adaptive hub.</p>
    </header>

    <form class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-emerald-500/10">
      <div class="space-y-2">
        <label for="name" class="text-sm font-medium text-slate-200">Full name</label>
        <input
          id="name"
          type="text"
          placeholder="Jane Doe"
          class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        />
      </div>
      <div class="space-y-2">
        <label for="email" class="text-sm font-medium text-slate-200">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        />
      </div>
      <div class="space-y-2">
        <label for="password" class="text-sm font-medium text-slate-200">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Create a strong password"
          class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        />
      </div>
      <div class="space-y-2">
        <label for="goal" class="text-sm font-medium text-slate-200">Primary goal</label>
        <select
          id="goal"
          class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        >
          <option class="bg-slate-900">Build strength</option>
          <option class="bg-slate-900">Improve endurance</option>
          <option class="bg-slate-900">Dial in nutrition</option>
        </select>
      </div>
      <button
        type="submit"
        class="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/40 transition hover:-translate-y-0.5 hover:bg-emerald-300"
      >
        Create account
      </button>
    </form>

    <p class="text-center text-sm text-slate-400">
      Already have an account?
      <RouterLink to="/login" class="font-semibold text-emerald-300 hover:text-emerald-200">Log in here</RouterLink>.
    </p>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
