<template>
  <div class="space-y-12">
    <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="space-y-3">
        <RouterLink
          to="/nutrition"
          class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
        >
          ← Back to nutrition
        </RouterLink>
        <h1 class="text-3xl font-bold text-white">Ingredient book</h1>
        <p class="max-w-2xl text-sm text-slate-400">
          Scan high-impact staples by macro focus to keep training meals balanced. Lock in a category to surface proteins,
          carbs, fiber leaders, or spice upgrades ready for your next block.
        </p>
      </div>
    </header>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-wrap items-start justify-between gap-6">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Ingredient filter</h2>
          <p class="max-w-xl text-sm text-slate-400">
            Zero in on the macro anchor you need. Filter to find proteins for recovery, carbs for fuel, fiber for digestion,
            or spices to layer flavor without extra calories.
          </p>
          <p class="text-xs uppercase tracking-wide text-emerald-200">{{ filteredIngredients.length }} ingredients available</p>
        </div>
        <div class="w-full space-y-4 sm:w-1/2 lg:w-auto">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-400">Category</h3>
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
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="ingredient in filteredIngredients"
          :key="ingredient.name"
          class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300"
        >
          <header class="space-y-2">
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ ingredient.category }}</p>
            <h3 class="text-lg font-semibold text-white">{{ ingredient.name }}</h3>
            <p class="text-xs uppercase tracking-wide text-slate-500">Form: {{ ingredient.form }} · Prep: {{ ingredient.prep }}</p>
          </header>
          <p class="text-slate-400">{{ ingredient.description }}</p>
          <dl class="grid grid-cols-3 gap-2 text-xs text-slate-400">
            <div>
              <dt class="uppercase tracking-wide text-slate-500">Protein</dt>
              <dd class="text-base font-semibold text-white">{{ ingredient.macros.protein }}</dd>
            </div>
            <div>
              <dt class="uppercase tracking-wide text-slate-500">Carbs</dt>
              <dd class="text-base font-semibold text-white">{{ ingredient.macros.carbs }}</dd>
            </div>
            <div>
              <dt class="uppercase tracking-wide text-slate-500">Fiber</dt>
              <dd class="text-base font-semibold text-white">{{ ingredient.macros.fiber }}</dd>
            </div>
          </dl>
          <ul class="space-y-1 text-xs text-slate-400">
            <li v-for="highlight in ingredient.highlights" :key="highlight" class="flex items-start gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { ingredientLibrary, type IngredientCardData, type IngredientCategory } from '@/data/ingredients'

type CategoryFilterOption = 'All' | IngredientCategory

const ingredients: IngredientCardData[] = ingredientLibrary

const categoryOptions = [...new Set(ingredients.map((ingredient) => ingredient.category))] as IngredientCategory[]

const categoryFilters: { label: string; value: CategoryFilterOption }[] = [
  { label: 'All ingredients', value: 'All' },
  ...categoryOptions.map((category) => ({ label: category, value: category })),
]

const selectedCategory = ref<CategoryFilterOption>('All')

const filteredIngredients = computed(() =>
  ingredients.filter((ingredient) => selectedCategory.value === 'All' || ingredient.category === selectedCategory.value)
)
</script>
