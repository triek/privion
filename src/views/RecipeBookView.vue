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
        <h1 class="text-3xl font-bold text-white">Performance recipe book</h1>
        <p class="max-w-2xl text-sm text-slate-400">
          Dial in your fueling plan by filtering meals around the primary ingredient you have on hand and the intent driving your
          training block.
        </p>
      </div>
    </header>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-wrap items-start justify-between gap-6">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Recipe filter</h2>
          <p class="max-w-xl text-sm text-slate-400">
            Each recipe balances flavor and macros so you can stay on track whether you are pushing volume, rebuilding, or
            coasting on a rest day. Lock in an ingredient and intent to see what fits.
          </p>
          <p class="text-xs uppercase tracking-wide text-emerald-200">{{ filteredRecipes.length }} recipes available</p>
        </div>
        <div class="flex w-full flex-col gap-4 sm:flex-row sm:justify-end">
          <div class="space-y-2 sm:w-1/2 lg:w-auto">
            <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-400">Main ingredient</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="filter in ingredientFilters"
                :key="filter.value"
                type="button"
                class="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition"
                :class="
                  selectedIngredient === filter.value
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                    : 'border-white/15 bg-slate-950/60 text-slate-300 hover:border-white/30 hover:text-white'
                "
                @click="selectedIngredient = filter.value"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>
          <div class="space-y-2 sm:w-1/2 lg:w-auto">
            <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-400">Intent</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="filter in intentFilters"
                :key="filter.value"
                type="button"
                class="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition"
                :class="
                  selectedIntent === filter.value
                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                    : 'border-white/15 bg-slate-950/60 text-slate-300 hover:border-white/30 hover:text-white'
                "
                @click="selectedIntent = filter.value"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="recipe in filteredRecipes"
          :key="recipe.name"
          class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300"
        >
          <header class="space-y-2">
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ recipe.mainIngredient }}</p>
            <h3 class="text-lg font-semibold text-white">{{ recipe.name }}</h3>
            <p class="text-xs uppercase tracking-wide text-slate-500">Intent: {{ recipe.intent }} · Cook time: {{ recipe.cookTime }} · Serves {{ recipe.servings }}</p>
          </header>
          <p class="text-slate-400">{{ recipe.description }}</p>
          <dl class="grid grid-cols-3 gap-2 text-xs text-slate-400">
            <div>
              <dt class="uppercase tracking-wide text-slate-500">Protein</dt>
              <dd class="text-base font-semibold text-white">{{ recipe.macros.protein }}g</dd>
            </div>
            <div>
              <dt class="uppercase tracking-wide text-slate-500">Carbs</dt>
              <dd class="text-base font-semibold text-white">{{ recipe.macros.carbs }}g</dd>
            </div>
            <div>
              <dt class="uppercase tracking-wide text-slate-500">Fat</dt>
              <dd class="text-base font-semibold text-white">{{ recipe.macros.fat }}g</dd>
            </div>
          </dl>
          <ul class="space-y-1 text-xs text-slate-400">
            <li v-for="highlight in recipe.highlights" :key="highlight" class="flex items-start gap-2">
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

import { performanceRecipes, type MainIngredient, type RecipeCardData, type RecipeIntent } from '@/data/recipes'

type IngredientFilterOption = 'All' | MainIngredient

type IntentFilterOption = 'All' | RecipeIntent

const recipes: RecipeCardData[] = performanceRecipes

const ingredientOptions = [...new Set(recipes.map((recipe) => recipe.mainIngredient))] as MainIngredient[]
const intentOptions = [...new Set(recipes.map((recipe) => recipe.intent))] as RecipeIntent[]

const ingredientFilters: { label: string; value: IngredientFilterOption }[] = [
  { label: 'All ingredients', value: 'All' },
  ...ingredientOptions.map((ingredient) => ({ label: ingredient, value: ingredient })),
]

const intentFilters: { label: string; value: IntentFilterOption }[] = [
  { label: 'All intents', value: 'All' },
  ...intentOptions.map((intent) => ({ label: intent, value: intent })),
]

const selectedIngredient = ref<IngredientFilterOption>('All')
const selectedIntent = ref<IntentFilterOption>('All')

const filteredRecipes = computed(() =>
  recipes.filter(
    (recipe) =>
      (selectedIngredient.value === 'All' || recipe.mainIngredient === selectedIngredient.value) &&
      (selectedIntent.value === 'All' || recipe.intent === selectedIntent.value)
  )
)
</script>
