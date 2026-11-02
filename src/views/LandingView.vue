
<script setup>
import LandingNavbar from '../components/LandingNavbar.vue'
import DataState from '../components/DataState.vue'
import { getFeatures } from '../services/api'
import { useFetch } from '../composables/useFetch'

const { data: features, loading, error, load } = useFetch(getFeatures)
</script>

<template>
  <div class="landing">
    <LandingNavbar />

    <main>
      <section id="home" class="hero">
        <div class="hero__content">
          <span class="hero__label">PEMBAYARAN DIGITAL</span>

          <h1>
            Bayar dan kirim uang,<br />
            <span>tanpa ribet.</span>
          </h1>

          <p>
            Kelola pembayaran dan kirim uang dengan lebih mudah
            bersama NovaPay.
          </p>
        </div>
      </section>

      <section id="features" class="features">
        <h2>Yang kamu butuhkan</h2>

        <DataState :loading="loading" :error="error" @retry="load">
          <div class="features__grid">
            <article
              v-for="(feature, index) in features || []"
              :key="feature.id"
              class="feature"
            >
              <span class="feature__number">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </article>
          </div>
        </DataState>
      </section>
    </main>

    <footer class="landing__footer">
      <p>&copy; NovaPay. Semua hak dilindungi.</p>
    </footer>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  background: var(--white);
  color: var(--text);
}

.hero {
  display: flex;
  min-height: 65vh;
  align-items: center;
  justify-content: center;
  padding: 100px 24px;
  background: var(--text);
  color: var(--white);
  text-align: center;
}

.hero__content {
  width: 100%;
  max-width: 850px;
}

.hero__label {
  display: inline-block;
  margin-bottom: 24px;
  padding: 8px 16px;
  border: 1px solid var(--primary);
  border-radius: 999px;
  color: var(--white);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.hero h1 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(36px, 6vw, 68px);
  line-height: 1.2;
  letter-spacing: -0.04em;
}

.hero h1 span {
  color: var(--primary);
}

.hero p {
  max-width: 520px;
  margin: 24px auto 0;
  font-size: 20px;
  line-height: 1.8;
}

.features {
  width: min(100%, 1060px);
  margin: 0 auto;
  padding: 80px 24px;
}

.features h2 {
  margin: 0 0 48px;
  font-family: var(--font-heading);
  font-size: 32px;
  font-weight: 700;
  text-align: center;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.feature {
  min-width: 0;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.feature__number {
  color: var(--primary);
  font-size: 14px;
  font-weight: 600;
}

.feature h3 {
  margin: 16px 0 10px;
  font-family: var(--font-heading);
  font-size: 24px;
}

.feature p {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.7;
}

.landing__footer {
  padding: 24px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 12px;
  text-align: center;
}

.landing__footer p {
  margin: 0;
}

@media (max-width: 640px) {
  .hero {
    min-height: 55vh;
    padding: 80px 20px;
  }

  .hero p {
    font-size: 16px;
  }

  .features {
    padding: 56px 20px;
  }

  .features__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
