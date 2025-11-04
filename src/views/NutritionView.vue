<template>
  <div class="space-y-10">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Nutrition</h1>
        <p class="text-sm text-slate-400">Fuel every block with meals that match your training demand.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button class="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300">
          Add meal
        </button>
        <button class="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40">
          Plan groceries
        </button>
      </div>
    </header>

    <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 class="text-lg font-semibold text-white">Daily plate</h2>
        <p class="text-sm text-slate-400">Macro targets and meal anchors for today.</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Protein</p>
            <p class="mt-1 text-3xl font-black text-white">180g</p>
            <p class="mt-1 text-xs text-slate-400">Goal: 190g</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Carbs</p>
            <p class="mt-1 text-3xl font-black text-white">275g</p>
            <p class="mt-1 text-xs text-slate-400">Goal: 300g</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Fats</p>
            <p class="mt-1 text-3xl font-black text-white">68g</p>
            <p class="mt-1 text-xs text-slate-400">Goal: 70g</p>
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-50">
            <p class="text-xs uppercase text-emerald-200">Pre-workout</p>
            <p class="mt-1 font-semibold text-white">Greek yogurt parfait</p>
            <p class="mt-1 text-xs text-emerald-100/80">30g protein · 45g carbs · Add berries for micronutrients.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Post-workout</p>
            <p class="mt-1 font-semibold text-white">Rice bowl + salmon</p>
            <p class="mt-1 text-xs text-slate-400">38g protein · 65g carbs · 14g fats.</p>
          </div>
        </div>
      </article>

      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">Meal log</h2>
          <button class="text-xs font-semibold uppercase tracking-wide text-emerald-300">Export</button>
        </div>
        <ul class="space-y-4 text-sm text-slate-300">
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">07:30 · Breakfast</p>
            <p class="mt-1 font-semibold text-white">Oats + whey + banana</p>
            <p class="mt-1 text-xs text-slate-400">52g protein · 72g carbs · 12g fats</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">12:45 · Lunch</p>
            <p class="mt-1 font-semibold text-white">Chicken burrito bowl</p>
            <p class="mt-1 text-xs text-slate-400">48g protein · 68g carbs · 16g fats</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p class="text-xs uppercase text-slate-400">18:30 · Dinner</p>
            <p class="mt-1 font-semibold text-white">Salmon, rice & greens</p>
            <p class="mt-1 text-xs text-slate-400">54g protein · 70g carbs · 20g fats</p>
          </li>
        </ul>
      </article>
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">Grocery highlights</h3>
        <p class="mt-2 text-sm text-slate-400">Keep staples stocked for effortless prep.</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Bulk jasmine rice</span>
            <span class="text-xs uppercase text-slate-500">10 lbs</span>
          </li>
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Skinless chicken thighs</span>
            <span class="text-xs uppercase text-slate-500">6 lbs</span>
          </li>
          <li class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Greek yogurt tubs</span>
            <span class="text-xs uppercase text-slate-500">3</span>
          </li>
        </ul>
      </article>
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">Hydration & supplements</h3>
        <p class="mt-2 text-sm text-slate-400">Stack simple habits for recovery.</p>
        <div class="mt-4 space-y-3 text-sm text-slate-300">
          <div class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Electrolyte mix</span>
            <span class="text-emerald-200">2 servings</span>
          </div>
          <div class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Creatine monohydrate</span>
            <span class="text-emerald-200">5g daily</span>
          </div>
          <div class="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <span>Omega-3 caps</span>
            <span class="text-emerald-200">2 caps</span>
          </div>
        </div>
      </article>
      <article class="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">Prep checklist</h3>
        <p class="mt-2 text-sm text-slate-400">Quick wins to stay consistent.</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-300">
          <li class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3">
            <p class="text-xs uppercase text-emerald-200">Today</p>
            <p class="mt-1 font-semibold text-white">Marinate salmon for tomorrow</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <p class="text-xs uppercase text-slate-400">Tomorrow</p>
            <p class="mt-1 font-semibold text-white">Prep overnight oats</p>
          </li>
          <li class="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <p class="text-xs uppercase text-slate-400">This week</p>
            <p class="mt-1 font-semibold text-white">Batch cook chili</p>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>
