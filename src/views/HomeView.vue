<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <header class="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div class="flex items-center gap-3">
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl font-black text-emerald-300 shadow-inner shadow-emerald-500/40">
            P
          </span>
          <div>
            <p class="text-lg font-semibold tracking-wide text-emerald-300">Privion</p>
            <p class="text-sm text-slate-400">Fitness that adapts to you.</p>
          </div>
        </div>
        <nav class="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <a class="transition hover:text-white" href="#features">Features</a>
          <a class="transition hover:text-white" href="#how-it-works">How it works</a>
          <a class="transition hover:text-white" href="#tech">Tech snapshot</a>
        </nav>
        <a
          class="rounded-full border border-emerald-400/60 bg-emerald-500/20 px-5 py-2 text-sm font-semibold text-emerald-200 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/30"
          href="#get-started"
        >
          Start adapting
        </a>
      </div>
    </header>

    <main>
      <section class="relative overflow-hidden">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.45),_rgba(15,23,42,0))]"></div>
        <div class="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 lg:flex-row lg:items-center">
          <div class="flex-1">
            <p class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
              Awareness over autopilot
            </p>
            <h1 class="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Fitness that listens so you can <span class="text-emerald-300">train the body you have today</span>.
            </h1>
            <p class="mt-6 max-w-xl text-lg text-slate-300">
              Privion bridges the gap between tracking and understanding, blending your workouts, meals, and spending into one adaptive system that evolves with your rhythm.
            </p>
            <div class="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                class="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                href="#features"
              >
                Explore features
              </a>
              <a
                class="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-white/40"
                href="#get-started"
              >
                See how Privion adapts
              </a>
            </div>
          </div>
          <div class="flex-1 space-y-6">
            <div class="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-emerald-500/20">
              <p class="text-sm font-semibold uppercase tracking-wide text-emerald-300">Snapshot</p>
              <p class="mt-4 text-lg text-slate-200">
                "No hype. No rigid rules. Just progress that listens."
              </p>
              <p class="mt-6 text-sm text-slate-400">
                Log training, meals, and spend side-by-side. Privion senses fatigue, budget, and momentum so you can respond in real time.
              </p>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
                <p class="text-xs uppercase text-slate-400">Today’s readiness</p>
                <p class="mt-2 text-3xl font-black text-emerald-300">Responsive</p>
                <p class="mt-2 text-sm text-slate-400">Adjust intensity with quick prompts and smart nudges.</p>
              </div>
              <div class="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
                <p class="text-xs uppercase text-slate-400">Focus</p>
                <p class="mt-2 text-3xl font-black text-emerald-300">You</p>
                <p class="mt-2 text-sm text-slate-400">Privion learns your rhythm, balancing ambition with recovery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="bg-slate-950/60 py-20">
        <div class="mx-auto max-w-6xl px-6">
          <div class="mb-12 max-w-2xl">
            <h2 class="text-3xl font-bold text-white sm:text-4xl">Everything you need to train with awareness</h2>
            <p class="mt-4 text-base text-slate-400">
              Privion combines workouts, meals, and spending into one simple system. Every tap feeds your adaptive plan.
            </p>
          </div>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <article class="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 class="text-xl font-semibold text-white">Adaptive Workouts</h3>
              <p class="mt-3 text-sm text-slate-300">
                Log sets, reps, RPE, and receive instant prompts like “Fatigue early?” or “Can’t hit depth?”. Privion suggests on-the-spot tweaks and remembers what works for you.
              </p>
            </article>
            <article class="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 class="text-xl font-semibold text-white">Smart Nutrition</h3>
              <p class="mt-3 text-sm text-slate-300">
                Track meals by grams and cost. See macros, protein-per-dollar, and budget trends so every plate fits both your body and your wallet.
              </p>
            </article>
            <article class="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 class="text-xl font-semibold text-white">Pantry Planner</h3>
              <p class="mt-3 text-sm text-slate-300">
                Enter what you have and instantly get a three-day plan plus a grocery list. Privion keeps you consistent without extra brainpower.
              </p>
            </article>
            <article class="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 class="text-xl font-semibold text-white">Progress Dashboards</h3>
              <p class="mt-3 text-sm text-slate-300">
                Visualize daily and weekly trends for calories, protein, and spend. Spot wins and course-correct before momentum fades.
              </p>
            </article>
            <article class="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <h3 class="text-xl font-semibold text-white">Best-Day Replay</h3>
              <p class="mt-3 text-sm text-slate-300">
                Loved a day that clicked? Replay it instantly to lock in routines that feel just right.
              </p>
            </article>
            <article class="flex h-full flex-col rounded-3xl border border-dashed border-emerald-400/40 bg-emerald-500/10 p-6">
              <h3 class="text-xl font-semibold text-emerald-200">Always Learning</h3>
              <p class="mt-3 text-sm text-emerald-100/80">
                Every check-in trains your future sessions. Privion keeps evolving with your lifestyle.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="how-it-works" class="bg-slate-950 py-20">
        <div class="mx-auto max-w-6xl space-y-10 px-6">
          <div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div class="max-w-xl">
              <h2 class="text-3xl font-bold text-white sm:text-4xl">How Privion keeps you in sync</h2>
              <p class="mt-4 text-base text-slate-400">
                Privion listens to the feedback you provide during training, meals, and recovery, turning it into actionable guidance.
              </p>
            </div>
            <div class="grid flex-1 gap-6 sm:grid-cols-3">
              <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                <p class="text-sm font-semibold uppercase tracking-wide text-emerald-300">01</p>
                <p class="mt-3 text-sm text-slate-300">Log the truth about how each session felt—form, effort, energy, mindset.</p>
              </div>
              <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                <p class="text-sm font-semibold uppercase tracking-wide text-emerald-300">02</p>
                <p class="mt-3 text-sm text-slate-300">Privion pairs that insight with your nutrition and spending signals.</p>
              </div>
              <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                <p class="text-sm font-semibold uppercase tracking-wide text-emerald-300">03</p>
                <p class="mt-3 text-sm text-slate-300">The result: adaptive recommendations that match the body you bring today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tech" class="bg-slate-950/60 py-20">
        <div class="mx-auto max-w-6xl px-6">
          <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-10">
            <h2 class="text-3xl font-bold text-white sm:text-4xl">Tech snapshot</h2>
            <p class="mt-4 text-base text-slate-400">
              Built with a modern stack so Privion stays fast, reliable, and ready to scale.
            </p>
            <dl class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt class="text-sm font-semibold uppercase tracking-wide text-emerald-300">Frontend</dt>
                <dd class="mt-2 text-sm text-slate-300">Vue 3, TypeScript, Tailwind CSS</dd>
              </div>
              <div>
                <dt class="text-sm font-semibold uppercase tracking-wide text-emerald-300">Backend</dt>
                <dd class="mt-2 text-sm text-slate-300">Node.js with Express</dd>
              </div>
              <div>
                <dt class="text-sm font-semibold uppercase tracking-wide text-emerald-300">Databases</dt>
                <dd class="mt-2 text-sm text-slate-300">MongoDB &amp; Postgres</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>

    <footer id="get-started" class="border-t border-white/10 bg-slate-950/80 py-16">
      <div class="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <h2 class="text-3xl font-bold text-white sm:text-4xl">Ready to train with awareness?</h2>
        <p class="max-w-2xl text-base text-slate-400">
          Privion helps you listen to your body and respond in the moment. Track what matters, adapt quickly, and stay consistent without burning out.
        </p>
        <a
          class="inline-flex items-center justify-center rounded-full bg-emerald-400 px-8 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:bg-emerald-300"
          href="#"
        >
          Join the beta list
        </a>
        <p class="text-xs uppercase tracking-[0.3em] text-slate-500">No hype. No rigid rules. Just progress that listens.</p>
      </div>
    </footer>
  </div>
</template>
