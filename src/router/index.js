import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../DashboardView.vue'
import TransactionHistory from '../components/TransactionHistory.vue'
import ApiDocumentation from '../components/ApiDocumentation.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/transactions', name: 'transactions', component: TransactionHistory },
    { path: '/api-docs', name: 'api-docs', component: ApiDocumentation },
  ],
})

export default router
