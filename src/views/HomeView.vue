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
        <div class="space-y-2">
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
              <p class="text-sm text-slate-400">
                {{ nextPlan?.exercises.length }} exercises on deck
              </p>
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
          <div class="mt-4 grid gap-3 sm:grid-cols-3">
            <div
              v-for="macro in macroCards"
              :key="macro.label"
              class="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-center text-sm text-slate-300"
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
            <h2 class="text-lg font-semibold text-white">Recent workout momentum</h2>
            <p class="text-sm text-slate-400">Pulled directly from the session history feed.</p>
          </div>
          <RouterLink
            to="/session-history"
            class="text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:text-emerald-100"
          >
            Full history
          </RouterLink>
        </div>
        <ul class="space-y-3 text-sm text-slate-300">
          <li
            v-for="record in recentSessions"
            :key="record.session"
            class="tile-surface p-4"
          >
            <div class="flex items-center justify-between gap-2">
              <p class="font-semibold text-white">{{ record.session }}</p>
              <span class="text-xs uppercase tracking-wide text-slate-500"
                >{{ record.exercises.length }} movements</span
              >
            </div>
            <p class="mt-2 text-xs text-slate-400">{{ recordSummary(record) }}</p>
          </li>
        </ul>
      </article>

      <article class="space-y-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold text-white">Today&apos;s meal log</h2>
            <p class="text-sm text-slate-400">
              Meals recorded in the nutrition view, with per-serving macros.
            </p>
          </div>
          <RouterLink
            to="/recipes"
            class="text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:text-emerald-100"
          >
            Recipe book
          </RouterLink>
        </div>
        <ul class="space-y-3 text-sm text-slate-300">
          <li
            v-for="detail in todayMeals"
            :key="detail.entry.id"
            class="tile-surface p-4"
          >
            <div class="flex items-center justify-between gap-2">
              <p class="font-semibold text-white">
                {{ detail.recipe?.name ?? 'Unassigned recipe' }}
              </p>
              <span class="text-xs uppercase tracking-wide text-slate-500">{{
                detail.entry.mealType
              }}</span>
            </div>
            <p class="mt-2 text-xs text-slate-400">
              {{ formatNumber(detail.totals?.protein ?? 0) }}g protein ·
              {{ formatNumber(detail.totals?.carbs ?? 0) }}g carbs ·
              {{ formatNumber(detail.totals?.fat ?? 0) }}g fats
            </p>
            <p v-if="detail.entry.notes" class="mt-2 text-xs text-slate-500">
              {{ detail.entry.notes }}
            </p>
          </li>
        </ul>

        <div
          class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-emerald-100"
        >
          {{ macroProgressMessage }}
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import { workoutPlans } from '@/data/workoutRoutine'
import { useNutritionStore } from '@/stores/nutrition'
import { useSessionHistoryStore } from '@/stores/sessionHistory'
import { formatNumber, mealLogTotals } from '@/utils/nutrition'

const sessionHistoryStore = useSessionHistoryStore()
const { records } = storeToRefs(sessionHistoryStore)

const nutritionStore = useNutritionStore()
const { recipes, mealLogs, ingredientMap } = storeToRefs(nutritionStore)

const nextPlan = computed(() => workoutPlans[0])
const nextPlanPreview = computed(() => nextPlan.value?.exercises ?? [])

const recentSessions = computed(() => records.value.slice(-3).reverse())

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

const todayMeals = computed(() => mealLogDetails.value.slice(0, 3))

const macroProgressMessage = computed(() => {
  if (!dailyTotals.value.protein) return 'Log a meal to see your protein and carb run-rate.'
  const proteinGap = Math.max(macroTargets.protein - dailyTotals.value.protein, 0)
  const carbsGap = Math.max(macroTargets.carbs - dailyTotals.value.carbs, 0)
  return `Still ${formatNumber(proteinGap)}g protein and ${formatNumber(carbsGap)}g carbs from target.`
})

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

const recordSummary = (record: (typeof records.value)[number]) => {
  const mainLift = record.exercises[0]
  if (!mainLift) return 'No exercises recorded.'
  return `${mainLift.name} anchored the day with ${mainLift.setsCompleted}×${mainLift.reps}`
}
</script>
