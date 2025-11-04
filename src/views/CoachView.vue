<template>
  <div class="space-y-10">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Coach</h1>
        <p class="text-sm text-slate-400">Get precise prompts built from your logs and nervous system signals.</p>
      </div>
      <button class="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300">
        Generate micro-plan
      </button>
    </header>

    <section class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">Adaptive cues</h2>
          <span class="text-xs uppercase tracking-wide text-emerald-300">Live sync</span>
        </div>
        <ul class="space-y-4 text-sm text-slate-300">
          <li class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4">
            <p class="text-xs uppercase text-emerald-200">Pre-lift</p>
            <p class="mt-1 font-semibold text-white">Add 1 extra ramp-up set @ 65%</p>
            <p class="mt-1 text-xs text-emerald-100/70">Reason: sleep debt + quad soreness. Expect better groove with gradual load.</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Accessory</p>
            <p class="mt-1 font-semibold text-white">Switch Nordic curls to band-assisted</p>
            <p class="mt-1 text-xs text-slate-400">Keep volume, focus on clean tempo over load.</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Finance nudge</p>
            <p class="mt-1 font-semibold text-white">Reclassify yesterday’s coffee</p>
            <p class="mt-1 text-xs text-slate-400">Move $4.50 from dining out to mindful treats bucket.</p>
          </li>
        </ul>
      </article>

      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Coach dialogue</h2>
        <div class="space-y-4 text-sm">
          <div class="flex gap-3">
            <div class="mt-1 h-8 w-8 rounded-full bg-emerald-500/20 text-center text-xs font-semibold leading-8 text-emerald-200">AI</div>
            <div class="flex-1 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-50">
              <p>Quad fatigue still elevated. How did the first working set feel compared to last week?</p>
            </div>
          </div>
          <div class="flex flex-row-reverse gap-3">
            <div class="mt-1 h-8 w-8 rounded-full bg-white/10 text-center text-xs font-semibold leading-8 text-white">You</div>
            <div class="flex-1 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-slate-200">
              <p>Depth felt smooth but bracing slipped on rep 3. Took longer rest.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="mt-1 h-8 w-8 rounded-full bg-emerald-500/20 text-center text-xs font-semibold leading-8 text-emerald-200">AI</div>
            <div class="flex-1 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-50">
              <p>Stack two-breath brace + cue “knees over toes” before each rep. Log how rep 4 responds.</p>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-semibold text-white">Tomorrow’s draft</h2>
        <button class="text-xs font-semibold uppercase tracking-wide text-emerald-300">Send to calendar</button>
      </div>
      <div class="mt-4 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
        <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase text-slate-400">Warm-up</p>
          <p class="mt-1 font-semibold text-white">Single-leg RDL sweep</p>
          <p class="mt-1 text-xs text-slate-400">2 x 8 each side · stay submax.</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase text-slate-400">Main work</p>
          <p class="mt-1 font-semibold text-white">Bench cluster sets</p>
          <p class="mt-1 text-xs text-slate-400">Wave 4x(2+2) · RPE 7.5 cap.</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase text-slate-400">Recovery</p>
          <p class="mt-1 font-semibold text-white">90-min walk + audio note recap</p>
          <p class="mt-1 text-xs text-slate-400">Tag reflections for next check-in.</p>
        </div>
      </div>
    </section>
  </div>
</template>
