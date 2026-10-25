import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../DashboardView.vue'
import TransactionHistory from '../components/TransactionHistory.vue'
import ApiDocumentation from '../components/ApiDocumentation.vue'
import KasirCepat from '../views/KasirCepat.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/transactions', name: 'transactions', component: TransactionHistory },
    { path: '/api-docs', name: 'api-docs', component: ApiDocumentation },
    { path: '/kasir-cepat', name: 'kasir-cepat', component: KasirCepat },
  ],
})

export default router
