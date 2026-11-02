
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <a class="navbar__brand" href="#home">
      NovaPay
    </a>

    <nav class="navbar__links" aria-label="Navigasi utama">
      <RouterLink class="navbar__login" to="/login">
        Login
      </RouterLink>

      <RouterLink class="navbar__register" to="/register">
        Daftar
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid #eeeef3;
  background: #fff;
}

.navbar__brand {
  color: #17182b;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.875rem;
}

.navbar__login {
  color: var(--primary);
  font-weight: 600;
  transition: color 0.2s ease;
}

.navbar__login:hover {
  color: var(--primary-dark);
}

.navbar__register {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  border-radius: 8px;
  color: #fff;
  background: var(--primary);
  font-weight: 600;
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.navbar__register:hover {
  color: #fff;
  background: var(--primary-dark);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  transform: translateY(-2px);
}

.navbar__register:active {
  transform: translateY(0);
}

.navbar__login:focus-visible,
.navbar__register:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 3px;
}

@media (min-width: 640px) {
  .navbar {
    padding-inline: 2rem;
  }

  .navbar__links {
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .navbar {
    padding-inline: 3.5rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 1rem;
  }

  .navbar__links {
    gap: 0.75rem;
  }

  .navbar__register {
    padding: 9px 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar__login,
  .navbar__register {
    transition: none;
  }

  .navbar__register:hover {
    transform: none;
  }
}
</style>
