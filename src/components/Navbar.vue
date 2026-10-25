<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <a class="navbar__brand" href="#home">NovaPay</a>
    <nav class="navbar__links" aria-label="Navigasi utama">
      <RouterLink class="navbar__link" to="/login">Login</RouterLink>
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
  border-bottom: 1px solid #eeeef3;
  background: #fff;
  padding: 1.25rem;
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

.navbar__link {
  color: #68697b;
  font-weight: 400;
  transition: color 0.2s;
}

.navbar__link:hover {
  color: var(--primary);
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
</style>
