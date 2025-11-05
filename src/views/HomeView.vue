<template>
  <div class="space-y-12">
    <section class="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/60 p-10 shadow-xl shadow-emerald-500/10 lg:grid-cols-[1.2fr_1fr]">
      <div class="space-y-6">
        <p class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
          Adaptive daily view
        </p>
        <h1 class="text-4xl font-black leading-tight text-white sm:text-5xl">
          Meet your nervous system where it is today.
        </h1>
        <p class="text-lg text-slate-300">
          Privion blends training, nutrition, recovery, and spending into one responsive loop. See the highlights for today, check energy cues, and prime tomorrow without guesswork.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <button class="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/40 transition hover:-translate-y-0.5 hover:bg-emerald-300">
            Start daily check-in
          </button>
          <button class="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-white/40">
            Preview schedule
          </button>
        </div>
      </div>

      <div class="space-y-5">
        <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <p class="text-xs uppercase tracking-wide text-emerald-300">Today summary card</p>
          <div class="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-300">
            <div>
              <p class="text-3xl font-black text-white">86%</p>
              <p class="mt-1 text-xs text-slate-400">Recovery alignment</p>
            </div>
            <div>
              <p class="text-3xl font-black text-white">3</p>
              <p class="mt-1 text-xs text-slate-400">Priority cues</p>
            </div>
            <div>
              <p class="text-3xl font-black text-white">2200</p>
              <p class="mt-1 text-xs text-slate-400">Calories remaining</p>
            </div>
            <div>
              <p class="text-3xl font-black text-white">$45</p>
              <p class="mt-1 text-xs text-slate-400">Budget headroom</p>
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Energy signal</p>
            <p class="mt-2 text-lg font-semibold text-emerald-200">Steady with afternoon dip</p>
            <p class="mt-2 text-sm text-slate-400">Plan a lighter skill block post-lunch and move the heavy lift earlier.</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Focus highlight</p>
            <p class="mt-2 text-lg font-semibold text-emerald-200">Form rehearsal</p>
            <p class="mt-2 text-sm text-slate-400">Run video review on front squats before the first working set.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Morning routine</h2>
        <p class="mt-3 text-sm text-slate-400">Breathing reset · Mobility primer · Protein shake</p>
        <ul class="mt-4 space-y-2 text-sm text-slate-300">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            3 rounds of box breathing at 4-7 cadence.
          </li>

          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            Hip 90/90 flow, 2 minutes per side.
          </li>

          <li class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 rounded-full bg-emerald-400"></span>
            32g whey + 5g creatine + cinnamon oats.
          </li>
        </ul>
      </article>

      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Training emphasis</h2>
        <p class="mt-3 text-sm text-slate-400">Primary lift + intent-based accessory cues.</p>
        <div class="mt-4 space-y-3 text-sm text-slate-300">
          <div class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4">
            <p class="text-xs uppercase text-emerald-200">Main set</p>
            <p class="mt-1 text-lg font-semibold text-white">Front squat @ RPE 8</p>
            <p class="mt-1 text-xs text-emerald-100/70">Warm-up: tempo 3-1-1, focus on brace timing.</p>
          </div>

          <div class="rounded-xl border border-white/10 bg-slate-950/60 p-4">
            <p class="text-xs uppercase text-slate-400">Accessory pairing</p>
            <p class="mt-1 font-semibold text-white">Split squat iso hold · Cable row tempo</p>
            <p class="mt-1 text-xs text-slate-400">Stop if knee tracking falters three reps in a row.</p>
          </div>
        </div>
      </article>

      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Evening reset</h2>
        <p class="mt-3 text-sm text-slate-400">Lock the day with micro-wins.</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <span>Reflect: "What felt smooth today?"</span>
            <span class="text-xs uppercase text-slate-500">2 min</span>
          </li>

          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <span>Prep shaker + overnight oats</span>
            <span class="text-xs uppercase text-slate-500">5 min</span>
          </li>
          
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <span>Budget pulse: tag 2 expenses</span>
            <span class="text-xs uppercase text-slate-500">3 min</span>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>
