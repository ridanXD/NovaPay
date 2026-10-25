<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <main class="auth-main">
    <div class="auth-box">
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      <slot />
    </div>
  </main>
</template>

<style scoped>
.auth-main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: var(--white);
}

.auth-box {
  width: 100%;
  max-width: 400px;
}

h1 {
  font-size: 30px;
  font-weight: 600;
  color: var(--text);
}

.subtitle {
  margin: 8px 0 32px;
  color: var(--muted);
}
</style>
