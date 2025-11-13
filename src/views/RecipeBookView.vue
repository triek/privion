<template>
  <div class="space-y-12">
    <header class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Fuel ideas</p>
      <h1 class="text-3xl font-bold text-white">Recipe book</h1>
      <p class="max-w-2xl text-sm text-slate-400">
        Discover curated meals tailored for strength, recovery, and everyday nourishment. Each recipe balances macronutrients and
        flavor so planning your next plate stays effortless.
      </p>
    </header>

    <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold text-white">Quick picks</h2>
            <p class="text-sm text-slate-400">Ready in under 30 minutes without sacrificing protein goals.</p>
          </div>
          <span class="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-100">
            {{ quickRecipes.length }} recipes
          </span>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="recipe in quickRecipes"
            :key="recipe.name"
            class="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/70 p-4"
          >
            <div class="space-y-2">
              <p class="text-xs uppercase tracking-wide text-emerald-300">{{ recipe.tag }}</p>
              <h3 class="text-lg font-semibold text-white">{{ recipe.name }}</h3>
              <p class="text-sm text-slate-400">{{ recipe.description }}</p>
            </div>
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
          </article>
        </div>
      </article>

      <article class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Collections</h2>
          <p class="text-sm text-slate-400">Group meals by intent and save weekly templates for training blocks.</p>
        </div>
        <ul class="space-y-3">
          <li
            v-for="collection in recipeCollections"
            :key="collection.name"
            class="flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300"
          >
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-base font-semibold text-white">{{ collection.name }}</h3>
              <span class="text-xs uppercase tracking-wide text-emerald-300">{{ collection.recipes }} recipes</span>
            </div>
            <p class="text-slate-400">{{ collection.summary }}</p>
            <div class="flex flex-wrap gap-2 text-xs text-slate-400">
              <span
                v-for="highlight in collection.highlights"
                :key="highlight"
                class="rounded-full border border-white/10 px-3 py-1"
              >
                {{ highlight }}
              </span>
            </div>
          </li>
        </ul>
      </article>
    </section>

    <section class="space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-white">Seasonal spotlight</h2>
          <p class="text-sm text-slate-400">Rotate fresh ingredients to keep your menu exciting and micronutrient dense.</p>
        </div>
        <span class="text-xs uppercase tracking-wide text-slate-400">Updated weekly</span>
      </div>
      <div class="grid gap-4 sm:grid-cols-3">
        <article
          v-for="feature in seasonalFeatures"
          :key="feature.name"
          class="space-y-3 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300"
        >
          <div>
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ feature.focus }}</p>
            <h3 class="text-base font-semibold text-white">{{ feature.name }}</h3>
          </div>
          <p class="text-slate-400">{{ feature.description }}</p>
          <dl class="space-y-1 text-xs text-slate-400">
            <div class="flex items-center justify-between">
              <dt>Prep time</dt>
              <dd class="text-white">{{ feature.prepTime }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt>Servings</dt>
              <dd class="text-white">{{ feature.servings }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface RecipeCard {
  name: string
  description: string
  tag: string
  macros: {
    protein: number
    carbs: number
    fat: number
  }
}

interface RecipeCollection {
  name: string
  summary: string
  recipes: number
  highlights: string[]
}

interface SeasonalFeature {
  name: string
  description: string
  focus: string
  prepTime: string
  servings: string
}

const quickRecipes: RecipeCard[] = [
  {
    name: 'Citrus miso salmon bowl',
    description: 'Brown rice, charred broccoli, and a miso-lime glaze to keep omega-3s high.',
    tag: 'Recovery',
    macros: { protein: 42, carbs: 48, fat: 18 },
  },
  {
    name: 'Turkey pesto wrap',
    description: 'Whole wheat lavash, basil pesto yogurt, and crunchy veggies in one hand-held meal.',
    tag: 'On-the-go',
    macros: { protein: 36, carbs: 38, fat: 12 },
  },
  {
    name: 'Spiced chickpea skillet',
    description: 'One-pan chickpeas with roasted peppers and tahini drizzle for plant-powered nights.',
    tag: 'Plant-based',
    macros: { protein: 24, carbs: 52, fat: 14 },
  },
  {
    name: 'Egg white breakfast tacos',
    description: 'Soft corn tortillas, sautéed greens, and queso fresco for a post-session refuel.',
    tag: 'Morning reset',
    macros: { protein: 28, carbs: 34, fat: 10 },
  },
]

const recipeCollections: RecipeCollection[] = [
  {
    name: 'Heavy lifting week',
    summary: 'Front-load carbohydrates and stagger protein doses around each session.',
    recipes: 12,
    highlights: ['Pre-workout shakes', 'Post-lift bowls', 'Bedtime casein'],
  },
  {
    name: 'Cutting phase',
    summary: 'Lower-calorie dishes with high satiety ingredients and bulk prep guidance.',
    recipes: 18,
    highlights: ['Volumetric sides', 'Lean proteins', 'Macro swaps'],
  },
  {
    name: 'Plant-based rotation',
    summary: 'Balanced amino acid profiles with seasonal produce and fermented staples.',
    recipes: 14,
    highlights: ['Tempeh mains', 'High-fiber snacks', 'Fermented toppers'],
  },
]

const seasonalFeatures: SeasonalFeature[] = [
  {
    name: 'Grilled peach quinoa salad',
    description: 'Stone fruit, toasted almonds, and herbed quinoa for bright summer bowls.',
    focus: 'Summer power',
    prepTime: '15 min',
    servings: '2',
  },
  {
    name: 'Gochujang turkey lettuce cups',
    description: 'Crisp lettuce, sticky gochujang glaze, and pickled radish crunch.',
    focus: 'Midweek heat',
    prepTime: '20 min',
    servings: '3',
  },
  {
    name: 'Matcha chia overnight oats',
    description: 'Slow-release carbs with collagen peptides and coconut yogurt swirl.',
    focus: 'Morning calm',
    prepTime: '5 min',
    servings: '1',
  },
]
</script>
