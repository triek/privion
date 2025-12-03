<template>
  <div class="space-y-6">
    <!-- Nutrition banner -->
    <header class="flex mx-4 justify-between mb-2">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-white">Nutrition</h1>
      </div>

      <RouterLink
        to="/recipes"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        Recipe book
      </RouterLink>
    </header>
    <p class="text-sm text-slate-300 mx-4">
      Plan meals from your recipe book and keep a running log of the food fueling your training.
    </p>

    <section class="grid gap-4">
      <!-- Daily plate -->
      <article class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold text-white">Daily plate</h2>
            <p class="text-sm text-slate-400">Live totals from today&apos;s meal log.</p>
          </div>
          <div class="flex items-center gap-4 text-xs uppercase text-slate-400">
            <div class="flex items-center gap-2">
              <span class="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>Consumed</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-block h-2 w-2 rounded-full bg-white/30"></span>
              <span>Target</span>
            </div>
          </div>
        </div>
      </article>

      <div class="relative">
        <div ref="macrosAnchor" class="absolute -top-6 h-1 w-full"></div>
        <transition name="fade">
          <div
            v-if="showStickyMacros"
            class="fixed inset-x-0 top-20 z-20 border-b border-white/5 bg-slate-900/90 px-4 backdrop-blur"
          >
            <div class="mx-auto max-w-6xl grid grid-cols-3 gap-2">
              <div
                v-for="macro in macroCards"
                :key="macro.label"
                class="p-2 text-[11px] text-slate-300"
              >
                <div class="flex items-center justify-center gap-3">
                  <div class="relative h-28 w-28">
                    <svg class="h-full w-full -rotate-90" viewBox="0 0 80 80" fill="none">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        class="stroke-white/10"
                        stroke-width="10"
                      />
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
                    <div class="absolute inset-0 flex flex-row items-center justify-center gap-1">
                      <div>
                        <p class="flex justify-center text-sm font-semibold uppercase text-emerald-100">{{ macro.label }}</p>
                        <p class="flex justify-center text-xs text-slate-300">{{ macro.value }}g</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <div ref="macroSection" class="grid grid-cols-3 gap-2">
          <div
            v-for="macro in macroCards"
            :key="macro.label"
            class="rounded-2xl border border-white/10 bg-slate-900/60 p-2 text-sm text-slate-300"
          >
            <p class="mt-1 flex justify-center text-md font-semibold uppercase text-slate-200">{{ macro.label }}</p>
            <div class="flex items-center justify-center gap-4">
              <div class="relative h-32 w-32">
                <svg class="h-full w-full -rotate-90" viewBox="0 0 80 80" fill="none">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    class="stroke-white/10"
                    stroke-width="10"
                  />
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
                <div class="absolute inset-0 flex flex-row items-center justify-center gap-1">
                  <div>
                    <p class="flex justify-center text-lg font-semibold text-white">{{ macro.value }}g</p>
                    <p class="flex justify-center text-xs text-slate-500">/{{ macro.goal }}g</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-100"
      >
        {{ proteinTargetMessage }}
      </p>

      <!-- Today's lineup -->
      <article class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <div class="flex justify-between mb-2">
          <!-- Header -->
          <div class="space-y-2">
            <h2 class="text-lg font-semibold text-white mt-1">Today&apos;s lineup</h2>
            <p class="text-sm text-slate-400">Pick the meals for today</p>
          </div>

          <RouterLink
            to="/recipes"
            class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
          >
            More recipes
          </RouterLink>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <div
            v-for="(slot, index) in plannedMealDetails"
            :key="index"
            class="flex min-h-[60px] flex-col justify-between rounded-2xl border-2 border-dashed border-white/15 bg-slate-950/60 p-4 text-sm"
            :class="slot ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-50' : 'text-slate-500'"
          >
            <div v-if="slot" class="space-y-2">
              <div class="flex items-start justify-between gap-2">
                <p class="text-base font-semibold text-white">{{ slot.recipe.name }}</p>
                <button
                  class="text-xs uppercase tracking-wide text-emerald-200"
                  type="button"
                  @click="clearPlannedMeal(index)"
                >
                  Remove
                </button>
              </div>
              <p class="text-xs text-emerald-100/80">
                {{ formatNumber(slot.perServing.protein) }}g protein ·
                {{ formatNumber(slot.perServing.carbs) }}g carbs ·
                {{ formatNumber(slot.perServing.fat) }}g fats
              </p>
            </div>
            <div v-else class="flex h-full items-center justify-center text-center text-xs uppercase tracking-wide">
              Tap a meal card to add it here.
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-400">Available meals</h3>
          <div class="grid gap-2 md:grid-cols-2">
            <button
              v-for="item in recipeSummaries"
              :key="item.recipe.id"
              type="button"
              class="tile-surface flex flex-col gap-2 p-4 text-left text-sm text-slate-300 transition hover:border-emerald-300/60 hover:text-emerald-100"
              :class="{
                'opacity-60 hover:border-white/10 hover:text-slate-300': planIsFull && !plannedMealCounts[item.recipe.id],
                'border-emerald-300/60 text-emerald-100': plannedMealCounts[item.recipe.id],
              }"
              :disabled="planIsFull && !plannedMealCounts[item.recipe.id]"
              @click="addPlannedMeal(item.recipe.id)"
            >
              <div class="flex items-center justify-between gap-2">
                <p class="font-semibold text-white">{{ item.recipe.name }}</p>
                <span
                  v-if="plannedMealCounts[item.recipe.id]"
                  class="text-xs uppercase tracking-wide text-emerald-300"
                >
                  Planned ×{{ plannedMealCounts[item.recipe.id] }}
                </span>
              </div>
              <p class="text-xs text-slate-400">
                {{ formatNumber(item.perServing.protein) }}g protein ·
                {{ formatNumber(item.perServing.carbs) }}g carbs ·
                {{ formatNumber(item.perServing.fat) }}g fats
              </p>
            </button>
          </div>
        </div>
      </article>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { MealLogEntry } from '@/types/nutrition'
import { useNutritionStore } from '@/stores/nutrition'
import { formatNumber, mealLogTotals } from '@/utils/nutrition'

const nutritionStore = useNutritionStore()
const { recipes, mealLogs, ingredientMap, recipeSummaries } = storeToRefs(nutritionStore)

const macroTargets = {
  protein: 190,
  carbs: 300,
  fat: 70,
}

const macrosAnchor = ref<HTMLElement | null>(null)
const macroSection = ref<HTMLElement | null>(null)
const showStickyMacros = ref(false)

const plannedMeals = ref<(string | null)[]>([null, null, null])

const plannedMealDetails = computed(() =>
  plannedMeals.value.map((id) => recipeSummaries.value.find((item) => item.recipe.id === id) ?? null)
)

// Meal count
const plannedMealCounts = computed<Record<string, number>>(() => {
  const counts: Record<string, number> = {}
  plannedMeals.value.forEach((id) => {
    if (!id) return
    counts[id] = (counts[id] ?? 0) + 1
  })
  return counts
})

const planIsFull = computed(() => plannedMeals.value.every((slot) => slot !== null))

const addPlannedMeal = (recipeId: string) => {
  if (planIsFull.value) return
  const emptyIndex = plannedMeals.value.findIndex((slot) => slot === null)
  if (emptyIndex === -1) return
  plannedMeals.value.splice(emptyIndex, 1, recipeId)
}

const clearPlannedMeal = (index: number) => {
  plannedMeals.value.splice(index, 1, null)
}

const mealLogDetails = computed(() =>
  mealLogs.value.map((entry) => ({
    entry,
    recipe: recipes.value.find((recipe) => recipe.id === entry.recipeId),
    totals: mealLogTotals(entry, recipes.value, ingredientMap.value),
  }))
)

const plannedTotals = computed(() =>
  plannedMealDetails.value.reduce(
    (accumulator, detail) => {
      if (!detail) return accumulator
      accumulator.calories += detail.perServing.calories
      accumulator.protein += detail.perServing.protein
      accumulator.carbs += detail.perServing.carbs
      accumulator.fat += detail.perServing.fat
      accumulator.fiber += detail.perServing.fiber
      accumulator.cost += detail.perServing.cost
      return accumulator
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, cost: 0 }
  )
)

const dailyTotals = computed(() => {
  const loggedTotals = mealLogDetails.value.reduce(
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
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, cost: 0 }
  )

  return {
    calories: loggedTotals.calories + plannedTotals.value.calories,
    protein: loggedTotals.protein + plannedTotals.value.protein,
    carbs: loggedTotals.carbs + plannedTotals.value.carbs,
    fat: loggedTotals.fat + plannedTotals.value.fat,
    fiber: loggedTotals.fiber + plannedTotals.value.fiber,
    cost: loggedTotals.cost + plannedTotals.value.cost,
  }
})

const progressRadius = 32
const circumference = 2 * Math.PI * progressRadius

let macrosObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!macrosAnchor.value) return

  macrosObserver = new IntersectionObserver(
    (entries) => {
      if (entries.length === 0) return
      showStickyMacros.value = !entries[0]!.isIntersecting
    },
    { threshold: [0, 1] }
  )

  macrosObserver.observe(macrosAnchor.value)
})

onBeforeUnmount(() => {
  macrosObserver?.disconnect()
})

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
      value: formatNumber(macro.value),
      goal: macro.goal,
      progress: Math.round(progressPercentage),
      circumference,
      strokeOffset,
    }
  })
})

const proteinTargetMessage = computed(() => {
  if (!mealLogDetails.value.length) {
    return 'Log a meal to see how it powers your goals.'
  }

  const contributions = new Map<MealLogEntry['mealType'], number>()
  mealLogDetails.value.forEach((detail) => {
    if (!detail.totals || !detail.entry) return
    contributions.set(
      detail.entry.mealType,
      (contributions.get(detail.entry.mealType) ?? 0) + detail.totals.protein
    )
  })

  if (!contributions.size || macroTargets.protein === 0) {
    return "You're on track! Keep fueling to hit your protein target."
  }

  const topEntry = [...contributions.entries()].sort((a, b) => b[1] - a[1])[0]
  if (!topEntry) {
    return "You're on track! Keep fueling to hit your protein target."
  }

  const [mealType, protein] = topEntry
  const percentage = Math.round((protein / macroTargets.protein) * 100)
  const clamped = Math.min(Math.max(percentage, 0), 150)
  return `You’re on track! ${mealType} covered ${clamped}% of your protein target.`
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
