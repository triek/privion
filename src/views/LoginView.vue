<template>
  <div class="mx-auto max-w-xl space-y-10">
    <header class="space-y-3 text-center">
      <h1 class="text-3xl font-bold text-white">Login</h1>
      <p class="text-sm text-slate-400">Access your personalized workout and nutrition plans.</p>
    </header>

    <form class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-emerald-500/10">
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
        <div class="flex items-center justify-between text-sm font-medium text-slate-200">
          <label for="password">Password</label>
          <a href="#" class="text-emerald-300 hover:text-emerald-200">Forgot password?</a>
        </div>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          class="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        />
      </div>
      <button
        type="submit"
        class="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/40 transition hover:-translate-y-0.5 hover:bg-emerald-300"
      >
        Sign in
      </button>
    </form>

    <p class="text-center text-sm text-slate-400">
      No account yet?
      <RouterLink to="/signup" class="font-semibold text-emerald-300 hover:text-emerald-200">Create one now</RouterLink>.
    </p>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
