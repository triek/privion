<template>
  <div class="space-y-12">
    <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Training blueprint</p>
        <h1 class="text-3xl font-bold text-white">Workout routine</h1>
        <p class="max-w-2xl text-sm text-slate-400">
          Preview how the push / pull / legs rotation fits together, understand the progressions across the block, and keep the
          supporting habits that make recovery automatic.
        </p>
      </div>
      <RouterLink
        to="/workout"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        Back to workout
      </RouterLink>
    </header>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-white">Weekly rotation</h2>
          <p class="text-sm text-slate-400">Anchor lifts lead every session while accessory pairings reinforce the main intent.</p>
        </div>
        <span class="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-100">
          {{ rotationSummary.length }} sessions
        </span>
      </div>
      <div class="grid gap-5 lg:grid-cols-3">
        <article
          v-for="session in rotationSummary"
          :key="session.id"
          class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300"
        >
          <header class="space-y-1">
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ session.emphasis }}</p>
            <h3 class="text-lg font-semibold text-white">{{ session.anchorLift }}</h3>
            <p class="text-xs text-slate-500">{{ session.title }}</p>
          </header>
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">Supporting work</p>
            <ul class="space-y-1 text-xs text-slate-400">
              <li v-for="lift in session.supportLifts" :key="lift" class="flex items-start gap-2">
                <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <span>{{ lift }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article class="space-y-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Progression roadmap</h2>
          <p class="text-sm text-slate-400">Every block builds from capacity to intensity—here&apos;s the playbook for the next six weeks.</p>
        </div>
        <ul class="space-y-4">
          <li
            v-for="phase in progressionPhases"
            :key="phase.title"
            class="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
          >
            <div class="flex flex-col gap-1">
              <p class="text-xs uppercase tracking-wide text-emerald-300">{{ phase.focus }}</p>
              <h3 class="text-base font-semibold text-white">{{ phase.title }}</h3>
            </div>
            <ul class="mt-3 space-y-1 text-xs text-slate-400">
              <li v-for="point in phase.checkpoints" :key="point" class="flex items-start gap-2">
                <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <span>{{ point }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </article>

      <article class="space-y-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Support systems</h2>
          <p class="text-sm text-slate-400">Quick reminders to keep recovery, nutrition, and readiness dialed in alongside training.</p>
        </div>
        <ul class="space-y-4">
          <li v-for="system in supportSystems" :key="system.title" class="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <h3 class="text-base font-semibold text-white">{{ system.title }}</h3>
            <p class="mt-1 text-xs text-slate-400">{{ system.description }}</p>
            <ul class="mt-3 space-y-1 text-xs text-slate-400">
              <li v-for="item in system.actions" :key="item" class="flex items-start gap-2">
                <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </article>
    </section>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-white">Session readiness checklist</h2>
          <p class="text-sm text-slate-400">Run this quick scan before starting to make sure the session lands.</p>
        </div>
        <span class="text-xs uppercase tracking-wide text-slate-400">3 minute audit</span>
      </div>
      <div class="grid gap-4 md:grid-cols-3">
        <article
          v-for="check in readinessChecklist"
          :key="check.title"
          class="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300"
        >
          <div class="space-y-1">
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ check.category }}</p>
            <h3 class="text-base font-semibold text-white">{{ check.title }}</h3>
          </div>
          <p class="text-xs text-slate-400">{{ check.description }}</p>
          <ul class="space-y-1 text-xs text-slate-400">
            <li v-for="item in check.prompts" :key="item" class="flex items-start gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Plan } from '@/data/workoutPlans'
import { workoutPlans } from '@/data/workoutPlans'

type RotationSummary = {
  id: string
  title: string
  anchorLift: string
  supportLifts: string[]
  emphasis: string
}

type ProgressionPhase = {
  title: string
  focus: string
  checkpoints: string[]
}

type SupportSystem = {
  title: string
  description: string
  actions: string[]
}

type ReadinessCheck = {
  title: string
  category: string
  description: string
  prompts: string[]
}

const rotationSummary = computed<RotationSummary[]>(() =>
  workoutPlans.map((plan: Plan) => ({
    id: plan.id,
    title: plan.title,
    anchorLift: plan.exercises[0]?.name ?? 'Primary lift focus',
    supportLifts: plan.exercises.slice(1, 4).map((exercise) => exercise.name),
    emphasis: `${plan.label} emphasis · Week ${plan.week}`,
  }))
)

const progressionPhases: ProgressionPhase[] = [
  {
    title: 'Weeks 1–2 · Accumulation base',
    focus: 'Volume primer',
    checkpoints: [
      'Set RPE at 6–7 to groove movement quality and cadence',
      'Add an optional technique set on the final compound of the day',
      'Log recovery markers nightly to spot fatigue early',
    ],
  },
  {
    title: 'Weeks 3–4 · Intensification push',
    focus: 'Strength expression',
    checkpoints: [
      'Progress main lift loading by 2–5% while keeping bar speed consistent',
      'Trim accessories to prioritize the top two movements that drive adaptation',
      'Layer in cluster or drop sets once per week for the priority lift',
    ],
  },
  {
    title: 'Week 5 · Overreach and taper',
    focus: 'Performance peak',
    checkpoints: [
      'Hit top sets at RPE 8 and follow with back-off sets at -10%',
      'Shift accessory focus to mobility and pump work to stay fresh',
      'Schedule an extra rest day or mobility circuit before retesting',
    ],
  },
]

const supportSystems: SupportSystem[] = [
  {
    title: 'Daily readiness',
    description: 'Light touchpoints to confirm you can attack the day with intent.',
    actions: [
      '2 minute mobility circuit after waking: cat-cow, hip airplanes, shoulder CARs',
      'Track sleep quality (1–5) and resting heart rate in the notes app',
      'Prep hydration bottle with electrolytes before leaving for the gym',
    ],
  },
  {
    title: 'Nutrition alignment',
    description: 'Keep intake synced to the training calendar without overthinking it.',
    actions: [
      'Match higher-carb meals to push and leg days within 2 hours pre-training',
      'Batch cook a protein anchor on Sundays to plug into busy days',
      'Keep quick carbohydrates in your gym bag for intra-session support',
    ],
  },
  {
    title: 'Recovery hygiene',
    description: 'Stay ahead of niggles and keep the nervous system calm between sessions.',
    actions: [
      'Add 10 minutes of zone 2 cardio on rest days to promote blood flow',
      'Perform a nightly downshift: foam roll, 90/90 breathing, and light stretching',
      'Book soft tissue work on week 3 leading into the heavy wave',
    ],
  },
]

const readinessChecklist: ReadinessCheck[] = [
  {
    title: 'Intent & focus',
    category: 'Mindset',
    description: 'Name the win for today and set a cue that keeps technique sharp.',
    prompts: [
      'Write the top lift and desired RPE in your training log',
      'Pick one technical focus (e.g., brace, tempo, bar path)',
      'Take 3 slow nasal breaths before unracking the first set',
    ],
  },
  {
    title: 'Fuel & hydration',
    category: 'Preparation',
    description: 'Confirm you have energy and fluids to support the full session.',
    prompts: [
      'Protein-forward meal within the last 3 hours',
      '500–750 ml water + electrolytes pre-training',
      'Post-session shake or meal planned before leaving the gym',
    ],
  },
  {
    title: 'Body check-in',
    category: 'Readiness',
    description: 'Scan joints and soft tissue so surprises don’t surface mid-set.',
    prompts: [
      'Quick CARs series: neck, shoulders, hips, and ankles',
      'Note any tightness and adjust warm-up primers accordingly',
      'Confirm equipment setup (belt, sleeves, straps) is ready to roll',
    ],
  },
]
</script>
