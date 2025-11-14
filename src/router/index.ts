import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IngredientBookView from '../views/IngredientBookView.vue'
import LoginView from '../views/LoginView.vue'
import NutritionView from '../views/NutritionView.vue'
import RecipeBookView from '../views/RecipeBookView.vue'
import SignupView from '../views/SignupView.vue'
import WorkoutExercisesBookView from '../views/WorkoutExercisesBookView.vue'
import WorkoutRoutineView from '../views/WorkoutRoutineView.vue'
import WorkoutView from '../views/WorkoutView.vue'

const base = import.meta.env.PROD ? '/privion/' : '/'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/workout',
    name: 'workout',
    component: WorkoutView,
  },
  {
    path: '/workout-routine',
    name: 'workout-routine',
    component: WorkoutRoutineView,
  },
  {
    path: '/nutrition',
    name: 'nutrition',
    component: NutritionView,
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipeBookView,
  },
  {
    path: '/workout-exercises',
    name: 'workout-exercises',
    component: WorkoutExercisesBookView,
  },
  {
    path: '/ingredients',
    name: 'ingredients',
    component: IngredientBookView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
]

const router = createRouter({
  history: createWebHistory(base),
  routes,
})

export default router
