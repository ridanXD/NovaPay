<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

defineEmits(['retry'])
</script>

<template>
  <div v-if="loading" class="state" role="status" aria-live="polite">
    <span class="spinner" aria-hidden="true"></span>
    Memuat data...
  </div>

  <div v-else-if="error" class="state state--error" role="alert">
    <p>{{ error }}</p>
    <button type="button" class="retry" @click="$emit('retry')">Coba lagi</button>
  </div>

  <slot v-else />
</template>

<style scoped>
.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 16px;
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 14px;
  text-align: center;
}

.state p {
  margin: 0;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--primary-soft);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.state--error {
  color: #dc2626;
}

.retry {
  padding: 8px 18px;
  color: #fff;
  background: var(--primary);
  border: none;
  border-radius: 8px;
  font-family: var(--font-body);
  font-weight: 600;
  cursor: pointer;
}

.retry:hover {
  background: var(--primary-dark);
}

.retry:focus-visible {
  outline: 3px solid rgba(99, 102, 241, 0.42);
  outline-offset: 2px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
<slot v-else />