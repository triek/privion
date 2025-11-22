export type IngredientCategory = 'Protein' | 'Carbs' | 'Fiber' | 'Spices'

export interface IngredientCardData {
  name: string
  category: IngredientCategory
  stats: {
    protein: string
    carbs: string
    fat: string
    fiber: string
    calories?: string
    sugars?: string
    saturatedFat?: string
    sodium?: string
    costPer100g?: string
    other?: string
  }
}

export const ingredientLibrary: IngredientCardData[] = [
  {
    name: 'Wild-caught salmon',
    category: 'Protein',
    stats: {
      protein: '22g',
      carbs: '0g',
      fat: '13g',
      fiber: '0g',
      calories: '208kcal',
      sugars: '0g',
      saturatedFat: '3g',
      sodium: '59mg',
      costPer100g: '$4.50',
      other: 'Omega-3 rich',
    },
  },
  {
    name: 'Pasture-raised chicken thighs',
    category: 'Protein',
    stats: {
      protein: '20g',
      carbs: '0g',
      fat: '12g',
      fiber: '0g',
      calories: '209kcal',
      sugars: '0g',
      saturatedFat: '3g',
      sodium: '90mg',
      costPer100g: '$2.85',
    },
  },
  {
    name: 'Fermented tempeh',
    category: 'Protein',
    stats: {
      protein: '19g',
      carbs: '12g',
      fat: '11g',
      fiber: '7g',
      calories: '195kcal',
      sugars: '2g',
      saturatedFat: '2g',
      sodium: '9mg',
      costPer100g: '$1.90',
    },
  },
  {
    name: 'Roasted sweet potatoes',
    category: 'Carbs',
    stats: {
      protein: '2g',
      carbs: '26g',
      fat: '0g',
      fiber: '4g',
      calories: '108kcal',
      sugars: '6g',
      saturatedFat: '0g',
      sodium: '72mg',
      costPer100g: '$0.90',
    },
  },
  {
    name: 'Sprouted quinoa',
    category: 'Carbs',
    stats: {
      protein: '8g',
      carbs: '39g',
      fat: '4g',
      fiber: '5g',
      calories: '222kcal',
      sugars: '2g',
      saturatedFat: '0g',
      sodium: '5mg',
      costPer100g: '$1.20',
    },
  },
  {
    name: 'Sourdough country loaf',
    category: 'Carbs',
    stats: {
      protein: '9g',
      carbs: '47g',
      fat: '2g',
      fiber: '3g',
      calories: '260kcal',
      sugars: '2g',
      saturatedFat: '0g',
      sodium: '520mg',
      costPer100g: '$0.65',
    },
  },
  {
    name: 'Chia seeds',
    category: 'Fiber',
    stats: {
      protein: '5g',
      carbs: '12g',
      fat: '9g',
      fiber: '10g',
      calories: '138kcal',
      sugars: '0g',
      saturatedFat: '1g',
      sodium: '5mg',
      costPer100g: '$1.05',
      other: 'ALA omega-3 source',
    },
  },
  {
    name: 'Rainbow chard',
    category: 'Fiber',
    stats: {
      protein: '3g',
      carbs: '7g',
      fat: '0g',
      fiber: '3g',
      calories: '35kcal',
      sugars: '2g',
      saturatedFat: '0g',
      sodium: '213mg',
      costPer100g: '$0.95',
    },
  },
  {
    name: 'French green lentils',
    category: 'Fiber',
    stats: {
      protein: '18g',
      carbs: '40g',
      fat: '1g',
      fiber: '16g',
      calories: '230kcal',
      sugars: '2g',
      saturatedFat: '0g',
      sodium: '6mg',
      costPer100g: '$0.80',
    },
  },
  {
    name: 'Smoked paprika',
    category: 'Spices',
    stats: {
      protein: '1g',
      carbs: '4g',
      fat: '1g',
      fiber: '2g',
      calories: '19kcal',
      sugars: '1g',
      saturatedFat: '0g',
      sodium: '3mg',
      costPer100g: '$0.70',
    },
  },
  {
    name: 'Toasted cumin seeds',
    category: 'Spices',
    stats: {
      protein: '2g',
      carbs: '3g',
      fat: '2g',
      fiber: '2g',
      calories: '22kcal',
      sugars: '0g',
      saturatedFat: '0g',
      sodium: '33mg',
      costPer100g: '$0.50',
    },
  },
  {
    name: 'Fresh grated ginger',
    category: 'Spices',
    stats: {
      protein: '1g',
      carbs: '18g',
      fat: '0g',
      fiber: '2g',
      calories: '80kcal',
      sugars: '1g',
      saturatedFat: '0g',
      sodium: '13mg',
      costPer100g: '$0.60',
      other: 'Soothing gingerol content',
    },
  },
]
