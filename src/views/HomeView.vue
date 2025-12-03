<template>
  <div class="space-y-6">
    <section
      class="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_25px_60px_-25px_rgba(16,185,129,0.35)] lg:grid-cols-[1.2fr_1fr]"
    >
      <div class="space-y-4">
        <p
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-400"
        >
          Daily control center
        </p>
        <div class="space-y-2 mx-1">
          <h1 class="text-3xl font-black leading-tight text-white sm:text-4xl">
            Keep training and nutrition in the same rhythm.
          </h1>
          <p class="text-lg text-slate-300">
            Preview today's intent, check the last logged work, and line up the meals that will fuel
            the next session.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <RouterLink
            to="/workout"
            class="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-400/40 transition hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            Open workout view
          </RouterLink>
          <RouterLink
            to="/nutrition"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-white/40"
          >
            Review nutrition
          </RouterLink>
        </div>

        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div
            class="col-span-2 flex items-center justify-between rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4 sm:col-span-1"
          >
            <div>
              <p class="text-xs uppercase tracking-wide text-emerald-200">Your tracking streak</p>
              <p class="mt-1 text-3xl font-black text-white">
                {{ trackingStreakDays }} <span aria-hidden="true">🔥</span>
              </p>
            </div>
          </div>

          <div class="card-surface p-4 shadow-inner shadow-slate-950/30">
            <p class="text-xs uppercase tracking-wide text-slate-400">{{ sessionStat.label }}</p>
            <p class="mt-2 text-2xl font-black text-white">{{ sessionStat.value }}</p>
          </div>
          <div class="card-surface p-4 shadow-inner shadow-slate-950/30">
            <p class="text-xs uppercase tracking-wide text-slate-400">{{ mealStat.label }}</p>
            <p class="mt-2 text-2xl font-black text-white">{{ mealStat.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="space-y-4">
      <article class="card-surface p-5">
        <div class="flex items-center justify-between gap-2">
          <div>
            <p class="text-xs uppercase tracking-wide text-emerald-300">Upcoming focus</p>
            <h2 class="text-lg font-semibold text-white">{{ nextPlan?.title }}</h2>
            <p class="text-sm text-slate-400">{{ nextPlan?.exercises.length }} exercises on deck</p>
          </div>
          <RouterLink
            to="/workout"
            class="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70"
          >
            View plan
          </RouterLink>
        </div>
        <ul class="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-200">
          <li
            v-for="exercise in nextPlanPreview"
            :key="exercise.name"
            class="tile-surface flex flex-col gap-2 p-4"
          >
            <span class="font-semibold text-white">{{ exercise.name }}</span>
            <div class="flex items-center gap-2 text-slate-300">
              <span>{{ exercise.sets }} sets</span>
              <span class="text-slate-600">·</span>
              <span>{{ exercise.reps }} reps</span>
            </div>
          </li>
        </ul>
      </article>

      <article class="card-surface p-5">
        <div class="flex items-center justify-between gap-2">
          <div>
            <p class="text-xs uppercase tracking-wide text-emerald-300">Fuel snapshot</p>
            <h2 class="text-lg font-semibold text-white">{{ proteinTargetMessage }}</h2>
            <p class="text-sm text-slate-400">{{ macroCallout }}</p>
          </div>
          <RouterLink
            to="/nutrition"
            class="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 transition hover:-translate-y-0.5 hover:border-emerald-300/70"
          >
            Meal log
          </RouterLink>
        </div>
        <div class="mt-2 grid gap-3 grid-cols-3">
          <div
            v-for="macro in macroCards"
            :key="macro.label"
            class="flex flex-col items-center gap-1 pt-3 text-center text-sm text-slate-300"
          >
            <p class="text-xs uppercase tracking-wide text-slate-500">{{ macro.label }}</p>
            <div class="relative h-28 w-28">
              <svg class="h-full w-full -rotate-90" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="32" class="stroke-white/10" stroke-width="10" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  class="stroke-emerald-400"
                  stroke-width="10"
                  stroke-linecap="round"
                  :stroke-dasharray="macro.circumference"
                  :stroke-dashoffset="macro.strokeOffset"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <p class="text-lg font-bold text-white">{{ macro.displayValue }}</p>
                <p class="text-[11px] text-slate-500">/ {{ macro.goalLabel }}</p>
              </div>
            </div>
            <p class="text-xs text-slate-400">{{ macro.progress }}% to goal</p>
          </div>
        </div>
      </article>
    </div>

    <section class="grid gap-6 lg:grid-cols-2">
      <article class="space-y-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold text-white">Recovery &amp; Readiness</h2>
            <p class="text-sm text-slate-400">A daily sense-check before dialing up intensity.</p>
          </div>
          <RouterLink
            to="/session-history"
            class="text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:text-emerald-100"
          >
            Session feed
          </RouterLink>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div class="tile-surface space-y-3 p-4">
            <div
              class="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400"
            >
              <span>Sleep quality</span>
              <span class="text-emerald-300">Score {{ sleepQuality.score }}</span>
            </div>
            <div class="flex items-center text-3xl font-black text-white">
              <span>{{ sleepQuality.hours }}</span>
              <span class="text-xl font-semibold text-slate-300 mx-2">hrs</span>
            </div>
            <p class="text-xs text-slate-400">You are well rested!</p>
          </div>

          <div class="tile-surface space-y-3 p-4">
            <div
              class="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400"
            >
              <span>Muscle soreness</span>
              <span class="text-emerald-300">{{ sorenessLabel }}</span>
            </div>
            <div class="flex items-center gap-3">
              <input
                v-model.number="muscleSoreness"
                type="range"
                min="1"
                max="5"
                step="1"
                class="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-400"
              />
              <span class="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white">{{
                muscleSoreness
              }}</span>
            </div>
            <p class="text-xs text-slate-400">Move the slider to determine your soreness.</p>
          </div>
        </div>

        <div
          class="tile-surface flex flex-col gap-2 border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-3">
            <span
              class="inline-flex rounded-full bg-emerald-300/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-50"
            >
              {{ readinessRecommendation.label }}
            </span>
            <p class="font-semibold text-white">{{ readinessRecommendation.headline }}</p>
          </div>
          <p class="text-xs text-emerald-100/80">{{ readinessRecommendation.detail }}</p>
        </div>
      </article>

      <article class="space-y-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold text-white">Trend Insights (Weekly Snapshot)</h2>
            <p class="text-sm text-slate-400">
              Patterns across training and nutrition to steer the next block.
            </p>
          </div>
          <RouterLink
            to="/session-history"
            class="text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:text-emerald-100"
          >
            Session feed
          </RouterLink>
        </div>

        <div class="grid gap-3 md:grid-cols-2">
          <div class="tile-surface space-y-3 p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-wide text-emerald-300">Protein rhythm</p>
                <h3 class="text-sm font-semibold text-white">
                  Avg {{ proteinTrend.thisWeek }}g per day
                </h3>
              </div>
              <span
                class="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-100"
              >
                {{ proteinTrend.direction === 'up' ? '↗' : '↘' }}
                {{ formatNumber(Math.abs(proteinTrend.delta)) }}g vs last week
              </span>
            </div>
            <p class="text-xs text-slate-400">
              {{ proteinTrend.lastWeek }}g average last week · {{ proteinTrend.percentLabel }}% shift.
            </p>
          </div>

          <div class="tile-surface space-y-3 p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-wide text-emerald-300">Training consistency</p>
                <h3 class="text-sm font-semibold text-white">
                  {{ trainingTrend.thisWeek }} sessions this week
                </h3>
              </div>
              <span
                class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
              >
                {{ trainingTrend.icon }}
                {{ trainingTrend.deltaLabel }}
              </span>
            </div>
            <p class="text-xs text-slate-400">
              {{ trainingTrend.lastWeek }} logged last week · {{ trainingTrend.signal }} rhythm.
            </p>
          </div>

          <div class="tile-surface space-y-3 p-4 md:col-span-2">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-wide text-emerald-300">Calorie trend</p>
                <h3 class="text-sm font-semibold text-white">
                  {{ formatNumber(calorieSparkline.averageThisWeek) }} kcal daily avg
                </h3>
              </div>
              <span
                class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white"
                :class="calorieSparkline.direction === 'up' ? 'text-emerald-200' : 'text-amber-200'"
              >
                {{ calorieSparkline.direction === 'up' ? '↗' : '↘' }}
                {{ calorieSparkline.deltaLabel }}
              </span>
            </div>
            <div class="space-y-2">
              <svg viewBox="0 0 120 42" class="h-16 w-full text-emerald-300" role="img" aria-label="Weekly calorie sparkline">
                <polyline
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  :points="calorieSparkline.points"
                  class="drop-shadow-[0_8px_20px_rgba(16,185,129,0.35)]"
                />
              </svg>
              <p class="text-xs text-slate-400">
                {{ calorieSparkline.label }} Last week sat at {{ formatNumber(calorieSparkline.averageLastWeek) }} kcal.
              </p>
            </div>
          </div>

          <div class="tile-surface space-y-3 p-4 md:col-span-2">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-wide text-emerald-300">Strength momentum</p>
                <h3 class="text-sm font-semibold text-white">Key lifts moving up</h3>
              </div>
              <RouterLink
                to="/workout"
                class="text-[11px] font-semibold uppercase tracking-wide text-emerald-200 transition hover:text-emerald-100"
              >
                Workout view
              </RouterLink>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div
                v-for="lift in strengthTrends"
                :key="lift.lift"
                class="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4"
              >
                <div class="space-y-1">
                  <p class="text-sm font-semibold text-white">{{ lift.lift }}</p>
                  <p class="text-xs text-slate-400">{{ lift.detail }}</p>
                </div>
                <span
                  class="mt-1 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  :class="lift.direction === 'up' ? 'bg-emerald-400/10 text-emerald-200' : 'bg-amber-400/10 text-amber-200'"
                >
                  {{ lift.direction === 'up' ? '↗' : '↘' }}
                  {{ lift.delta }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import type { Plan } from '@/data/workoutRoutine'
import { workoutPlans } from '@/data/workoutRoutine'
import { useNutritionStore } from '@/stores/nutrition'
import { useSessionHistoryStore } from '@/stores/sessionHistory'
import { formatNumber, mealLogTotals } from '@/utils/nutrition'

const sessionHistoryStore = useSessionHistoryStore()

const nutritionStore = useNutritionStore()
const { recipes, mealLogs, ingredientMap } = storeToRefs(nutritionStore)

const rotationOrder: Plan['id'][] = ['push', 'pull', 'legs']

const historySessions = computed(() => sessionHistoryStore.records)

const nextPlan = computed<Plan | null>(() => {
  if (workoutPlans.length === 0) {
    return null
  }

  const lastRecordIndex = historySessions.value.length - 1
  const lastPlanId =
    lastRecordIndex >= 0 ? historySessions.value[lastRecordIndex]?.planId : undefined

  if (!lastPlanId) {
    return workoutPlans[0] ?? null
  }

  const currentIndex = rotationOrder.indexOf(lastPlanId)
  const nextPlanId =
    currentIndex === -1
      ? rotationOrder[0]
      : rotationOrder[(currentIndex + 1) % rotationOrder.length]

  const upcomingPlan = workoutPlans.find((plan) => plan.id === nextPlanId)
  return upcomingPlan ?? workoutPlans[0] ?? null
})

const nextPlanPreview = computed(() => nextPlan.value?.exercises ?? [])

const sleepQuality = ref({ hours: 7.8, score: 86 })
const muscleSoreness = ref(3)

const macroTargets = { protein: 190, carbs: 300, fat: 70 }

const mealLogDetails = computed(() =>
  mealLogs.value.map((entry) => ({
    entry,
    recipe: recipes.value.find((recipe) => recipe.id === entry.recipeId),
    totals: mealLogTotals(entry, recipes.value, ingredientMap.value),
  })),
)

const dailyTotals = computed(() => {
  return mealLogDetails.value.reduce(
    (accumulator, detail) => {
      if (!detail.totals) return accumulator
      accumulator.calories += detail.totals.calories
      accumulator.protein += detail.totals.protein
      accumulator.carbs += detail.totals.carbs
      accumulator.fat += detail.totals.fat
      accumulator.fiber += detail.totals.fiber
      accumulator.cost += detail.totals.cost
      return accumulator
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, cost: 0 },
  )
})

const progressRadius = 32
const circumference = 2 * Math.PI * progressRadius

const macroCards = computed(() => {
  const macros = [
    { label: 'Protein', value: dailyTotals.value.protein, goal: macroTargets.protein },
    { label: 'Carbs', value: dailyTotals.value.carbs, goal: macroTargets.carbs },
    { label: 'Fats', value: dailyTotals.value.fat, goal: macroTargets.fat },
  ]

  return macros.map((macro) => {
    const progressPercentage = macro.goal > 0 ? (macro.value / macro.goal) * 100 : 0
    const strokeProgress = Math.min(Math.max(progressPercentage / 100, 0), 1.5)
    const strokeOffset = circumference * (1 - strokeProgress)

    return {
      ...macro,
      displayValue: `${formatNumber(macro.value)}g`,
      goalLabel: `${macro.goal}g`,
      progress: Math.round(progressPercentage),
      circumference,
      strokeOffset,
    }
  })
})

const trackingStreakDays = computed(() => 9)

const sessionStat = computed(() => ({
  label: 'Sessions logged',
  value: sessionHistoryStore.totalEntries,
  context: 'From the new workout view',
}))

const mealStat = computed(() => ({
  label: 'Meals logged',
  value: mealLogs.value.length,
  context: 'Using the updated meal log',
}))

const proteinTargetMessage = computed(() => {
  const protein = dailyTotals.value.protein
  if (!protein) return 'Start the log with a protein-heavy meal.'
  if (protein >= macroTargets.protein) return 'Protein target cleared for today.'
  return `${formatNumber(protein)}g logged · ${formatNumber(macroTargets.protein - protein)}g to go`
})

const macroCallout = computed(
  () =>
    `${formatNumber(dailyTotals.value.calories)} kcal captured · ${formatNumber(dailyTotals.value.cost)} cost`,
)

const sorenessLabel = computed(() => {
  const labels = ['Minimal', 'Light', 'Noticeable', 'High', 'Severe']
  const index = Math.min(Math.max(muscleSoreness.value, 1), 5) - 1
  return labels[index]
})

const readinessRecommendation = computed(() => {
  const { score, hours } = sleepQuality.value
  const soreness = muscleSoreness.value

  if (score >= 85 && soreness <= 2 && hours >= 7) {
    return {
      label: 'Train hard',
      headline: 'Green lights across recovery markers.',
      detail: 'Prioritize compound lifts and higher volume while energy is high.',
    }
  }

  if (score >= 70 && soreness <= 3) {
    return {
      label: 'Moderate',
      headline: 'Stay on plan with mindful pacing.',
      detail: 'Keep rest tight and avoid all-out sets while muscle fatigue clears.',
    }
  }

  return {
    label: 'Deload',
    headline: 'Dial back intensity to recover fully.',
    detail: 'Swap to technique work, mobility, and easy cardio until soreness drops.',
  }
})

const average = (values: number[]) => (values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0)

const proteinTrend = computed(() => {
  const thisWeek = 184
  const lastWeek = 171
  const delta = thisWeek - lastWeek
  const percentChangeRaw = lastWeek ? Math.round((delta / lastWeek) * 100) : 0

  return {
    thisWeek,
    lastWeek,
    delta,
    direction: delta >= 0 ? 'up' : 'down',
    percentLabel: `${percentChangeRaw >= 0 ? '+' : '−'}${Math.abs(percentChangeRaw)}`,
  }
})

const trainingTrend = computed(() => {
  const thisWeek = 4
  const lastWeek = 3
  const delta = thisWeek - lastWeek

  return {
    thisWeek,
    lastWeek,
    delta,
    deltaLabel: `${delta >= 0 ? '+' : '−'}${Math.abs(delta)} vs last week`,
    icon: delta >= 0 ? '↗' : '↘',
    signal: delta >= 0 ? 'Building momentum' : 'Rebuild consistency',
  }
})

const calorieTrend = {
  thisWeek: [2320, 2475, 2410, 2520, 2600, 2380, 2450],
  lastWeek: [2210, 2300, 2285, 2350, 2400, 2260, 2325],
}

const calorieSparkline = computed(() => {
  const values = calorieTrend.thisWeek
  const max = Math.max(...values)
  const min = Math.min(...values)
  const height = 36
  const width = 120
  const range = max - min || 1
  const step = values.length > 1 ? width / (values.length - 1) : width
  const points = values
    .map((value, index) => {
      const normalized = (value - min) / range
      const y = height - normalized * height
      const x = index * step
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const averageThisWeek = average(values)
  const averageLastWeek = average(calorieTrend.lastWeek)
  const delta = averageThisWeek - averageLastWeek

  return {
    points,
    averageThisWeek,
    averageLastWeek,
    direction: delta >= 0 ? 'up' : 'down',
    deltaLabel: `${delta >= 0 ? '+' : '−'}${formatNumber(Math.abs(delta))} kcal`,
    label: 'Sparkline reflects the current 7-day run-rate.',
  }
})

const strengthTrends = [
  {
    lift: 'Barbell Bench Press',
    delta: '+2.5kg',
    detail: 'Settled at 4×10 @ 42.5kg with smoother lockouts.',
    direction: 'up' as const,
  },
  {
    lift: 'Back Squat',
    delta: '+5kg',
    detail: 'Heavier doubles moved to working weight without form drift.',
    direction: 'up' as const,
  },
  {
    lift: 'Romanian Deadlift',
    delta: '+4kg',
    detail: 'Hip hinge felt stronger; grip stayed consistent set to set.',
    direction: 'up' as const,
  },
  {
    lift: 'Weighted Pull-up',
    delta: '+1 rep',
    detail: 'Maintained tempo while adding a clean rep to top set.',
    direction: 'up' as const,
  },
]
</script>
