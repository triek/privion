import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NutritionView from '../views/NutritionView.vue'
import SignupView from '../views/SignupView.vue'
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
    path: '/nutrition',
    name: 'nutrition',
    component: NutritionView,
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
