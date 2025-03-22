import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import HealthPlan from '../views/HealthPlan.vue'
import UserReview from '../views/UserReview.vue';
import UserAppointment from '../views/UserAppointment.vue';


const routes = [
  { path: '/', component: Login },
  { path: '/profile', component: Profile },
  { path: '/health-plans', component: HealthPlan },
  { path: '/reviews', component: UserReview },
  { path: '/appointments', component: UserAppointment }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router