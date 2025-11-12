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
