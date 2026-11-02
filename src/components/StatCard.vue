<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  value: { type: String, required: true },
  progress: { type: Number, default: null },
})
</script>

<template>
  <article class="stat-card">
    <p class="stat-title">{{ title }}</p>
    <p v-if="subtitle" class="stat-subtitle">
      {{ subtitle }}
    </p>
    <p class="stat-value">{{ value }}</p>

    <div
      v-if="progress !== null"
      class="rate-track"
      role="progressbar"
      :aria-label="`Success rate ${progress}%`"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="rate-fill"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </article>
</template>