<template>
  <div class="space-y-4">
    <!-- Navigation buttons -->
    <div class="flex justify-between items-center">
      <RouterLink
        to="/nutrition"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        ← Back to nutrition
      </RouterLink>
      <RouterLink
        to="/ingredients"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        Ingredient book
      </RouterLink>
    </div>

    <!-- Header -->
    <header class="space-y-2 mx-4 mb-0">
      <h1 class="text-3xl font-bold text-white">Recipe book</h1>
      <p class="max-w-2xl text-sm text-slate-400">
        Dial in your fueling plan by filtering meals around the primary ingredient you have on hand and the intent driving your
        training block.
      </p>
    </header>

    <div class="flex justify-end px-2">
      <button
        type="button"
        class="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:text-emerald-100"
        @click="openNewRecipeForm"
      >
        Add recipe
      </button>
    </div>

    <section
      v-if="showNewRecipeForm"
      class="panel-surface space-y-4"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="space-y-1">
          <p class="text-xs font-semibold uppercase tracking-wide text-emerald-200">Create a recipe</p>
          <h2 class="text-lg font-semibold text-white">Add a new recipe from your ingredient list</h2>
        </div>
      </div>

      <form class="space-y-4" @submit.prevent="saveRecipe">
        <div class="grid gap-4 md:grid-cols-[2fr,1fr]">
          <label class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Recipe name
            <input
              v-model="newRecipe.name"
              class="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
              type="text"
              required
            />
          </label>
          <label class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Servings
            <input
              v-model.number="newRecipe.servings"
              class="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
              min="1"
              type="number"
            />
          </label>
        </div>

        <label class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Summary (optional)
          <textarea
            v-model="newRecipe.summary"
            class="min-h-20 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
            placeholder="What makes this recipe special?"
          />
        </label>

        <div class="space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 class="text-sm font-semibold text-white">Ingredients</h3>
              <p class="text-xs text-slate-400">Select items from your ingredient book and set quantities.</p>
            </div>
            <label class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              <span class="mx-1">Choose ingredient</span>
              <select
                v-model="selectedIngredientOption"
                class="min-w-60 rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                @change="addSelectedIngredient"
              >
                <option disabled value="">Add an ingredient</option>
                <option v-for="option in ingredientOptions" :key="option.id" :value="option.id">{{ option.name }}</option>
              </select>
            </label>
          </div>

          <div
            class="grid gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-slate-950/60 p-3"
            :class="newRecipe.ingredients.length ? 'border-emerald-400/40 bg-emerald-500/5' : ''"
          >
            <p
              v-if="!newRecipe.ingredients.length"
              class="text-center text-xs uppercase tracking-wide text-slate-500"
            >
              Add ingredients from the dropdown above.
            </p>
            <article
              v-for="(ingredient, index) in newRecipe.ingredients"
              :key="index"
              class="grid items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4 md:grid-cols-[1fr,160px,auto]"
            >
              <p class="text-sm font-semibold text-white">{{ ingredientName(ingredient.ingredientId) }}</p>

              <label class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <span class="mx-1">Quantity ({{ ingredientUnitLabel(ingredient.ingredientId) }})</span>
                <input
                  v-model.number="ingredient.quantity"
                  class="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                  min="0"
                  type="number"
                />
              </label>

              <button
                type="button"
                class="text-[11px] uppercase tracking-wide text-rose-300 transition hover:text-rose-200"
                @click="removeIngredientRow(index)"
              >
                Delete
              </button>
            </article>
          </div>
        </div>

        <div class="flex flex-wrap justify-between items-center gap-3">
          <button
            type="button"
            class="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:-translate-y-0.5 hover:border-rose-300/70 hover:text-rose-100"
            @click="closeNewRecipeForm"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-full border border-emerald-400/60 bg-emerald-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70"
          >
            Save recipe
          </button>
        </div>
      </form>
    </section>

    <section class="panel-surface space-y-6">
      <div class="flex flex-wrap items-start justify-between gap-6">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Recipe filter</h2>
          <p class="max-w-xl text-sm text-slate-400">
            Each recipe balances flavor and macros so you can stay on track whether you are pushing volume, rebuilding, or
            coasting on a rest day. Lock in an ingredient to see what fits.
          </p>
          <p class="text-xs uppercase tracking-wide text-emerald-200">{{ filteredRecipes.length }} recipes available</p>
        </div>
        <div class="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
          <div class="space-y-2 sm:w-1/2 lg:w-auto">
            <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-400">Main ingredient</h3>
            <div class="flex flex-wrap items-center gap-2">
              <button
                v-for="filter in visibleIngredientFilters"
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

              <button
                v-if="hiddenIngredientFiltersCount && !showAllIngredientFilters"
                type="button"
                class="rounded-full border border-white/15 bg-slate-950/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-white/30 hover:text-white"
                @click="showAllIngredientFilters = true"
              >
                ...
              </button>
              <button
                v-else-if="hiddenIngredientFiltersCount"
                type="button"
                class="rounded-full border border-white/15 bg-slate-950/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-white/30 hover:text-white"
                @click="showAllIngredientFilters = false"
              >
                ... Show less
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <!-- Recipes -->
        <article
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          class="card-surface flex flex-col gap-3 p-5 text-sm text-slate-300"
        >
          <button
            type="button"
            class="flex w-full items-start justify-between gap-3 text-left"
            :aria-expanded="isRecipeExpanded(recipe.id)"
            @click="toggleRecipe(recipe.id)"
          >
            <div class="space-y-1">
              <p class="text-xs uppercase tracking-wide text-emerald-300">
                {{ recipe.mainIngredient }}
              </p>
              <h3 class="text-lg font-semibold text-white">
                {{ recipe.name }}
              </h3>
            </div>

            <span
              aria-hidden="true"
              class="inline-flex h-8 w-8 items-center justify-center self-end rounded-full border border-white/10 bg-slate-900/70 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-white/30 hover:text-white transform"
              :class="{ 'rotate-180': isRecipeExpanded(recipe.id) }"
            >
              ▼
            </span>
            <span class="sr-only">Toggle recipe details</span>
          </button>

          <div v-if="isRecipeExpanded(recipe.id)" class="space-y-3">
            <p class="text-xs uppercase tracking-wide text-slate-500">Serves {{ recipe.servings }}</p>
            <p class="text-slate-400">{{ recipe.summary }}</p>
            <dl class="grid grid-cols-3 gap-2 text-xs text-slate-400">
              <div>
                <dt class="uppercase tracking-wide text-slate-500">Protein</dt>
                <dd class="text-base font-semibold text-white">{{ recipe.totals.protein.toFixed(0) }}g</dd>
              </div>
              <div>
                <dt class="uppercase tracking-wide text-slate-500">Carbs</dt>
                <dd class="text-base font-semibold text-white">{{ recipe.totals.carbs.toFixed(0) }}g</dd>
              </div>
              <div>
                <dt class="uppercase tracking-wide text-slate-500">Fat</dt>
                <dd class="text-base font-semibold text-white">{{ recipe.totals.fat.toFixed(0) }}g</dd>
              </div>
            </dl>
            <dl class="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div class="rounded-xl border border-white/5 bg-slate-900/60 p-3">
                <dt class="uppercase tracking-wide text-slate-500">Calories</dt>
                <dd class="text-base text-slate-300">{{ recipe.totals.calories.toFixed(0) }}</dd>
              </div>
              <div class="rounded-xl border border-white/5 bg-slate-900/60 p-3">
                <dt class="uppercase tracking-wide text-slate-500">Cost</dt>
                <dd class="text-base text-slate-300">${{ recipe.totals.cost.toFixed(2) }}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import type { RecipeIngredient } from '@/types/nutrition'
import { useNutritionStore } from '@/stores/nutrition'

type IngredientFilterOption = 'All' | string

const nutritionStore = useNutritionStore()
const { ingredients, recipeSummaries } = storeToRefs(nutritionStore)

const selectedIngredient = ref<IngredientFilterOption>('All')
const showNewRecipeForm = ref(false)
const selectedIngredientOption = ref('')
const showAllIngredientFilters = ref(false)
const maxVisibleIngredientFilters = 4
const expandedRecipes = reactive<Record<string, boolean>>({})

const newRecipe = reactive<{ name: string; servings: number; summary: string; ingredients: RecipeIngredient[] }>({
  name: '',
  servings: 2,
  summary: '',
  ingredients: [],
})

const ingredientOptions = computed(() => ingredients.value.map((ingredient) => ({ id: ingredient.id, name: ingredient.name })))

const recipeCards = computed(() =>
  recipeSummaries.value.map(({ recipe, totals }) => {
    const recipeIngredientIds = recipe.ingredients.map((ingredient) => ingredient.ingredientId)
    const mainIngredient = ingredients.value.find((item) => item.id === recipeIngredientIds[0])

    return {
      id: recipe.id,
      name: recipe.name,
      servings: recipe.servings,
      summary: recipe.summary ?? 'Protein-forward prep built from your book.',
      mainIngredient: mainIngredient?.name ?? 'Uncategorized',
      ingredientIds: recipeIngredientIds,
      totals,
    }
  })
)

const ingredientFilters = computed(() => [
  { label: 'All ingredients', value: 'All' as IngredientFilterOption },
  ...[...ingredients.value]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((ingredient) => ({ label: ingredient.name, value: ingredient.id as IngredientFilterOption })),
])

const hiddenIngredientFiltersCount = computed(() =>
  Math.max(0, ingredientFilters.value.length - maxVisibleIngredientFilters)
)

const visibleIngredientFilters = computed(() =>
  showAllIngredientFilters.value
    ? ingredientFilters.value
    : ingredientFilters.value.slice(0, maxVisibleIngredientFilters)
)

const filteredRecipes = computed(() =>
  recipeCards.value.filter(
    (recipe) =>
      selectedIngredient.value === 'All' ||
      recipe.ingredientIds.some((ingredientId) => ingredientId === selectedIngredient.value)
  )
)

const toggleRecipe = (id: string) => {
  expandedRecipes[id] = !expandedRecipes[id]
}

const isRecipeExpanded = (id: string) => Boolean(expandedRecipes[id])

const resetForm = () => {
  newRecipe.name = ''
  newRecipe.servings = 1
  newRecipe.summary = ''
  newRecipe.ingredients = []
  selectedIngredientOption.value = ''
}

const openNewRecipeForm = () => {
  showNewRecipeForm.value = true
}

const closeNewRecipeForm = () => {
  resetForm()
  showNewRecipeForm.value = false
}

const removeIngredientRow = (index: number) => {
  newRecipe.ingredients.splice(index, 1)
}

const ingredientName = (ingredientId: string) => ingredients.value.find((item) => item.id === ingredientId)?.name ?? 'Ingredient'

const addSelectedIngredient = () => {
  if (!selectedIngredientOption.value) return

  newRecipe.ingredients.push({ ingredientId: selectedIngredientOption.value, quantity: 0 })
  selectedIngredientOption.value = ''
}

const ingredientUnitLabel = (ingredientId: string) => {
  const ingredient = ingredients.value.find((item) => item.id === ingredientId)
  return ingredient?.unit ?? 'g'
}

const saveRecipe = () => {
  const trimmedName = newRecipe.name.trim()
  if (!trimmedName || !newRecipe.ingredients.length) return

  const cleanedIngredients = newRecipe.ingredients
    .filter((item) => item.ingredientId && item.quantity > 0)
    .map((item) => ({
      ingredientId: item.ingredientId,
      quantity: item.quantity,
    }))

  if (!cleanedIngredients.length) return

  nutritionStore.addRecipe({
    name: trimmedName,
    servings: newRecipe.servings > 0 ? newRecipe.servings : 1,
    summary: newRecipe.summary.trim() || undefined,
    ingredients: cleanedIngredients,
  })

  closeNewRecipeForm()
}
</script>
