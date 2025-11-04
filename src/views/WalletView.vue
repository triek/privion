<template>
  <div class="space-y-10">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Wallet</h1>
        <p class="text-sm text-slate-400">Steer your spending to support training blocks and long-term goals.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button class="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300">
          Add transaction
        </button>
        <button class="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40">
          Sync accounts
        </button>
      </div>
    </header>

    <section class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Budget snapshot</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Training gear</p>
            <p class="mt-1 text-3xl font-black text-white">$120</p>
            <p class="mt-1 text-xs text-slate-400">$180 planned</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Nutrition</p>
            <p class="mt-1 text-3xl font-black text-white">$265</p>
            <p class="mt-1 text-xs text-slate-400">$320 planned</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Recovery</p>
            <p class="mt-1 text-3xl font-black text-white">$48</p>
            <p class="mt-1 text-xs text-slate-400">$75 planned</p>
          </div>
        </div>
        <div class="rounded-2xl border border-dashed border-white/20 bg-slate-950/70 p-6 text-sm text-slate-300">
          <p class="font-semibold text-white">Spending flow placeholder</p>
          <p class="mt-2 text-xs text-slate-400">Stacked bar of weekly spend vs planned allowance by category.</p>
        </div>
      </article>

      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">Upcoming obligations</h2>
          <button class="text-xs font-semibold uppercase tracking-wide text-emerald-300">Plan adjustments</button>
        </div>
        <ul class="space-y-4 text-sm text-slate-300">
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-white">Coaching retainer</p>
              <p class="text-xs uppercase text-slate-500">Due Fri</p>
            </div>
            <p class="mt-1 text-xs text-slate-400">$180 · Covered by remote clients fund.</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-white">Supplements restock</p>
              <p class="text-xs uppercase text-slate-500">Due Mon</p>
            </div>
            <p class="mt-1 text-xs text-slate-400">$65 · Align with grocery run.</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-white">Gym maintenance fee</p>
              <p class="text-xs uppercase text-slate-500">Due 28th</p>
            </div>
            <p class="mt-1 text-xs text-slate-400">$35 · Auto-deduct from operations envelope.</p>
          </li>
        </ul>
      </article>
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">Savings automations</h3>
        <p class="mt-2 text-sm text-slate-400">Micro transfers tied to training cadence.</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Post-session $5 sweep</span>
            <span class="text-emerald-200">Active</span>
          </li>
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Weekly grocery reserve</span>
            <span class="text-emerald-200">Active</span>
          </li>
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Quarterly gear upgrade</span>
            <span class="text-slate-500">Paused</span>
          </li>
        </ul>
      </article>
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">Recent transactions</h3>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Farmer’s market haul</span>
            <span class="font-semibold text-white">$28</span>
          </li>
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Compression sleeves</span>
            <span class="font-semibold text-white">$32</span>
          </li>
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Physio session</span>
            <span class="font-semibold text-white">$60</span>
          </li>
        </ul>
      </article>
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">Action queue</h3>
        <p class="mt-2 text-sm text-slate-400">Quick wins to keep cash flow aligned.</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3">
            <p class="text-xs uppercase text-emerald-200">Today</p>
            <p class="mt-1 font-semibold text-white">Upload receipt for straps</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <p class="text-xs uppercase text-slate-400">Tomorrow</p>
            <p class="mt-1 font-semibold text-white">Review dining out envelope</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <p class="text-xs uppercase text-slate-400">This week</p>
            <p class="mt-1 font-semibold text-white">Schedule call with financial coach</p>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>
