<template>
  <div class="space-y-12">
    <header class="space-y-3">
      <RouterLink
        to="/nutrition"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        ← Back to nutrition
      </RouterLink>

      <!-- Header -->
      <h1 class="text-3xl font-bold text-white">Ingredient book</h1>
      <p class="max-w-2xl text-sm text-slate-400">Quickly stash simple ingredients to reuse across your training meals.</p>
    </header>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div class="space-y-6">
          <!-- Ingredient filter -->
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="space-y-1">
              <h2 class="text-lg font-semibold text-white">Ingredient filter</h2>
              <p class="text-xs uppercase tracking-wide text-emerald-200">{{ filteredIngredients.length }} ingredients available</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="filter in categoryFilters"
                :key="filter.value"
                type="button"
                class="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition"
                :class="
                  selectedCategory === filter.value
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                    : 'border-white/15 bg-slate-950/60 text-slate-300 hover:border-white/30 hover:text-white'
                "
                @click="selectedCategory = filter.value"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>

          <!-- Macro visibility -->
          <div class="space-y-2 rounded-2xl border border-white/5 bg-slate-950/60 p-4">
            <div class="flex items-center justify-between gap-3">
              <div class="space-y-0.5">
                <p class="text-xs uppercase tracking-wide text-slate-400">Macro visibility</p>
                <p class="text-sm text-slate-300">Toggle which stats appear on the ingredient cards.</p>
              </div>
              <p class="text-xs uppercase tracking-wide text-emerald-200">
                {{ visibleMacroOptions.length }} shown
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="macro in macroOptions"
                :key="macro.key"
                class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 shadow-sm shadow-slate-950/40 transition hover:border-white/30"
              >
                <div class="relative">
                  <input
                    v-model="macroVisibility[macro.key]"
                    type="checkbox"
                    class="peer h-4 w-4 appearance-none rounded-full border border-white/30 bg-slate-950 transition
                          focus:outline-none focus:ring-emerald-400"
                  />
                  <span
                    class="pointer-events-none absolute h-4 w-4 left-0 top-0 after:absolute after:h-2 after:w-2 after:rounded-full after:bg-emerald-400 after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:transition-transform peer-checked:after:scale-100"
                  ></span>
                </div>
                <span>{{ macro.label }}</span>
              </label>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="ingredient in filteredIngredients"
              :key="ingredient.name"
              class="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300"
            >
              <div class="flex items-start justify-between gap-2">
                <div class="space-y-1">
                  <p class="text-xs uppercase tracking-wide text-emerald-300">{{ ingredient.category }}</p>
                  <h3 class="text-lg font-semibold text-white">{{ ingredient.name }}</h3>
                </div>
              </div>
              <dl class="grid grid-cols-2 gap-2 text-xs text-slate-400 sm:grid-cols-3">
                <div
                  v-for="macro in visibleMacrosByIngredient[ingredient.name]"
                  :key="macro.key"
                  class="rounded-xl border border-white/5 bg-slate-900/60 p-3"
                >
                  <dt class="uppercase tracking-wide text-slate-500">{{ macro.label }}</dt>
                  <dd class="text-base font-semibold text-white">{{ ingredient.stats[macro.key] }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>

        <!-- Add ingredient -->
        <form class="space-y-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5" @submit.prevent="addIngredient">
          <div class="space-y-1">
            <p class="text-xs uppercase tracking-wide text-slate-400">Add ingredient</p>
            <p class="text-sm text-slate-300">Keep the essentials: tag, name, and core macro stats.</p>
          </div>
          <label class="text-sm">
            <span class="text-xs uppercase tracking-wide text-slate-400">Ingredient name</span>
            <input
              v-model="newIngredient.name"
              type="text"
              class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              required
            />
          </label>
          <label class="text-sm">
            <span class="text-xs uppercase tracking-wide text-slate-400">Tag</span>
            <select
              v-model="newIngredient.category"
              class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
            >
              <option v-for="filter in categorySelectOptions" :key="filter.value" :value="filter.value">
                {{ filter.label }}
              </option>
            </select>
          </label>
          <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
            <label class="text-sm">
              <span class="text-xs uppercase tracking-wide text-slate-400">Protein (g)</span>
              <input
                v-model="newIngredient.protein"
                type="number"
                min="0"
                class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
            </label>
            <label class="text-sm">
              <span class="text-xs uppercase tracking-wide text-slate-400">Carbs (g)</span>
              <input
                v-model="newIngredient.carbs"
                type="number"
                min="0"
              class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
            />
          </label>
            <label class="text-sm">
              <span class="text-xs uppercase tracking-wide text-slate-400">Fat (g)</span>
              <input
                v-model="newIngredient.fat"
                type="number"
                min="0"
                class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
            </label>
            <label class="text-sm">
              <span class="text-xs uppercase tracking-wide text-slate-400">Fiber (g)</span>
              <input
                v-model="newIngredient.fiber"
                type="number"
                min="0"
                class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
            </label>
          </div>

          <div class="space-y-3 rounded-xl border border-white/10 bg-slate-900/50 p-3">
            <p class="text-xs uppercase tracking-wide text-slate-400">Optional macros</p>
            <div class="grid grid-cols-2 gap-3 md:grid-cols-3">
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Calories (kcal)</span>
                <input
                  v-model="newIngredient.calories"
                  type="number"
                  min="0"
                  class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                />
              </label>
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Sugars (g)</span>
                <input
                  v-model="newIngredient.sugars"
                  type="number"
                  min="0"
                  class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                />
              </label>
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Saturated fat (g)</span>
                <input
                  v-model="newIngredient.saturatedFat"
                  type="number"
                  min="0"
                  class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                />
              </label>
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Sodium (mg)</span>
                <input
                  v-model="newIngredient.sodium"
                  type="number"
                  min="0"
                  class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                />
              </label>
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Cost per 100g ($)</span>
                <input
                  v-model="newIngredient.costPer100g"
                  type="number"
                  min="0"
                  step="0.01"
                  class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                />
              </label>
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Other</span>
                <input
                  v-model="newIngredient.other"
                  type="text"
                  placeholder="e.g., Omega-3 rich"
                  class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                />
              </label>
            </div>
          </div>
          <p v-if="formError" class="text-xs text-rose-300">{{ formError }}</p>
          <button
            type="submit"
            class="w-full rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            Save ingredient
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { ingredientLibrary, type IngredientCardData, type IngredientCategory } from '@/data/ingredients'

type CategoryFilterOption = 'All' | IngredientCategory
type MacroKey = keyof IngredientCardData['stats']
type MacroOption = { key: MacroKey; label: string; defaultChecked?: boolean }

const ingredients = ref<IngredientCardData[]>([...ingredientLibrary])

const categoryFilters: { label: string; value: CategoryFilterOption }[] = [
  { label: 'All ingredients', value: 'All' },
  { label: 'Protein', value: 'Protein' },
  { label: 'Carbs', value: 'Carbs' },
  { label: 'Fiber', value: 'Fiber' },
  { label: 'Spices', value: 'Spices' },
]

const macroOptions: MacroOption[] = [
  { key: 'protein', label: 'Protein', defaultChecked: true },
  { key: 'carbs', label: 'Carbs', defaultChecked: true },
  { key: 'fat', label: 'Fat', defaultChecked: true },
  { key: 'fiber', label: 'Fiber', defaultChecked: true },
  { key: 'calories', label: 'Calories' },
  { key: 'sugars', label: 'Sugars' },
  { key: 'saturatedFat', label: 'Saturated fat' },
  { key: 'sodium', label: 'Sodium' },
  { key: 'costPer100g', label: 'Cost per 100g' },
  { key: 'other', label: 'Other' },
]

const selectedCategory = ref<CategoryFilterOption>('All')

const macroVisibility = reactive<Record<MacroKey, boolean>>(
  macroOptions.reduce(
    (acc, option) => ({
      ...acc,
      [option.key]: Boolean(option.defaultChecked),
    }),
    {} as Record<MacroKey, boolean>
  )
)

const categorySelectOptions = categoryFilters.filter((filter) => filter.value !== 'All') as {
  label: string
  value: IngredientCategory
}[]

const filteredIngredients = computed(() =>
  ingredients.value.filter((ingredient) => selectedCategory.value === 'All' || ingredient.category === selectedCategory.value)
)

const visibleMacroOptions = computed(() => macroOptions.filter((option) => macroVisibility[option.key]))

const visibleMacrosByIngredient = computed<Record<string, MacroOption[]>>(() =>
  ingredients.value.reduce((acc, ingredient) => {
    acc[ingredient.name] = visibleMacroOptions.value.filter((option) => Boolean(ingredient.stats[option.key]))
    return acc
  }, {} as Record<string, MacroOption[]>)
)

const newIngredient = reactive({
  name: '',
  category: 'Protein' as IngredientCategory,
  protein: '',
  carbs: '',
  fat: '',
  fiber: '',
  calories: '',
  sugars: '',
  saturatedFat: '',
  sodium: '',
  costPer100g: '',
  other: '',
})

const formError = ref('')

const formatStat = (value: string, unit: string, formatter?: (numeric: number) => string) => {
  const numeric = Number(value)
  if (Number.isNaN(numeric) || numeric < 0) return null
  return formatter ? formatter(numeric) : `${numeric}${unit}`
}

const resetForm = () => {
  newIngredient.name = ''
  newIngredient.category = 'Protein'
  newIngredient.protein = ''
  newIngredient.carbs = ''
  newIngredient.fat = ''
  newIngredient.fiber = ''
  newIngredient.calories = ''
  newIngredient.sugars = ''
  newIngredient.saturatedFat = ''
  newIngredient.sodium = ''
  newIngredient.costPer100g = ''
  newIngredient.other = ''
  formError.value = ''
}

const addIngredient = () => {
  const protein = formatStat(newIngredient.protein, 'g')
  const carbs = formatStat(newIngredient.carbs, 'g')
  const fat = formatStat(newIngredient.fat, 'g')
  const fiber = formatStat(newIngredient.fiber, 'g')
  const calories = newIngredient.calories ? formatStat(newIngredient.calories, 'kcal') : undefined
  const sugars = newIngredient.sugars ? formatStat(newIngredient.sugars, 'g') : undefined
  const saturatedFat = newIngredient.saturatedFat ? formatStat(newIngredient.saturatedFat, 'g') : undefined
  const sodium = newIngredient.sodium ? formatStat(newIngredient.sodium, 'mg') : undefined
  const costPer100g = newIngredient.costPer100g
    ? formatStat(newIngredient.costPer100g, '', (value) => `$${value.toFixed(2)}`)
    : undefined
  const other = newIngredient.other.trim() || undefined

  if (!newIngredient.name.trim()) {
    formError.value = 'Name is required.'
    return
  }

  if (!protein || !carbs || !fat || !fiber) {
    formError.value = 'Provide valid macro values.'
    return
  }

  const stats: IngredientCardData['stats'] = {
    protein,
    carbs,
    fat,
    fiber,
  }

  if (calories) stats.calories = calories
  if (sugars) stats.sugars = sugars
  if (saturatedFat) stats.saturatedFat = saturatedFat
  if (sodium) stats.sodium = sodium
  if (costPer100g) stats.costPer100g = costPer100g
  if (other) stats.other = other

  const payload: IngredientCardData = {
    name: newIngredient.name.trim(),
    category: newIngredient.category,
    stats,
  }

  ingredients.value.unshift(payload)
  resetForm()
}
</script>
