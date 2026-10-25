<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import '../assets/styles/dashboard.css'

const menuOpen = ref(false)

const mainMenu = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Kasir Cepat', to: '/kasir-cepat' },
  { label: 'Riwayat', to: '/transactions' },
  { label: 'Integrasi', to: '/api-docs' },
]

const accountMenu = [
  { label: 'Register', to: '/register' },
  { label: 'Login', to: '/login' },
]
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <button
        class="hamburger"
        type="button"
        aria-label="Buka menu navigasi"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <RouterLink to="/dashboard" class="brand" aria-label="NovaPay">
        Nova<span>Pay</span>
      </RouterLink>
    </header>

    <div v-if="menuOpen" class="scrim" @click="menuOpen = false"></div>

    <aside v-if="menuOpen" class="sidebar" aria-label="Menu navigasi">
      <div class="sidebar-top">
        <div class="brand" aria-label="NovaPay">
          Nova<span>Pay</span>
        </div>

        <button
          class="close-menu"
          type="button"
          aria-label="Tutup menu"
          @click="menuOpen = false"
        >
          ×
        </button>
      </div>

      <nav class="navigation" aria-label="Navigasi utama">
        <p class="menu-heading">FITUR UTAMA</p>

        <RouterLink
          v-for="item in mainMenu"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          exact-active-class="active"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </RouterLink>

        <p class="menu-heading account-heading">AKUN</p>

        <RouterLink
          v-for="item in accountMenu"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          exact-active-class="active"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      © 2026 NovaPay
    </footer>
  </div>
</template>
