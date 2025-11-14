export type IngredientCategory = 'Protein' | 'Carbs' | 'Fiber' | 'Spices'

export interface IngredientCardData {
  name: string
  category: IngredientCategory
  description: string
  form: string
  prep: string
  macros: {
    protein: string
    carbs: string
    fiber: string
  }
  highlights: string[]
}

export const ingredientLibrary: IngredientCardData[] = [
  {
    name: 'Wild-caught salmon',
    category: 'Protein',
    description:
      'Rich in omega-3s for inflammation control and muscle recovery after heavy training days.',
    form: 'Fresh fillet',
    prep: 'Oven roast or grill in 12 minutes',
    macros: {
      protein: '22g',
      carbs: '0g',
      fiber: '0g',
    },
    highlights: ['Finish with citrus zest and herbs', 'Batch bake for two dinners', 'Pairs with roasted roots'],
  },
  {
    name: 'Pasture-raised chicken thighs',
    category: 'Protein',
    description: 'Juicy protein option with higher iron for repeat sprint or strength phases.',
    form: 'Boneless, skin-on',
    prep: 'Cast-iron sear then oven for 15 minutes',
    macros: {
      protein: '20g',
      carbs: '0g',
      fiber: '0g',
    },
    highlights: ['Keep skin on for crispy finish', 'Great for meal prep bowls', 'Shred for tacos and wraps'],
  },
  {
    name: 'Fermented tempeh',
    category: 'Protein',
    description: 'Plant protein with probiotics to support gut health and steady energy.',
    form: 'Soybean cake',
    prep: 'Steam then pan sear in 10 minutes',
    macros: {
      protein: '19g',
      carbs: '12g',
      fiber: '7g',
    },
    highlights: ['Absorbs marinades fast', 'Cube for stir-fries', 'Crumbles into sauces'],
  },
  {
    name: 'Roasted sweet potatoes',
    category: 'Carbs',
    description: 'Slow-release carbohydrate to anchor pre-training meals without energy crashes.',
    form: 'Cubed and roasted',
    prep: 'Sheet pan roast for 25 minutes',
    macros: {
      protein: '2g',
      carbs: '26g',
      fiber: '4g',
    },
    highlights: ['Season with smoked paprika', 'Mash with miso for spread', 'Add to breakfast skillets'],
  },
  {
    name: 'Sprouted quinoa',
    category: 'Carbs',
    description: 'Complete plant protein with magnesium to support endurance efforts.',
    form: 'Sprouted grain',
    prep: 'Simmer in broth for 15 minutes',
    macros: {
      protein: '8g',
      carbs: '39g',
      fiber: '5g',
    },
    highlights: ['Serve chilled in salads', 'Blend into pancakes', 'Toss with roasted vegetables'],
  },
  {
    name: 'Sourdough country loaf',
    category: 'Carbs',
    description: 'Naturally fermented loaf for better digestibility and steady glucose response.',
    form: 'Artisan bread',
    prep: 'Slice and toast as needed',
    macros: {
      protein: '9g',
      carbs: '47g',
      fiber: '3g',
    },
    highlights: ['Top with soft scrambled eggs', 'Press into paninis', 'Use for pre-ride fuel'],
  },
  {
    name: 'Chia seeds',
    category: 'Fiber',
    description: 'Hydration-friendly fiber supporting digestion and micronutrient density.',
    form: 'Whole seed',
    prep: 'Soak overnight or sprinkle dry',
    macros: {
      protein: '5g',
      carbs: '12g',
      fiber: '10g',
    },
    highlights: ['Thicken smoothies', 'Make overnight puddings', 'Stir into oat bowls'],
  },
  {
    name: 'Rainbow chard',
    category: 'Fiber',
    description: 'Leafy greens stacked with potassium and magnesium for muscle function.',
    form: 'Fresh bunch',
    prep: 'Quick sauté or steam in 5 minutes',
    macros: {
      protein: '3g',
      carbs: '7g',
      fiber: '3g',
    },
    highlights: ['Slice stems for crunch', 'Wilt into grain bowls', 'Finish with lemon and olive oil'],
  },
  {
    name: 'French green lentils',
    category: 'Fiber',
    description: 'Sturdy lentils that hold shape for salads with impressive fiber per cup.',
    form: 'Dried legume',
    prep: 'Simmer until tender in 25 minutes',
    macros: {
      protein: '18g',
      carbs: '40g',
      fiber: '16g',
    },
    highlights: ['Batch cook for lunches', 'Toss with roasted vegetables', 'Blend into hearty soups'],
  },
  {
    name: 'Smoked paprika',
    category: 'Spices',
    description: 'Adds depth and subtle sweetness for proteins or roasted vegetables.',
    form: 'Ground spice',
    prep: 'Dust on before roasting or grilling',
    macros: {
      protein: '1g',
      carbs: '4g',
      fiber: '2g',
    },
    highlights: ['Bloom in warm oil', 'Mix into rubs', 'Stir into tomato sauces'],
  },
  {
    name: 'Toasted cumin seeds',
    category: 'Spices',
    description: 'Nutty spice boosting digestion and warmth in savory dishes.',
    form: 'Whole seed',
    prep: 'Toast lightly for 1 minute',
    macros: {
      protein: '2g',
      carbs: '3g',
      fiber: '2g',
    },
    highlights: ['Grind with sea salt', 'Use in roasted vegetables', 'Finish soups and stews'],
  },
  {
    name: 'Fresh grated ginger',
    category: 'Spices',
    description: 'Bright heat supporting circulation and recovery shakes.',
    form: 'Fresh root',
    prep: 'Microplane or mince just before use',
    macros: {
      protein: '1g',
      carbs: '18g',
      fiber: '2g',
    },
    highlights: ['Steep for tea concentrates', 'Add to stir-fries', 'Blend into smoothies'],
  },
]
