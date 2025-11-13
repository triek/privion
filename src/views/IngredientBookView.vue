<template>
  <div class="space-y-12">
    <header class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Pantry intelligence</p>
      <h1 class="text-3xl font-bold text-white">Ingredient book</h1>
      <p class="max-w-2xl text-sm text-slate-400">
        Audit your staples, explore nutrient-dense upgrades, and tag ingredients for upcoming training blocks. Keep the pantry
        dialed so every recipe starts strong.
      </p>
    </header>

    <section class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-white">Macro leaders</h2>
          <p class="text-sm text-slate-400">High-impact staples to anchor meals around specific macro targets.</p>
        </div>
        <span class="text-xs uppercase tracking-wide text-slate-400">{{ macroLeaders.length }} featured</span>
      </div>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="leader in macroLeaders"
          :key="leader.name"
          class="flex flex-col gap-4 rounded-xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300"
        >
          <div class="space-y-1">
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ leader.focus }}</p>
            <h3 class="text-lg font-semibold text-white">{{ leader.name }}</h3>
          </div>
          <p class="text-slate-400">{{ leader.description }}</p>
          <dl class="grid grid-cols-2 gap-3 text-xs text-slate-400">
            <div>
              <dt class="uppercase tracking-wide text-slate-500">Per 100g</dt>
              <dd class="text-base font-semibold text-white">{{ leader.perHundred }}</dd>
            </div>
            <div>
              <dt class="uppercase tracking-wide text-slate-500">Cost</dt>
              <dd class="text-base font-semibold text-white">{{ leader.cost }}</dd>
            </div>
          </dl>
          <div class="flex flex-wrap gap-2 text-xs text-slate-400">
            <span v-for="tag in leader.tags" :key="tag" class="rounded-full border border-white/10 px-3 py-1">{{ tag }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-white">Pantry tracker</h2>
          <p class="text-sm text-slate-400">Log freshness, reorder windows, and flavor pairings for consistent kitchen flow.</p>
        </div>
        <button type="button" class="text-xs font-semibold uppercase tracking-wide text-emerald-300">Export list</button>
      </div>
      <div class="overflow-hidden rounded-xl border border-white/10">
        <table class="min-w-full divide-y divide-white/5 text-left text-sm text-slate-300">
          <thead class="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th class="px-4 py-3">Ingredient</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Inventory</th>
              <th class="px-4 py-3">Reorder</th>
              <th class="px-4 py-3">Pairing notes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="item in pantryItems" :key="item.name">
              <td class="px-4 py-3">
                <p class="font-medium text-white">{{ item.name }}</p>
                <p class="text-xs text-slate-500">{{ item.category }}</p>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  :class="item.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-200' : item.status === 'Prep' ? 'bg-amber-500/10 text-amber-200' : 'bg-rose-500/10 text-rose-200'"
                >
                  <span class="h-2 w-2 rounded-full" :class="item.statusDot"></span>
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-slate-200">{{ item.inventory }}</td>
              <td class="px-4 py-3 text-slate-200">{{ item.reorderWindow }}</td>
              <td class="px-4 py-3 text-slate-400">{{ item.pairingNotes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
      <div class="space-y-2">
        <h2 class="text-lg font-semibold text-white">Flavor lab</h2>
        <p class="text-sm text-slate-400">Test blends for sauces, marinades, and finishing salts to keep dishes exciting.</p>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="experiment in flavorExperiments"
          :key="experiment.name"
          class="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300"
        >
          <div>
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ experiment.type }}</p>
            <h3 class="text-base font-semibold text-white">{{ experiment.name }}</h3>
          </div>
          <p class="text-slate-400">{{ experiment.description }}</p>
          <ul class="space-y-1 text-xs text-slate-400">
            <li v-for="note in experiment.notes" :key="note" class="flex items-start gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>{{ note }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface MacroLeader {
  name: string
  description: string
  focus: string
  perHundred: string
  cost: string
  tags: string[]
}

interface PantryItem {
  name: string
  category: string
  status: 'Ready' | 'Prep' | 'Low';
  statusDot: string
  inventory: string
  reorderWindow: string
  pairingNotes: string
}

interface FlavorExperiment {
  name: string
  description: string
  type: string
  notes: string[]
}

const macroLeaders: MacroLeader[] = [
  {
    name: 'Grass-fed flank steak',
    description: 'Lean cuts sliced thin for stir-fry or sous vide prep without excess fat.',
    focus: 'Protein anchor',
    perHundred: '31g protein',
    cost: '$3.80',
    tags: ['Iron rich', 'Freezer friendly', '48h marinade'],
  },
  {
    name: 'Sprouted lentils',
    description: 'Boost plant protein and digestion with a mild nutty flavor.',
    focus: 'Endurance base',
    perHundred: '25g protein',
    cost: '$1.20',
    tags: ['High fiber', 'Batch cook', 'Warm or chilled'],
  },
  {
    name: 'Whole grain farro',
    description: 'Chewy texture with steady-release carbohydrates and a toasted finish.',
    focus: 'Carb foundation',
    perHundred: '72g carbs',
    cost: '$0.90',
    tags: ['Meal prep', 'Pre-workout', 'Mineral rich'],
  },
  {
    name: 'Tahini',
    description: 'Sesame paste for creamy sauces loaded with calcium and copper.',
    focus: 'Healthy fats',
    perHundred: '53g fat',
    cost: '$0.75',
    tags: ['Dairy-free', 'Dressings', 'Dips'],
  },
  {
    name: 'Greek yogurt',
    description: 'Strained and thick, ideal for parfaits, smoothies, or marinades.',
    focus: 'Recovery boost',
    perHundred: '18g protein',
    cost: '$1.10',
    tags: ['Probiotics', 'Calcium', 'Sweet or savory'],
  },
  {
    name: 'Rainbow chard',
    description: 'Colorful greens supporting hydration and micronutrients.',
    focus: 'Micro hero',
    perHundred: '3g fiber',
    cost: '$1.40',
    tags: ['Saute or raw', 'Batch wash', 'Magnesium'],
  },
]

const pantryItems: PantryItem[] = [
  {
    name: 'Jasmine rice',
    category: 'Grains',
    status: 'Ready',
    statusDot: 'bg-emerald-400',
    inventory: '12 cups cooked',
    reorderWindow: 'Low in 2 weeks',
    pairingNotes: 'Pairs with citrus proteins and chili oil.',
  },
  {
    name: 'Kimchi',
    category: 'Ferments',
    status: 'Prep',
    statusDot: 'bg-amber-400',
    inventory: '1.5 jars',
    reorderWindow: 'Ferment ends Friday',
    pairingNotes: 'Top rice bowls or savory oats.',
  },
  {
    name: 'Roasted almonds',
    category: 'Pantry fats',
    status: 'Low',
    statusDot: 'bg-rose-400',
    inventory: '220g',
    reorderWindow: 'Buy during weekend market run',
    pairingNotes: 'Blend with dates for quick bars.',
  },
  {
    name: 'Frozen blueberries',
    category: 'Produce',
    status: 'Ready',
    statusDot: 'bg-emerald-400',
    inventory: '3 freezer bags',
    reorderWindow: 'Check in 10 days',
    pairingNotes: 'Blend with kefir and chia.',
  },
  {
    name: 'Smoked paprika',
    category: 'Spices',
    status: 'Ready',
    statusDot: 'bg-emerald-400',
    inventory: 'Full tin',
    reorderWindow: 'Rotate every 6 months',
    pairingNotes: 'Rub for grilled proteins and soups.',
  },
]

const flavorExperiments: FlavorExperiment[] = [
  {
    name: 'Charred scallion dressing',
    description: 'Blend blistered scallions with rice vinegar, ginger, and toasted sesame oil.',
    type: 'Sauce lab',
    notes: ['Keeps 5 days chilled', 'Add honey for glaze', 'Pairs with grilled tofu'],
  },
  {
    name: 'Smoky cacao rub',
    description: 'Cacao nibs, espresso powder, smoked salt, and chipotle for steak nights.',
    type: 'Dry rub',
    notes: ['Best on cast iron sear', 'Finish with lime zest'],
  },
  {
    name: 'Citrus electrolyte salt',
    description: 'Dehydrated orange zest, flaky salt, and crushed coriander seeds.',
    type: 'Finishing salt',
    notes: ['Great on roasted veggies', 'Sprinkle on mocktails'],
  },
  {
    name: 'Umami mushroom powder',
    description: 'Dried shiitake, nutritional yeast, and smoked pepper grind.',
    type: 'Seasoning',
    notes: ['Boosts broths instantly', 'Stir into savory oats'],
  },
]
</script>
