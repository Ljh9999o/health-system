import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/profile', component: Profile },
  { path: '/health-plans', component: () => import('@/views/HealthPlan.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router