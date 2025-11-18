<template>
  <div class="space-y-12">
    <header class="space-y-3">
      <RouterLink
        to="/nutrition"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        ← Back to nutrition
      </RouterLink>
      <h1 class="text-3xl font-bold text-white">Ingredient book</h1>
      <p class="max-w-2xl text-sm text-slate-400">Quickly stash simple ingredients to reuse across your training meals.</p>
    </header>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div class="space-y-6">
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
              <dl class="grid grid-cols-3 gap-2 text-xs text-slate-400">
                <div>
                  <dt class="uppercase tracking-wide text-slate-500">Protein</dt>
                  <dd class="text-base font-semibold text-white">{{ ingredient.stats.protein }}</dd>
                </div>
                <div>
                  <dt class="uppercase tracking-wide text-slate-500">Carbs</dt>
                  <dd class="text-base font-semibold text-white">{{ ingredient.stats.carbs }}</dd>
                </div>
                <div>
                  <dt class="uppercase tracking-wide text-slate-500">Fiber</dt>
                  <dd class="text-base font-semibold text-white">{{ ingredient.stats.fiber }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>

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
          <div class="grid grid-cols-3 gap-3">
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
              <span class="text-xs uppercase tracking-wide text-slate-400">Fiber (g)</span>
              <input
                v-model="newIngredient.fiber"
                type="number"
                min="0"
                class="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
              />
            </label>
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

const ingredients = ref<IngredientCardData[]>([...ingredientLibrary])

const categoryFilters: { label: string; value: CategoryFilterOption }[] = [
  { label: 'All ingredients', value: 'All' },
  { label: 'Protein', value: 'Protein' },
  { label: 'Carbs', value: 'Carbs' },
  { label: 'Fiber', value: 'Fiber' },
  { label: 'Spices', value: 'Spices' },
]

const selectedCategory = ref<CategoryFilterOption>('All')

const categorySelectOptions = categoryFilters.filter((filter) => filter.value !== 'All') as {
  label: string
  value: IngredientCategory
}[]

const filteredIngredients = computed(() =>
  ingredients.value.filter((ingredient) => selectedCategory.value === 'All' || ingredient.category === selectedCategory.value)
)

const newIngredient = reactive({
  name: '',
  category: 'Protein' as IngredientCategory,
  protein: '',
  carbs: '',
  fiber: '',
})

const formError = ref('')

const formatStat = (value: string) => {
  const numeric = Number(value)
  if (Number.isNaN(numeric) || numeric < 0) return null
  return `${numeric}g`
}

const resetForm = () => {
  newIngredient.name = ''
  newIngredient.category = 'Protein'
  newIngredient.protein = ''
  newIngredient.carbs = ''
  newIngredient.fiber = ''
  formError.value = ''
}

const addIngredient = () => {
  const protein = formatStat(newIngredient.protein)
  const carbs = formatStat(newIngredient.carbs)
  const fiber = formatStat(newIngredient.fiber)

  if (!newIngredient.name.trim()) {
    formError.value = 'Name is required.'
    return
  }

  if (!protein || !carbs || !fiber) {
    formError.value = 'Provide valid macro values.'
    return
  }

  const payload: IngredientCardData = {
    name: newIngredient.name.trim(),
    category: newIngredient.category,
    stats: {
      protein,
      carbs,
      fiber,
    },
  }

  ingredients.value.unshift(payload)
  resetForm()
}
</script>
