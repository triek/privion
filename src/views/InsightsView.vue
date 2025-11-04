<template>
  <div class="space-y-10">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Insights</h1>
        <p class="text-sm text-slate-400">See patterns across performance, recovery, meals, and money.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <button class="rounded-full border border-white/20 px-4 py-2 text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40">7 days</button>
        <button class="rounded-full border border-white/20 px-4 py-2 text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40">30 days</button>
        <button class="rounded-full border border-emerald-400/50 bg-emerald-500/10 px-4 py-2 text-emerald-200 shadow-inner shadow-emerald-500/20">90 days</button>
      </div>
    </header>

    <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Training load vs recovery</h2>
        <p class="text-sm text-slate-400">Load trend smooths week-over-week with readiness overlay.</p>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Average load</p>
            <p class="mt-1 text-3xl font-black text-white">+6%</p>
            <p class="mt-1 text-xs text-slate-400">vs prior block</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Readiness</p>
            <p class="mt-1 text-3xl font-black text-white">82%</p>
            <p class="mt-1 text-xs text-slate-400">Average last 7 days</p>
          </div>
        </div>
        <div class="rounded-2xl border border-dashed border-emerald-400/40 bg-emerald-500/10 p-6 text-sm text-emerald-100/80">
          <p class="font-semibold text-emerald-200">Chart placeholder</p>
          <p class="mt-2 text-xs">Plot training stress balance with readiness overlay and call out the two dips that required accessory swaps.</p>
        </div>
      </article>

      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Nutrition & spend alignment</h2>
        <p class="text-sm text-slate-400">Protein-per-dollar trend lines highlight efficient meal builds.</p>
        <div class="rounded-2xl border border-dashed border-white/20 bg-slate-950/70 p-6 text-sm text-slate-300">
          <p class="font-semibold text-white">Chart placeholder</p>
          <p class="mt-2 text-xs text-slate-400">Overlay protein grams, calories, and meal cost to visualize budget adherence.</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Protein / $</p>
            <p class="mt-1 text-3xl font-black text-white">+0.8</p>
            <p class="mt-1 text-xs text-slate-400">Improvement vs prior week</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Top meal</p>
            <p class="mt-1 text-lg font-semibold text-white">Bean + egg tacos</p>
            <p class="mt-1 text-xs text-slate-400">34g protein · $3.20 cost</p>
          </div>
        </div>
      </article>
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">Momentum scorecard</h3>
        <p class="mt-2 text-sm text-slate-400">Lift, fuel, budget, and recovery compliance.</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Lifts completed</span>
            <span class="font-semibold text-white">11/12</span>
          </li>
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Meals logged</span>
            <span class="font-semibold text-white">92%</span>
          </li>
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Budget tracked</span>
            <span class="font-semibold text-white">88%</span>
          </li>
        </ul>
      </article>
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">Habit streaks</h3>
        <p class="mt-2 text-sm text-slate-400">Highlight consistency anchors worth protecting.</p>
        <div class="mt-4 space-y-3 text-sm text-slate-300">
          <div class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Lights out before 11:00</span>
            <span class="text-emerald-200">6 days</span>
          </div>
          <div class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Prep next-day meals</span>
            <span class="text-emerald-200">4 days</span>
          </div>
          <div class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Spend review</span>
            <span class="text-emerald-200">7 days</span>
          </div>
        </div>
      </article>
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">Next focus</h3>
        <p class="mt-2 text-sm text-slate-400">Privion recommends three experiments to test.</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3">
            <p class="text-xs uppercase text-emerald-200">Training</p>
            <p class="mt-1 font-semibold text-white">Swap Tuesday AMRAP for EMOM</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <p class="text-xs uppercase text-slate-400">Nutrition</p>
            <p class="mt-1 font-semibold text-white">Add 15g protein to breakfast</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <p class="text-xs uppercase text-slate-400">Finance</p>
            <p class="mt-1 font-semibold text-white">Auto-transfer $25 to gear fund</p>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>
