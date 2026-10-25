import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import TransactionHistoryView from '../views/TransactionHistoryView.vue'
import ApiDocumentationView from '../views/ApiDocumentationView.vue'
import KasirCepatView from '../views/KasirCepatView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/transactions', name: 'transactions', component: TransactionHistoryView },
    { path: '/api-docs', name: 'api-docs', component: ApiDocumentationView },
    { path: '/kasir-cepat', name: 'kasir-cepat', component: KasirCepatView },
  ],
})

export default router
