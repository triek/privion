import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import CoachView from '../views/CoachView.vue'
import HomeView from '../views/HomeView.vue'
import InsightsView from '../views/InsightsView.vue'
import LogView from '../views/LogView.vue'
import WalletView from '../views/WalletView.vue'

const base = import.meta.env.PROD ? '/privion/' : '/'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/log',
    name: 'log',
    component: LogView,
  },
  {
    path: '/coach',
    name: 'coach',
    component: CoachView,
  },
  {
    path: '/insights',
    name: 'insights',
    component: InsightsView,
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: WalletView,
  },
]

const router = createRouter({
  history: createWebHistory(base),
  routes,
})

export default router
