<template>
  <div class="space-y-10">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Workout</h1>
        <p class="text-sm text-slate-400">Dial in today’s training stimulus with adaptive guidance.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button class="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300">
          Plan new session
        </button>
        <button class="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40">
          Log performance
        </button>
      </div>
    </header>

    <section class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Session focus</h2>
        <p class="text-sm text-slate-400">Readiness, priorities, and key cues before you lift.</p>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-50">
            <p class="text-xs uppercase text-emerald-200">Readiness</p>
            <p class="mt-1 text-3xl font-black text-white">83%</p>
            <p class="mt-1 text-xs text-emerald-100/80">Soreness low, HRV stable. Keep ramp-up deliberate.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Priority lift</p>
            <p class="mt-1 text-lg font-semibold text-white">Front squat @ RPE 8</p>
            <p class="mt-1 text-xs text-slate-400">3 warm-up waves · 4x4 working sets.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Accessory pairing</p>
            <p class="mt-1 font-semibold text-white">Split squat iso + cable row</p>
            <p class="mt-1 text-xs text-slate-400">Hold :30 per leg · 3x10 rows with tempo.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Recovery note</p>
            <p class="mt-1 font-semibold text-white">Finish with parasympathetic breath ladder</p>
            <p class="mt-1 text-xs text-slate-400">5 rounds: inhale 4, exhale 6.</p>
          </div>
        </div>
      </article>

      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">Coach prompts</h2>
          <button class="text-xs font-semibold uppercase tracking-wide text-emerald-300">Refresh cues</button>
        </div>
        <ul class="space-y-4 text-sm text-slate-300">
          <li class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4">
            <p class="text-xs uppercase text-emerald-200">Warm-up</p>
            <p class="mt-1 font-semibold text-white">Add single-leg RDL sweep between ramp sets.</p>
            <p class="mt-1 text-xs text-emerald-100/80">Maintain soft knee, focus on breathing cadence.</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Main lift</p>
            <p class="mt-1 font-semibold text-white">Pause 1 sec at the bottom on set two.</p>
            <p class="mt-1 text-xs text-slate-400">Cue: "exhale into brace" before ascent.</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">Accessory</p>
            <p class="mt-1 font-semibold text-white">Swap Nordic curls for band-assisted variation.</p>
            <p class="mt-1 text-xs text-slate-400">Keep tempo 3-1-1, cap RPE at 7.</p>
          </li>
        </ul>
      </article>
    </section>

    <section class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-semibold text-white">Set log</h2>
        <button class="text-xs font-semibold uppercase tracking-wide text-emerald-300">View history</button>
      </div>
      <div class="mt-4 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
        <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase text-slate-400">Front squat</p>
          <p class="mt-1 font-semibold text-white">4x4 @ 82%</p>
          <p class="mt-1 text-xs text-slate-400">Note: rep 3 slows—brace harder, keep heels rooted.</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase text-slate-400">Accessory superset</p>
          <p class="mt-1 font-semibold text-white">Split squat iso · Cable row</p>
          <p class="mt-1 text-xs text-slate-400">Iso: :30 hold · Rows: 3x10 @ moderate load.</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p class="text-xs uppercase text-slate-400">Finisher</p>
          <p class="mt-1 font-semibold text-white">Tempo push-up ladder</p>
          <p class="mt-1 text-xs text-slate-400">3 rounds · tempo 3-1-1 · stop if form slips.</p>
        </div>
      </div>
    </section>
  </div>
</template>
