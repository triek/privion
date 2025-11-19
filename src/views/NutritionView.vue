<template>
  <div class="space-y-6">
    <!-- Nutrition banner -->
    <header class="flex flex-col mx-4 gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Nutrition</h1>
        <p class="text-sm text-slate-400">
          Plan meals from your recipe book and keep a running log of the food fueling your training.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-3"></div>
    </header>

    <section class="grid gap-6">
      <!-- Daily plate -->
      <article class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
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
        <div class="grid gap-4 sm:grid-cols-3">
          <div
            v-for="macro in macroCards"
            :key="macro.label"
            class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300"
          >
            <p class="text-xs uppercase text-slate-400">{{ macro.label }}</p>
            <p class="mt-1 text-3xl font-black text-white">{{ macro.value }}</p>
            <p class="mt-1 text-xs text-slate-500">Goal: {{ macro.goal }}</p>
          </div>
        </div>
        <p
          class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-100"
        >
          {{ proteinTargetMessage }}
        </p>
      </article>

      <!-- Today's lineup -->
      <article class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Today&apos;s lineup</h2>
          <p class="text-sm text-slate-400">Pick meals to lock in for today&apos;s plan.</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <div
            v-for="(slot, index) in plannedMealDetails"
            :key="index"
            class="flex min-h-[140px] flex-col justify-between rounded-2xl border-2 border-dashed border-white/15 bg-slate-950/60 p-4 text-sm"
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
          <div class="grid gap-3 md:grid-cols-2">
            <button
              v-for="item in recipeSummaries"
              :key="item.recipe.id"
              type="button"
              class="flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-left text-sm text-slate-300 transition hover:border-emerald-300/60 hover:text-emerald-100"
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
import { computed, ref } from 'vue'
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

const plannedMeals = ref<(string | null)[]>([null, null, null])

const plannedMealDetails = computed(() =>
  plannedMeals.value.map((id) => recipeSummaries.value.find((item) => item.recipe.id === id) ?? null)
)

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
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, cost: 0 }
  )
})

const macroCards = computed(() => [
  {
    label: 'Protein',
    value: `${formatNumber(dailyTotals.value.protein)}g`,
    goal: `${macroTargets.protein}g`,
  },
  {
    label: 'Carbs',
    value: `${formatNumber(dailyTotals.value.carbs)}g`,
    goal: `${macroTargets.carbs}g`,
  },
  {
    label: 'Fats',
    value: `${formatNumber(dailyTotals.value.fat)}g`,
    goal: `${macroTargets.fat}g`,
  },
])

const proteinTargetMessage = computed(() => {
  if (!mealLogDetails.value.length) {
    return 'Log a meal to see how it powers your goals.'
  }

  const contributions = new Map<MealLogEntry['mealType'], number>()
  mealLogDetails.value.forEach((detail) => {
    if (!detail.totals) return
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
