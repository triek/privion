import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ingredient, MealLogEntry, Recipe } from '@/types/nutrition'
import { perServingTotals, sumRecipeTotals } from '@/utils/nutrition'

const createId = () => Math.random().toString(36).slice(2, 9)

const sampleIngredients: Ingredient[] = [
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    brand: 'Air-Chilled',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 1.8,
    nutritionPerBase: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      micronutrients: { B6: 0.6, Selenium: 31 },
    },
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 0.45,
    nutritionPerBase: {
      calories: 111,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      fiber: 1.8,
      micronutrients: { Manganese: 1.1, Magnesium: 44 },
    },
  },
  {
    id: 'olive-oil',
    name: 'Extra Virgin Olive Oil',
    brand: 'Arbequina',
    unit: 'ml',
    baseQuantity: 100,
    costPerBaseQuantity: 2.2,
    nutritionPerBase: {
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      fiber: 0,
      micronutrients: { VitaminE: 14 },
    },
  },
  {
    id: 'baby-spinach',
    name: 'Baby Spinach',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 0.95,
    nutritionPerBase: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      micronutrients: { Iron: 2.7, Folate: 194 },
    },
  },
  {
    id: 'salmon-fillet',
    name: 'Atlantic Salmon',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 3.4,
    nutritionPerBase: {
      calories: 208,
      protein: 20,
      carbs: 0,
      fat: 13,
      fiber: 0,
      micronutrients: { Omega3: 2.5, B12: 3.2 },
    },
  },
  {
    id: 'quinoa',
    name: 'Tri-Color Quinoa',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 0.7,
    nutritionPerBase: {
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fat: 1.9,
      fiber: 2.8,
      micronutrients: { Magnesium: 64, Iron: 1.5 },
    },
  },
  {
    id: 'broccoli',
    name: 'Broccoli Florets',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 0.85,
    nutritionPerBase: {
      calories: 34,
      protein: 2.8,
      carbs: 7,
      fat: 0.4,
      fiber: 2.6,
      micronutrients: { VitaminC: 89, VitaminK: 101 },
    },
  },
  {
    id: 'sweet-potato',
    name: 'Roasted Sweet Potato',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 0.6,
    nutritionPerBase: {
      calories: 86,
      protein: 1.6,
      carbs: 20.1,
      fat: 0.1,
      fiber: 3,
      micronutrients: { VitaminA: 14187, Potassium: 337 },
    },
  },
  {
    id: 'whole-eggs',
    name: 'Free-Range Eggs',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 1.2,
    nutritionPerBase: {
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      fiber: 0,
      micronutrients: { Choline: 294, VitaminD: 2 },
    },
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 0.9,
    nutritionPerBase: {
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      fiber: 0,
      micronutrients: { Calcium: 110, B12: 0.7 },
    },
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 1.1,
    nutritionPerBase: {
      calories: 57,
      protein: 0.7,
      carbs: 14,
      fat: 0.3,
      fiber: 2.4,
      micronutrients: { VitaminC: 9.7, Manganese: 0.3 },
    },
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 2.5,
    nutritionPerBase: {
      calories: 486,
      protein: 16.5,
      carbs: 42.1,
      fat: 30.7,
      fiber: 34.4,
      micronutrients: { Omega3: 17.8, Calcium: 631 },
    },
  },
  {
    id: 'almonds',
    name: 'Raw Almonds',
    unit: 'g',
    baseQuantity: 100,
    costPerBaseQuantity: 1.9,
    nutritionPerBase: {
      calories: 579,
      protein: 21.2,
      carbs: 21.6,
      fat: 49.9,
      fiber: 12.5,
      micronutrients: { VitaminE: 25.6, Magnesium: 268 },
    },
  },
]

const sampleRecipes: Recipe[] = [
  {
    id: 'chicken-rice-bowl',
    name: 'Chicken Rice Bowl',
    servings: 2,
    summary: 'Lean protein with slow carbs and a drizzle of healthy fats.',
    ingredients: [
      { ingredientId: 'chicken-breast', quantity: 300 },
      { ingredientId: 'brown-rice', quantity: 200 },
      { ingredientId: 'olive-oil', quantity: 20 },
      { ingredientId: 'baby-spinach', quantity: 120 },
    ],
  },
  {
    id: 'green-energy-smoothie',
    name: 'Green Energy Smoothie',
    servings: 1,
    summary: 'Micronutrient dense shake for busy mornings.',
    ingredients: [
      { ingredientId: 'baby-spinach', quantity: 60 },
      { ingredientId: 'brown-rice', quantity: 40 },
    ],
    isTemplate: true,
  },
  {
    id: 'salmon-power-plate',
    name: 'Salmon Power Plate',
    servings: 1,
    summary: 'Omega-rich salmon with hearty quinoa and greens.',
    ingredients: [
      { ingredientId: 'salmon-fillet', quantity: 180 },
      { ingredientId: 'quinoa', quantity: 150 },
      { ingredientId: 'broccoli', quantity: 120 },
      { ingredientId: 'olive-oil', quantity: 15 },
    ],
  },
  {
    id: 'sweet-potato-hash',
    name: 'Sweet Potato Power Hash',
    servings: 1,
    summary: 'Comforting breakfast hash packed with protein and fiber.',
    ingredients: [
      { ingredientId: 'sweet-potato', quantity: 220 },
      { ingredientId: 'whole-eggs', quantity: 140 },
      { ingredientId: 'baby-spinach', quantity: 80 },
      { ingredientId: 'olive-oil', quantity: 10 },
    ],
  },
  {
    id: 'quinoa-chicken-crunch',
    name: 'Quinoa Chicken Crunch',
    servings: 2,
    summary: 'Meal-prep friendly grain bowl with crisp veggies.',
    ingredients: [
      { ingredientId: 'chicken-breast', quantity: 280 },
      { ingredientId: 'quinoa', quantity: 220 },
      { ingredientId: 'baby-spinach', quantity: 140 },
      { ingredientId: 'broccoli', quantity: 160 },
      { ingredientId: 'olive-oil', quantity: 20 },
    ],
  },
  {
    id: 'overnight-protein-parfait',
    name: 'Overnight Protein Parfait',
    servings: 1,
    summary: 'Creamy yogurt layered with seeds, nuts, and berries.',
    ingredients: [
      { ingredientId: 'greek-yogurt', quantity: 220 },
      { ingredientId: 'chia-seeds', quantity: 28 },
      { ingredientId: 'blueberries', quantity: 90 },
      { ingredientId: 'almonds', quantity: 20 },
    ],
  },
]

const sampleMealLogs: MealLogEntry[] = [
  {
    id: 'log-1',
    recipeId: 'chicken-rice-bowl',
    servings: 1,
    mealType: 'Lunch',
    time: '12:30',
    notes: 'Post-training refuel',
  },
  {
    id: 'log-2',
    recipeId: 'green-energy-smoothie',
    servings: 1,
    mealType: 'Breakfast',
    time: '07:15',
  },
]

export const useNutritionStore = defineStore('nutrition', () => {
  const ingredients = ref<Ingredient[]>(sampleIngredients)
  const recipes = ref<Recipe[]>(sampleRecipes)
  const mealLogs = ref<MealLogEntry[]>(sampleMealLogs)

  const ingredientMap = computed(
    () => new Map(ingredients.value.map((ingredient) => [ingredient.id, ingredient]))
  )

  const recipeSummaries = computed(() =>
    recipes.value.map((recipe) => ({
      recipe,
      totals: sumRecipeTotals(recipe, ingredientMap.value),
      perServing: perServingTotals(sumRecipeTotals(recipe, ingredientMap.value), recipe.servings),
    }))
  )

  const addIngredient = (payload: Omit<Ingredient, 'id'>) => {
    ingredients.value.push({ ...payload, id: createId() })
  }

  const addRecipe = (payload: Omit<Recipe, 'id'>) => {
    recipes.value.push({ ...payload, id: createId() })
  }

  const toggleTemplate = (recipeId: string) => {
    const recipe = recipes.value.find((item) => item.id === recipeId)
    if (!recipe) return
    recipe.isTemplate = !recipe.isTemplate
  }

  const addMealLog = (payload: Omit<MealLogEntry, 'id'>) => {
    mealLogs.value.unshift({ ...payload, id: createId() })
  }

  return {
    ingredients,
    recipes,
    mealLogs,
    ingredientMap,
    recipeSummaries,
    addIngredient,
    addRecipe,
    toggleTemplate,
    addMealLog,
  }
})
