export type UnitType = 'g' | 'ml' | 'piece' | 'tbsp' | 'tsp'

export interface MicronutrientProfile {
  [name: string]: number
}

export interface IngredientNutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  micronutrients?: MicronutrientProfile
}

export interface Ingredient {
  id: string
  name: string
  brand?: string
  unit: UnitType
  baseQuantity: number
  costPerBaseQuantity: number
  nutritionPerBase: IngredientNutrition
}

export interface RecipeIngredient {
  ingredientId: string
  quantity: number
  notes?: string
}

export interface Recipe {
  id: string
  name: string
  servings: number
  ingredients: RecipeIngredient[]
  summary?: string
  isTemplate?: boolean
}

export interface MealLogEntry {
  id: string
  recipeId: string
  servings: number
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
  time: string
  notes?: string
}

export interface NutritionTotals {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  cost: number
  micronutrients: MicronutrientProfile
}
