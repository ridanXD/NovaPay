
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

    <main class="landing__main">
      <section id="home" class="hero">
        <h1>
          Bayar dan kirim uang<br />
          <span>tanpa ribet.</span>
        </h1>

        <p class="intro">
          NovaPay bantu kamu mengatur pembayaran sehari-hari
          dalam satu tempat.
        </p>
      </section>

      <section id="features" class="features">
        <h2>Yang kamu butuhkan</h2>

        <DataState
          :loading="loading"
          :error="error"
          @retry="load"
        >
          <article
            v-for="(feature, index) in features || []"
            :key="feature.id"
          >
            <span>
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </article>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  color: #17182b;
  background: #fff;
}

.landing__main {
  flex: 1;
  width: 100%;
}

.hero,
.features {
  width: min(760px, calc(100% - 40px));
  margin-inline: auto;
}

.hero {
  max-width: 680px;
  margin-top: 105px;
  margin-bottom: 120px;
  text-align: center;
}

h1,
h2,
h3 {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

h1 {
  margin-bottom: 18px;
  font-size: clamp(42px, 7vw, 64px);
  line-height: 1.12;
  letter-spacing: -0.06em;
}

h1 span {
  color: var(--primary);
}

.intro {
  max-width: 430px;
  margin: 0 auto;
  color: #77798c;
  font-size: 15px;
  line-height: 1.8;
}

.features {
  padding-bottom: 75px;
}

.features h2 {
  margin-bottom: 18px;
  font-size: 22px;
  letter-spacing: -0.04em;
}

.features article {
  display: flex;
  gap: 22px;
  align-items: baseline;
  padding: 18px 0;
  border-top: 1px solid #eeeef3;
}

.features article > span {
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
}

.features h3 {
  margin: 0 0 5px;
  font-size: 14px;
}

.features article p {
  margin: 0;
  color: #77798c;
  font-size: 12px;
  line-height: 1.6;
}

.landing__footer {
  padding: 24px 20px;
  border-top: 1px solid #eeeef3;
  color: #77798c;
  font-size: 12px;
  text-align: center;
}

.landing__footer p {
  margin: 0;
}

@media (max-width: 560px) {
  .hero {
    margin-top: 80px;
    margin-bottom: 92px;
  }

  .intro {
    font-size: 14px;
  }

  .features {
    padding-bottom: 58px;
  }
}
</style>
