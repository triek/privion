import type {
  Ingredient,
  MealLogEntry,
  MicronutrientProfile,
  NutritionTotals,
  Recipe,
  RecipeIngredient,
} from '@/types/nutrition'

const roundTo = (value: number, precision = 1) => Math.round(value * 10 ** precision) / 10 ** precision

const emptyTotals = (): NutritionTotals => ({
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  cost: 0,
  micronutrients: {},
})

const mergeMicronutrients = (
  target: MicronutrientProfile,
  addition?: MicronutrientProfile
) => {
  if (!addition) return target

  Object.entries(addition).forEach(([key, value]) => {
    target[key] = (target[key] ?? 0) + value
  })

  return target
}

export const ingredientContribution = (ingredient: Ingredient, quantity: number): NutritionTotals => {
  const ratio = quantity / ingredient.baseQuantity
  const nutrition = ingredient.nutritionPerBase

  const totals = emptyTotals()
  totals.calories = nutrition.calories * ratio
  totals.protein = nutrition.protein * ratio
  totals.carbs = nutrition.carbs * ratio
  totals.fat = nutrition.fat * ratio
  totals.fiber = nutrition.fiber * ratio
  totals.cost = ingredient.costPerBaseQuantity * ratio
  totals.micronutrients = mergeMicronutrients({}, nutrition.micronutrients)

  return totals
}

export const sumRecipeTotals = (
  recipe: Recipe,
  ingredientMap: Map<string, Ingredient>
): NutritionTotals => {
  const totals = emptyTotals()

  recipe.ingredients.forEach((item: RecipeIngredient) => {
    const ingredient = ingredientMap.get(item.ingredientId)
    if (!ingredient) return

    const contribution = ingredientContribution(ingredient, item.quantity)
    totals.calories += contribution.calories
    totals.protein += contribution.protein
    totals.carbs += contribution.carbs
    totals.fat += contribution.fat
    totals.fiber += contribution.fiber
    totals.cost += contribution.cost
    totals.micronutrients = mergeMicronutrients(totals.micronutrients, contribution.micronutrients)
  })

  return totals
}

export const perServingTotals = (totals: NutritionTotals, servings: number): NutritionTotals => {
  const divisor = Math.max(servings, 1)
  return {
    calories: totals.calories / divisor,
    protein: totals.protein / divisor,
    carbs: totals.carbs / divisor,
    fat: totals.fat / divisor,
    fiber: totals.fiber / divisor,
    cost: totals.cost / divisor,
    micronutrients: Object.fromEntries(
      Object.entries(totals.micronutrients).map(([key, value]) => [key, value / divisor])
    ),
  }
}

export const formatNumber = (value: number) => roundTo(value, 1).toLocaleString(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})

export const mealLogTotals = (
  entry: MealLogEntry,
  recipes: Recipe[],
  ingredientMap: Map<string, Ingredient>
): NutritionTotals | null => {
  const recipe = recipes.find((item) => item.id === entry.recipeId)
  if (!recipe) return null

  const totals = sumRecipeTotals(recipe, ingredientMap)
  const perServing = perServingTotals(totals, recipe.servings)

  return {
    calories: perServing.calories * entry.servings,
    protein: perServing.protein * entry.servings,
    carbs: perServing.carbs * entry.servings,
    fat: perServing.fat * entry.servings,
    fiber: perServing.fiber * entry.servings,
    cost: perServing.cost * entry.servings,
    micronutrients: Object.fromEntries(
      Object.entries(perServing.micronutrients).map(([key, value]) => [key, value * entry.servings])
    ),
  }
}
