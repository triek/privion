export type IngredientCategory = 'Protein' | 'Carbs' | 'Fiber' | 'Spices'

export interface IngredientCardData {
  name: string
  category: IngredientCategory
  stats: {
    protein: string
    carbs: string
    fiber: string
  }
}

export const ingredientLibrary: IngredientCardData[] = [
  {
    name: 'Wild-caught salmon',
    category: 'Protein',
    stats: {
      protein: '22g',
      carbs: '0g',
      fiber: '0g',
    },
  },
  {
    name: 'Pasture-raised chicken thighs',
    category: 'Protein',
    stats: {
      protein: '20g',
      carbs: '0g',
      fiber: '0g',
    },
  },
  {
    name: 'Fermented tempeh',
    category: 'Protein',
    stats: {
      protein: '19g',
      carbs: '12g',
      fiber: '7g',
    },
  },
  {
    name: 'Roasted sweet potatoes',
    category: 'Carbs',
    stats: {
      protein: '2g',
      carbs: '26g',
      fiber: '4g',
    },
  },
  {
    name: 'Sprouted quinoa',
    category: 'Carbs',
    stats: {
      protein: '8g',
      carbs: '39g',
      fiber: '5g',
    },
  },
  {
    name: 'Sourdough country loaf',
    category: 'Carbs',
    stats: {
      protein: '9g',
      carbs: '47g',
      fiber: '3g',
    },
  },
  {
    name: 'Chia seeds',
    category: 'Fiber',
    stats: {
      protein: '5g',
      carbs: '12g',
      fiber: '10g',
    },
  },
  {
    name: 'Rainbow chard',
    category: 'Fiber',
    stats: {
      protein: '3g',
      carbs: '7g',
      fiber: '3g',
    },
  },
  {
    name: 'French green lentils',
    category: 'Fiber',
    stats: {
      protein: '18g',
      carbs: '40g',
      fiber: '16g',
    },
  },
  {
    name: 'Smoked paprika',
    category: 'Spices',
    stats: {
      protein: '1g',
      carbs: '4g',
      fiber: '2g',
    },
  },
  {
    name: 'Toasted cumin seeds',
    category: 'Spices',
    stats: {
      protein: '2g',
      carbs: '3g',
      fiber: '2g',
    },
  },
  {
    name: 'Fresh grated ginger',
    category: 'Spices',
    stats: {
      protein: '1g',
      carbs: '18g',
      fiber: '2g',
    },
  },
]
