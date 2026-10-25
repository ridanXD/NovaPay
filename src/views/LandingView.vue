<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <main class="landing">
    <Navbar />
    <section id="home" class="hero">
      <h1>Bayar dan kirim uang<br /><span>tanpa ribet.</span></h1>
      <p class="intro">NovaPay bantu kamu mengatur pembayaran sehari-hari dalam satu tempat.</p>
    </section>

    <section id="features" class="features">
      <h2>Yang kamu butuhkan</h2>
      <article><span>01</span><div><h3>Bayar dengan mudah</h3><p>Selesaikan pembayaran tanpa langkah yang berbelit.</p></div></article>
      <article><span>02</span><div><h3>Kirim uang cepat</h3><p>Kirim uang ke teman dan keluarga dengan praktis.</p></div></article>
      <article><span>03</span><div><h3>Pantau transaksi</h3><p>Lihat aktivitas pembayaranmu di satu tempat.</p></div></article>
    </section>
  </main>
</template>

<style scoped>
.landing {
  width: 100%;
  min-height: 100vh;
  margin: auto;
  color: #17182b;
  background: #fff;
}

.hero,
.features {
  width: min(760px, calc(100% - 40px));
  margin-inline: auto;
}

.hero {
  max-width: 680px;
  margin: 105px auto 120px;
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
  margin: 0 auto 26px;
  color: #77798c;
  font-size: 15px;
  line-height: 1.8;
}

.features {
  max-width: 760px;
  margin: auto;
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
}

@media (max-width: 560px) {
  .hero {
    margin: 80px auto 92px;
  }

  .intro {
    font-size: 14px;
  }

  .features {
    padding-bottom: 58px;
  }
}
</style>
