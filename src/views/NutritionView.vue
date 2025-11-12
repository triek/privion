<template>
  <div class="space-y-12">
    <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Nutrition system</h1>
        <p class="text-sm text-slate-400">
          Build ingredients, transform them into recipes, and keep a running log of the meals that fuel your training.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button
          class="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300"
          @click="isRecipeBuilderOpen = true"
        >
          Create recipe
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
          @click="isIngredientFormOpen = true"
        >
          Add ingredient
        </button>
      </div>
    </header>

    <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-50">
            <p class="text-xs uppercase text-emerald-200">Most logged recipe</p>
            <p class="mt-1 font-semibold text-white">{{ topRecipe?.recipe.name ?? 'Track meals to see insights' }}</p>
            <p v-if="topRecipe" class="mt-1 text-xs text-emerald-100/80">
              {{ formatNumber(topRecipe.totals.protein) }}g protein ·
              {{ formatNumber(topRecipe.totals.carbs) }}g carbs ·
              {{ formatNumber(topRecipe.totals.fat) }}g fats
            </p>
          </div>
          <div class="rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p class="text-xs uppercase text-slate-400">Estimated cost</p>
            <p class="mt-1 text-3xl font-black text-white">${{ formatNumber(dailyTotals.cost) }}</p>
            <p class="mt-1 text-xs text-slate-500">Across {{ mealLogDetails.length }} logged meals</p>
          </div>
        </div>
      </article>

      <article class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">Meal log</h2>
          <button class="text-xs font-semibold uppercase tracking-wide text-emerald-300" @click="isMealLogFormOpen = true">
            Add entry
          </button>
        </div>
        <ul class="space-y-4 text-sm text-slate-300">
          <li v-if="!mealLogDetails.length" class="rounded-xl border border-dashed border-white/10 bg-slate-950/50 p-6 text-center text-slate-500">
            Start logging meals to see macros roll up in real time.
          </li>
          <li
            v-for="item in mealLogDetails"
            :key="item.entry.id"
            class="rounded-xl border border-white/10 bg-slate-950/70 p-4"
          >
            <div class="flex flex-wrap items-baseline justify-between gap-2 text-xs uppercase text-slate-400">
              <span>{{ item.entry.time }} · {{ item.entry.mealType }}</span>
              <span v-if="item.recipe" class="text-slate-500">{{ item.recipe.servings }} serving recipe</span>
            </div>
            <p class="mt-1 font-semibold text-white">{{ item.recipe?.name ?? 'Recipe missing' }}</p>
            <p v-if="item.totals" class="mt-1 text-xs text-slate-400">
              {{ formatNumber(item.totals.protein) }}g protein ·
              {{ formatNumber(item.totals.carbs) }}g carbs ·
              {{ formatNumber(item.totals.fat) }}g fats ·
              ${{ formatNumber(item.totals.cost) }}
            </p>
            <p v-if="item.entry.notes" class="mt-2 text-xs text-slate-500">{{ item.entry.notes }}</p>
          </li>
        </ul>
      </article>
    </section>

    <section class="space-y-6">
      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold text-white">Ingredient library</h2>
            <p class="text-sm text-slate-400">Per 100 {{ 'g' }} or ml values keep calculations consistent.</p>
          </div>
          <button class="text-xs font-semibold uppercase tracking-wide text-emerald-300" @click="isIngredientFormOpen = true">
            New ingredient
          </button>
        </div>
        <div class="overflow-hidden rounded-xl border border-white/10">
          <table class="min-w-full divide-y divide-white/5 text-left text-sm text-slate-300">
            <thead class="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th class="px-4 py-3">Ingredient</th>
                <th class="px-4 py-3">Calories</th>
                <th class="px-4 py-3">Protein</th>
                <th class="px-4 py-3">Carbs</th>
                <th class="px-4 py-3">Fat</th>
                <th class="px-4 py-3">Fiber</th>
                <th class="px-4 py-3">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ingredient in ingredients" :key="ingredient.id" class="divide-x divide-white/5 border-t border-white/5">
                <td class="px-4 py-3">
                  <p class="font-medium text-white">{{ ingredient.name }}</p>
                  <p class="text-xs text-slate-500">
                    {{ ingredient.brand ? ingredient.brand + ' · ' : '' }}{{ ingredient.baseQuantity }}{{ ingredient.unit }}
                  </p>
                </td>
                <td class="px-4 py-3">{{ ingredient.nutritionPerBase.calories }}</td>
                <td class="px-4 py-3">{{ ingredient.nutritionPerBase.protein }} g</td>
                <td class="px-4 py-3">{{ ingredient.nutritionPerBase.carbs }} g</td>
                <td class="px-4 py-3">{{ ingredient.nutritionPerBase.fat }} g</td>
                <td class="px-4 py-3">{{ ingredient.nutritionPerBase.fiber }} g</td>
                <td class="px-4 py-3">${{ ingredient.costPerBaseQuantity.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="ingredients.length" class="flex flex-wrap gap-3 text-xs text-slate-400">
          <span class="font-semibold uppercase tracking-wide text-slate-500">Micronutrient highlights:</span>
          <span v-for="micro in micronutrientHighlights" :key="micro" class="rounded-full border border-white/10 px-3 py-1">
            {{ micro }}
          </span>
        </div>
      </article>

      <article class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold text-white">Recipes</h2>
            <p class="text-sm text-slate-400">Totals and per-serving macros auto-calculate from ingredient quantities.</p>
          </div>
          <button class="text-xs font-semibold uppercase tracking-wide text-emerald-300" @click="isRecipeBuilderOpen = true">
            Build recipe
          </button>
        </div>
        <div class="grid gap-5 lg:grid-cols-2">
          <div
            v-for="item in recipeSummaries"
            :key="item.recipe.id"
            class="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-5"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-lg font-semibold text-white">{{ item.recipe.name }}</h3>
                  <span
                    v-if="item.recipe.isTemplate"
                    class="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-emerald-200"
                  >
                    Template
                  </span>
                </div>
                <p v-if="item.recipe.summary" class="mt-1 text-sm text-slate-400">{{ item.recipe.summary }}</p>
              </div>
              <button
                class="text-xs font-semibold uppercase tracking-wide text-emerald-300"
                @click="toggleTemplate(item.recipe.id)"
              >
                {{ item.recipe.isTemplate ? 'Unsave' : 'Save template' }}
              </button>
            </div>
            <div class="grid grid-cols-2 gap-3 text-sm text-slate-300">
              <div class="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                <p class="text-xs uppercase text-slate-400">Total</p>
                <p class="mt-1 text-xs text-slate-400">
                  {{ formatNumber(item.totals.calories) }} kcal ·
                  {{ formatNumber(item.totals.protein) }}g protein ·
                  {{ formatNumber(item.totals.carbs) }}g carbs ·
                  {{ formatNumber(item.totals.fat) }}g fat
                </p>
                <p class="mt-1 text-xs text-slate-500">Cost: ${{ formatNumber(item.totals.cost) }}</p>
              </div>
              <div class="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                <p class="text-xs uppercase text-slate-400">Per serving ({{ item.recipe.servings }})</p>
                <p class="mt-1 text-xs text-slate-400">
                  {{ formatNumber(item.perServing.calories) }} kcal ·
                  {{ formatNumber(item.perServing.protein) }}g protein ·
                  {{ formatNumber(item.perServing.carbs) }}g carbs ·
                  {{ formatNumber(item.perServing.fat) }}g fat
                </p>
                <p class="mt-1 text-xs text-slate-500">Cost: ${{ formatNumber(item.perServing.cost) }}</p>
              </div>
            </div>
            <ul class="space-y-1 text-xs text-slate-400">
              <li
                v-for="ingredient in item.recipe.ingredients"
                :key="ingredient.ingredientId"
              >
                {{ ingredient.quantity }}{{ ingredientMap.get(ingredient.ingredientId)?.unit }} ·
                {{ ingredientMap.get(ingredient.ingredientId)?.name || 'Unknown ingredient' }}
              </li>
            </ul>
          </div>
        </div>
      </article>
    </section>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isIngredientFormOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4"
        >
          <div class="w-full max-w-xl space-y-6 rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-slate-200">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-xl font-semibold text-white">Add ingredient</h2>
                <p class="text-sm text-slate-400">Provide values per {{ ingredientForm.baseQuantity }}{{ ingredientForm.unit }}.</p>
              </div>
              <button class="text-sm text-slate-400" @click="closeIngredientForm">Close</button>
            </div>
            <form class="space-y-4" @submit.prevent="handleAddIngredient">
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Name</span>
                  <input v-model="ingredientForm.name" type="text" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" required />
                </label>
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Brand (optional)</span>
                  <input v-model="ingredientForm.brand" type="text" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
              </div>
              <div class="grid gap-4 sm:grid-cols-3">
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Unit</span>
                  <select v-model="ingredientForm.unit" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none">
                    <option value="g">Grams</option>
                    <option value="ml">Milliliters</option>
                    <option value="piece">Piece</option>
                    <option value="tbsp">Tablespoon</option>
                    <option value="tsp">Teaspoon</option>
                  </select>
                </label>
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Base quantity</span>
                  <input v-model.number="ingredientForm.baseQuantity" type="number" min="1" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Cost per base</span>
                  <input v-model.number="ingredientForm.costPerBaseQuantity" type="number" min="0" step="0.01" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Calories</span>
                  <input v-model.number="ingredientForm.calories" type="number" min="0" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Protein (g)</span>
                  <input v-model.number="ingredientForm.protein" type="number" min="0" step="0.1" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
              </div>
              <div class="grid gap-4 sm:grid-cols-3">
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Carbs (g)</span>
                  <input v-model.number="ingredientForm.carbs" type="number" min="0" step="0.1" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Fat (g)</span>
                  <input v-model.number="ingredientForm.fat" type="number" min="0" step="0.1" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Fiber (g)</span>
                  <input v-model.number="ingredientForm.fiber" type="number" min="0" step="0.1" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
              </div>
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Micronutrients (comma separated e.g. Iron:2)</span>
                <input v-model="ingredientForm.micronutrients" type="text" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
              </label>
              <p v-if="ingredientFormError" class="text-xs text-rose-300">{{ ingredientFormError }}</p>
              <div class="flex justify-end gap-3">
                <button type="button" class="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/40" @click="closeIngredientForm">
                  Cancel
                </button>
                <button type="submit" class="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:bg-emerald-300">
                  Save ingredient
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isRecipeBuilderOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4">
          <div class="w-full max-w-3xl space-y-6 rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-slate-200">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-xl font-semibold text-white">Recipe builder</h2>
                <p class="text-sm text-slate-400">Stack ingredients, set servings, and we&apos;ll handle the math.</p>
              </div>
              <button class="text-sm text-slate-400" @click="closeRecipeBuilder">Close</button>
            </div>
            <form class="space-y-5" @submit.prevent="handleCreateRecipe">
              <div class="grid gap-4 sm:grid-cols-[2fr_1fr]">
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Recipe name</span>
                  <input v-model="recipeForm.name" type="text" required class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Servings</span>
                  <input v-model.number="recipeForm.servings" type="number" min="1" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
              </div>
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Summary (optional)</span>
                <textarea v-model="recipeForm.summary" rows="2" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"></textarea>
              </label>
              <div class="space-y-3 rounded-xl border border-white/10 bg-slate-950/60 p-4">
                <div class="grid gap-3 sm:grid-cols-[2fr_1fr_auto]">
                  <label class="text-sm">
                    <span class="text-xs uppercase tracking-wide text-slate-400">Ingredient</span>
                    <select v-model="recipeForm.selectedIngredientId" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none">
                      <option value="" disabled>Select ingredient</option>
                      <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
                        {{ ingredient.name }} · {{ ingredient.unit }}
                      </option>
                    </select>
                  </label>
                  <label class="text-sm">
                    <span class="text-xs uppercase tracking-wide text-slate-400">Quantity</span>
                    <input v-model.number="recipeForm.quantity" type="number" min="0" step="1" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                  </label>
                  <button type="button" class="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:bg-emerald-300" @click="addIngredientToRecipe">
                    Add
                  </button>
                </div>
                <ul class="space-y-2 text-sm text-slate-300">
                  <li v-if="!recipeForm.ingredients.length" class="rounded-lg border border-dashed border-white/10 px-3 py-2 text-xs text-slate-500">
                    Add ingredients to calculate nutrition totals.
                  </li>
                  <li
                    v-for="ingredient in recipeForm.ingredients"
                    :key="ingredient.ingredientId"
                    class="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2"
                  >
                    <div>
                      <p class="text-sm text-white">{{ ingredientMap.get(ingredient.ingredientId)?.name }}</p>
                      <p class="text-xs text-slate-500">{{ ingredient.quantity }}{{ ingredientMap.get(ingredient.ingredientId)?.unit }}</p>
                    </div>
                    <button type="button" class="text-xs uppercase tracking-wide text-rose-300" @click="removeRecipeIngredient(ingredient.ingredientId)">
                      Remove
                    </button>
                  </li>
                </ul>
              </div>
              <div v-if="recipePreview" class="grid gap-4 sm:grid-cols-2">
                <div class="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-xs text-slate-400">
                  <p class="uppercase">Total nutrition</p>
                  <p class="mt-2">
                    {{ formatNumber(recipePreview.totals.calories) }} kcal ·
                    {{ formatNumber(recipePreview.totals.protein) }}g protein ·
                    {{ formatNumber(recipePreview.totals.carbs) }}g carbs ·
                    {{ formatNumber(recipePreview.totals.fat) }}g fat ·
                    {{ formatNumber(recipePreview.totals.fiber) }}g fiber
                  </p>
                  <p class="mt-1">Cost: ${{ formatNumber(recipePreview.totals.cost) }}</p>
                </div>
                <div class="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-xs text-slate-400">
                  <p class="uppercase">Per serving</p>
                  <p class="mt-2">
                    {{ formatNumber(recipePreview.perServing.calories) }} kcal ·
                    {{ formatNumber(recipePreview.perServing.protein) }}g protein ·
                    {{ formatNumber(recipePreview.perServing.carbs) }}g carbs ·
                    {{ formatNumber(recipePreview.perServing.fat) }}g fat ·
                    {{ formatNumber(recipePreview.perServing.fiber) }}g fiber
                  </p>
                  <p class="mt-1">Cost: ${{ formatNumber(recipePreview.perServing.cost) }}</p>
                </div>
              </div>
              <p v-if="recipeFormError" class="text-xs text-rose-300">{{ recipeFormError }}</p>
              <div class="flex justify-end gap-3">
                <button type="button" class="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/40" @click="closeRecipeBuilder">
                  Cancel
                </button>
                <button type="submit" class="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:bg-emerald-300">
                  Save recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isMealLogFormOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4">
          <div class="w-full max-w-lg space-y-6 rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-slate-200">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-xl font-semibold text-white">Log a meal</h2>
                <p class="text-sm text-slate-400">Attach a recipe, servings, and we&apos;ll add it to your timeline.</p>
              </div>
              <button class="text-sm text-slate-400" @click="closeMealLogForm">Close</button>
            </div>
            <form class="space-y-4" @submit.prevent="handleAddMealLog">
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Recipe</span>
                <select v-model="mealLogForm.recipeId" required class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none">
                  <option value="" disabled>Select recipe</option>
                  <option v-for="recipe in recipes" :key="recipe.id" :value="recipe.id">{{ recipe.name }}</option>
                </select>
              </label>
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Servings</span>
                  <input v-model.number="mealLogForm.servings" type="number" min="0.25" step="0.25" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
                <label class="text-sm">
                  <span class="text-xs uppercase tracking-wide text-slate-400">Time</span>
                  <input v-model="mealLogForm.time" type="time" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none" />
                </label>
              </div>
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Meal type</span>
                <select v-model="mealLogForm.mealType" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none">
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </label>
              <label class="text-sm">
                <span class="text-xs uppercase tracking-wide text-slate-400">Notes (optional)</span>
                <textarea v-model="mealLogForm.notes" rows="2" class="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"></textarea>
              </label>
              <p v-if="mealLogFormError" class="text-xs text-rose-300">{{ mealLogFormError }}</p>
              <div class="flex justify-end gap-3">
                <button type="button" class="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/40" @click="closeMealLogForm">
                  Cancel
                </button>
                <button type="submit" class="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/30 transition hover:bg-emerald-300">
                  Log meal
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { MealLogEntry, MicronutrientProfile, RecipeIngredient, UnitType } from '@/types/nutrition'
import { useNutritionStore } from '@/stores/nutrition'
import { formatNumber, mealLogTotals, perServingTotals, sumRecipeTotals } from '@/utils/nutrition'

const nutritionStore = useNutritionStore()
const { ingredients, recipes, mealLogs, ingredientMap, recipeSummaries } = storeToRefs(nutritionStore)
const { addIngredient, addRecipe, toggleTemplate, addMealLog } = nutritionStore

const macroTargets = {
  protein: 190,
  carbs: 300,
  fat: 70,
}

const isIngredientFormOpen = ref(false)
const isRecipeBuilderOpen = ref(false)
const isMealLogFormOpen = ref(false)

const ingredientForm = reactive({
  name: '',
  brand: '',
  unit: 'g' as UnitType,
  baseQuantity: 100,
  costPerBaseQuantity: 0,
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  micronutrients: '',
})

const recipeForm = reactive({
  name: '',
  servings: 1,
  summary: '',
  ingredients: [] as RecipeIngredient[],
  selectedIngredientId: '',
  quantity: 0,
})

const mealLogForm = reactive({
  recipeId: '',
  servings: 1,
  mealType: 'Lunch' as MealLogEntry['mealType'],
  time: '12:00',
  notes: '',
})

const ingredientFormError = ref('')
const recipeFormError = ref('')
const mealLogFormError = ref('')

const parseMicronutrients = (value: string): MicronutrientProfile | undefined => {
  const record: MicronutrientProfile = {}
  value
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean)
    .forEach((token) => {
      const [name, amount] = token.split(':').map((part) => part.trim())
      if (!name || !amount) return
      const numeric = Number(amount)
      if (Number.isNaN(numeric)) return
      record[name] = numeric
    })
  return Object.keys(record).length ? record : undefined
}

const resetIngredientForm = () => {
  ingredientForm.name = ''
  ingredientForm.brand = ''
  ingredientForm.unit = 'g'
  ingredientForm.baseQuantity = 100
  ingredientForm.costPerBaseQuantity = 0
  ingredientForm.calories = 0
  ingredientForm.protein = 0
  ingredientForm.carbs = 0
  ingredientForm.fat = 0
  ingredientForm.fiber = 0
  ingredientForm.micronutrients = ''
  ingredientFormError.value = ''
}

const closeIngredientForm = () => {
  isIngredientFormOpen.value = false
  resetIngredientForm()
}

const handleAddIngredient = () => {
  if (!ingredientForm.name.trim()) {
    ingredientFormError.value = 'Ingredient name is required.'
    return
  }

  if (ingredientForm.baseQuantity <= 0) {
    ingredientFormError.value = 'Base quantity must be greater than zero.'
    return
  }

  addIngredient({
    name: ingredientForm.name.trim(),
    brand: ingredientForm.brand?.trim() || undefined,
    unit: ingredientForm.unit,
    baseQuantity: ingredientForm.baseQuantity,
    costPerBaseQuantity: Number(ingredientForm.costPerBaseQuantity) || 0,
    nutritionPerBase: {
      calories: Number(ingredientForm.calories) || 0,
      protein: Number(ingredientForm.protein) || 0,
      carbs: Number(ingredientForm.carbs) || 0,
      fat: Number(ingredientForm.fat) || 0,
      fiber: Number(ingredientForm.fiber) || 0,
      micronutrients: parseMicronutrients(ingredientForm.micronutrients),
    },
  })

  closeIngredientForm()
}

const addIngredientToRecipe = () => {
  recipeFormError.value = ''
  if (!recipeForm.selectedIngredientId) {
    recipeFormError.value = 'Select an ingredient before adding it to the recipe.'
    return
  }

  if (recipeForm.quantity <= 0) {
    recipeFormError.value = 'Quantity must be greater than zero.'
    return
  }

  const existing = recipeForm.ingredients.find(
    (ingredient) => ingredient.ingredientId === recipeForm.selectedIngredientId
  )

  if (existing) {
    existing.quantity += Number(recipeForm.quantity)
  } else {
    recipeForm.ingredients.push({
      ingredientId: recipeForm.selectedIngredientId,
      quantity: Number(recipeForm.quantity),
    })
  }

  recipeForm.selectedIngredientId = ''
  recipeForm.quantity = 0
}

const removeRecipeIngredient = (id: string) => {
  const index = recipeForm.ingredients.findIndex((ingredient) => ingredient.ingredientId === id)
  if (index !== -1) {
    recipeForm.ingredients.splice(index, 1)
  }
}

const recipePreview = computed(() => {
  if (!recipeForm.ingredients.length) return null
  const draftRecipe = {
    id: 'preview',
    name: recipeForm.name,
    servings: recipeForm.servings || 1,
    ingredients: recipeForm.ingredients,
  }
  const totals = sumRecipeTotals(draftRecipe, ingredientMap.value)
  return {
    totals,
    perServing: perServingTotals(totals, draftRecipe.servings),
  }
})

const handleCreateRecipe = () => {
  recipeFormError.value = ''
  if (!recipeForm.name.trim()) {
    recipeFormError.value = 'Recipe name is required.'
    return
  }

  if (!recipeForm.ingredients.length) {
    recipeFormError.value = 'Add at least one ingredient to your recipe.'
    return
  }

  addRecipe({
    name: recipeForm.name.trim(),
    servings: Math.max(1, Number(recipeForm.servings) || 1),
    ingredients: recipeForm.ingredients.map((ingredient) => ({
      ingredientId: ingredient.ingredientId,
      quantity: Number(ingredient.quantity),
    })),
    summary: recipeForm.summary.trim() ? recipeForm.summary.trim() : undefined,
  })

  closeRecipeBuilder()
}

const resetRecipeForm = () => {
  recipeForm.name = ''
  recipeForm.servings = 1
  recipeForm.summary = ''
  recipeForm.ingredients.splice(0)
  recipeForm.selectedIngredientId = ''
  recipeForm.quantity = 0
  recipeFormError.value = ''
}

const closeRecipeBuilder = () => {
  isRecipeBuilderOpen.value = false
  resetRecipeForm()
}

const handleAddMealLog = () => {
  mealLogFormError.value = ''
  if (!mealLogForm.recipeId) {
    mealLogFormError.value = 'Select a recipe to log.'
    return
  }

  addMealLog({
    recipeId: mealLogForm.recipeId,
    servings: Number(mealLogForm.servings) || 1,
    mealType: mealLogForm.mealType,
    time: mealLogForm.time || '12:00',
    notes: mealLogForm.notes.trim() ? mealLogForm.notes.trim() : undefined,
  })

  closeMealLogForm()
}

const resetMealLogForm = () => {
  mealLogForm.recipeId = ''
  mealLogForm.servings = 1
  mealLogForm.mealType = 'Lunch'
  mealLogForm.time = '12:00'
  mealLogForm.notes = ''
  mealLogFormError.value = ''
}

const closeMealLogForm = () => {
  isMealLogFormOpen.value = false
  resetMealLogForm()
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

const topRecipe = computed(() => {
  if (!mealLogDetails.value.length) return null
  const counts = new Map<string, number>()
  mealLogDetails.value.forEach((detail) => {
    if (!detail.recipe || !detail.totals) return
    counts.set(detail.recipe.id, (counts.get(detail.recipe.id) ?? 0) + detail.entry.servings)
  })
  const [topId] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] ?? []
  if (!topId) return null
  const recipe = recipes.value.find((item) => item.id === topId)
  if (!recipe) return null
  const totals = sumRecipeTotals(recipe, ingredientMap.value)
  return { recipe, totals: perServingTotals(totals, recipe.servings) }
})

const micronutrientHighlights = computed(() => {
  const highlights: string[] = []
  ingredients.value.forEach((ingredient) => {
    const entries = Object.entries(ingredient.nutritionPerBase.micronutrients ?? {})
    entries.forEach(([name, amount]) => {
      highlights.push(`${ingredient.name} · ${name}: ${amount}`)
    })
  })
  return highlights.slice(0, 6)
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
