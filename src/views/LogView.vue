<template>
  <div class="space-y-10">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Log</h1>
        <p class="text-sm text-slate-400">Capture the truth about today and stack data that adapts with you.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button class="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300">
          + Workout
        </button>
        <button class="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40">
          + Meal
        </button>
        <button class="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40">
          + Expense
        </button>
      </div>
    </header>

    <section class="grid gap-6 lg:grid-cols-[0.9fr_1fr]">
      <article class="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Today at a glance</h2>
        <p class="text-sm text-slate-400">Key signals from training, nutrition, and spending.</p>
        <div class="grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Session feel</p>
            <p class="mt-1 text-lg font-semibold text-white">Quads lit up early</p>
            <p class="mt-2 text-xs text-slate-400">Flag RPE overshoot on sets 2-3.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Meal note</p>
            <p class="mt-1 text-lg font-semibold text-white">Lunch under macros</p>
            <p class="mt-2 text-xs text-slate-400">Add 25g carbs to next plate.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Budget pulse</p>
            <p class="mt-1 text-lg font-semibold text-white">$38 discretionary</p>
            <p class="mt-2 text-xs text-slate-400">Hold off on takeout tonight.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Recovery check</p>
            <p class="mt-1 text-lg font-semibold text-white">Sleep debt 40 min</p>
            <p class="mt-2 text-xs text-slate-400">Coach will auto-lighten tomorrow’s accessory block.</p>
          </div>
        </div>
      </article>

      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">Running log</h2>
          <button class="text-xs font-semibold uppercase tracking-wide text-emerald-300">View archive</button>
        </div>
        <ul class="space-y-4 text-sm text-slate-300">
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">08:15 · Warm-up + Strength</p>
            <p class="mt-1 font-semibold text-white">Front squat 4x4 @ 82%</p>
            <p class="mt-1 text-xs text-slate-400">Note: reps 3-4 needed pause at bottom.</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">12:40 · Meal</p>
            <p class="mt-1 font-semibold text-white">Chicken burrito bowl</p>
            <p class="mt-1 text-xs text-slate-400">Protein: 52g · Carbs: 68g · Cost: $9.20</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">14:10 · Finance</p>
            <p class="mt-1 font-semibold text-white">Tagged new straps as gear</p>
            <p class="mt-1 text-xs text-slate-400">$24 · Categorized for monthly review.</p>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>
