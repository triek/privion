export type MainIngredient =
  | 'Chicken'
  | 'Turkey'
  | 'Salmon'
  | 'Beef'
  | 'Eggs'
  | 'Tofu'
  | 'Chickpeas'
  | 'Lentils'
  | 'White Fish'
  | 'Shrimp'
  | 'Tempeh'
  | 'Chia'

export type RecipeIntent =
  | 'Muscle Gain'
  | 'Recovery'
  | 'Fat Loss'
  | 'Endurance'
  | 'On-the-go'
  | 'Plant-based'
  | 'Rest Day'

export interface RecipeMacros {
  protein: number
  carbs: number
  fat: number
}

export interface RecipeCardData {
  name: string
  description: string
  mainIngredient: MainIngredient
  intent: RecipeIntent
  cookTime: string
  servings: string
  macros: RecipeMacros
  highlights: string[]
}

export const performanceRecipes: RecipeCardData[] = [
  {
    name: 'Citrus miso salmon bowl',
    description: 'Brown rice, charred broccoli, and a miso-lime glaze keep omega-3s high for post-lift recovery.',
    mainIngredient: 'Salmon',
    intent: 'Recovery',
    cookTime: '25 min',
    servings: '2',
    macros: { protein: 42, carbs: 48, fat: 18 },
    highlights: ['Omega-3 focus', 'One-pan cleanup'],
  },
  {
    name: 'Harissa chicken sheet pan',
    description: 'Roasted carrots, chickpeas, and spicy harissa over chicken thighs for effortless meal prep.',
    mainIngredient: 'Chicken',
    intent: 'Muscle Gain',
    cookTime: '30 min',
    servings: '3',
    macros: { protein: 41, carbs: 36, fat: 16 },
    highlights: ['Batch friendly', 'Sheet pan bake'],
  },
  {
    name: 'Turmeric lentil power stew',
    description: 'Golden lentils, spinach, and coconut milk deliver plant-based comfort with complete amino support.',
    mainIngredient: 'Lentils',
    intent: 'Plant-based',
    cookTime: '35 min',
    servings: '4',
    macros: { protein: 24, carbs: 44, fat: 11 },
    highlights: ['Anti-inflammatory spices', 'Make-ahead jars'],
  },
  {
    name: 'Greek turkey pita stack',
    description: 'Ground turkey with herbs, cucumber yogurt, and whole wheat pitas for quick handheld fuel.',
    mainIngredient: 'Turkey',
    intent: 'On-the-go',
    cookTime: '20 min',
    servings: '2',
    macros: { protein: 35, carbs: 39, fat: 12 },
    highlights: ['Handheld', 'Mediterranean flavors'],
  },
  {
    name: 'Garlic ginger tofu stir fry',
    description: 'Crispy tofu, blistered green beans, and sesame rice for a protein-forward plant meal.',
    mainIngredient: 'Tofu',
    intent: 'Plant-based',
    cookTime: '18 min',
    servings: '2',
    macros: { protein: 28, carbs: 45, fat: 14 },
    highlights: ['Weeknight fast', 'Wok-seared'],
  },
  {
    name: 'Chimichurri flank steak plate',
    description: 'Grilled flank steak, roasted potatoes, and herby chimichurri for dense muscle-building calories.',
    mainIngredient: 'Beef',
    intent: 'Muscle Gain',
    cookTime: '28 min',
    servings: '2',
    macros: { protein: 46, carbs: 42, fat: 17 },
    highlights: ['High iron', 'Make it rare or medium'],
  },
  {
    name: 'Shrimp mango recovery tacos',
    description: 'Seared shrimp, mango salsa, and cabbage slaw wrapped in charred tortillas for glycogen refills.',
    mainIngredient: 'Shrimp',
    intent: 'Recovery',
    cookTime: '22 min',
    servings: '3',
    macros: { protein: 32, carbs: 38, fat: 11 },
    highlights: ['Citrus brine', 'Light yet filling'],
  },
  {
    name: 'Soft scramble power toast',
    description: 'Egg whites, smoked salmon, and sourdough layered with dill yogurt for a savory morning reset.',
    mainIngredient: 'Eggs',
    intent: 'Rest Day',
    cookTime: '12 min',
    servings: '1',
    macros: { protein: 30, carbs: 28, fat: 14 },
    highlights: ['Brunch ready', 'Stacked toast'],
  },
  {
    name: 'Coconut lime cod packets',
    description: 'Steamed white fish with coconut lime broth and snap peas for gentle digestion on deload days.',
    mainIngredient: 'White Fish',
    intent: 'Rest Day',
    cookTime: '18 min',
    servings: '2',
    macros: { protein: 34, carbs: 22, fat: 13 },
    highlights: ['Foil packet', 'Light broth'],
  },
  {
    name: 'Smoky chickpea grain bowl',
    description: 'Charred peppers, smoky chickpeas, and farro finished with tahini lemon drizzle.',
    mainIngredient: 'Chickpeas',
    intent: 'Fat Loss',
    cookTime: '25 min',
    servings: '2',
    macros: { protein: 22, carbs: 47, fat: 10 },
    highlights: ['Fiber loaded', 'Meal prep ready'],
  },
  {
    name: 'Matcha chia overnight oats',
    description: 'Slow-release carbs with chia seeds, collagen peptides, and coconut yogurt swirl.',
    mainIngredient: 'Chia',
    intent: 'Endurance',
    cookTime: '5 min',
    servings: '1',
    macros: { protein: 20, carbs: 40, fat: 12 },
    highlights: ['No-cook', 'Make ahead'],
  },
  {
    name: 'Maple miso tempeh bowls',
    description: 'Crispy tempeh, roasted sweet potato, and kale with maple miso glaze for balanced plant fuel.',
    mainIngredient: 'Tempeh',
    intent: 'Plant-based',
    cookTime: '30 min',
    servings: '2',
    macros: { protein: 29, carbs: 46, fat: 15 },
    highlights: ['Fermented protein', 'Sheet pan friendly'],
  },
]
