<script setup>
import { ref } from 'vue'
import StatCard from './components/StatCard.vue'
import './dashboard.css'

const menuOpen = ref(false)
const activePage = ref('Dashboard')

function selectPage(page) {
  activePage.value = page
  menuOpen.value = false
}
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

      <div class="brand" aria-label="NovaPay">
        Nova<span>Pay</span>
      </div>
    </header>

    <div
      v-if="menuOpen"
      class="scrim"
      @click="menuOpen = false"
    ></div>

    <aside
      v-if="menuOpen"
      class="sidebar"
      aria-label="Menu navigasi"
    >
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

        <button
          v-for="page in [
            'Dashboard',
            'Kasir Cepat',
            'Riwayat',
            'Integrasi',
            'Landing Page'
          ]"
          :key="page"
          class="nav-item"
          :class="{ active: activePage === page }"
          type="button"
          :aria-current="activePage === page ? 'page' : undefined"
          @click="selectPage(page)"
        >
          {{ page }}
        </button>

        <p class="menu-heading account-heading">AKUN</p>

        <button
          v-for="page in ['Register', 'Login']"
          :key="page"
          class="nav-item"
          :class="{ active: activePage === page }"
          type="button"
          :aria-current="activePage === page ? 'page' : undefined"
          @click="selectPage(page)"
        >
          {{ page }}
        </button>
      </nav>
    </aside>

    <main class="main-content">
      <div
        v-if="activePage === 'Dashboard'"
        class="dashboard-content"
      >
        <section
          class="section"
          aria-labelledby="account-title"
        >
          <h1 id="account-title" class="section-title">
            RINGKASAN AKUN
          </h1>

          <article class="balance-card">
            <div class="balance-copy">
              <p class="card-kicker">Saldo Aktif</p>

              <p class="balance-caption">
                Saldo yang tersedia untuk ditarik
              </p>

              <p class="balance-amount">
                Rp 1.250.000
              </p>
            </div>

            <div class="balance-actions">
              <button
                class="withdraw-button"
                type="button"
              >
                Tarik Dana
                <span aria-hidden="true">→</span>
              </button>

              <p class="withdraw-fee">
                Biaya tarik Rp 3.500
              </p>
            </div>
          </article>
        </section>

        <section
          class="section transactions-section"
          aria-labelledby="transactions-title"
        >
          <h2
            id="transactions-title"
            class="section-title"
          >
            RINGKASAN TRANSAKSI
          </h2>

          <div class="stats-grid">
            <StatCard
              title="Transaksi Bulan Ini"
              subtitle="Oktober 2026"
              value="Rp 4.850.000"
            />

            <StatCard
              title="Transaksi Hari Ini"
              subtitle="25 Oktober 2026"
              value="Rp 325.000"
            />

            <StatCard
              title="Total Transaksi Pending"
              subtitle="Menunggu pembayaran"
              value="Rp 75.000"
            />

            <StatCard
              title="Volume My QRIS"
              subtitle="Bulan ini"
              value="Rp 1.200.000"
            />

            <StatCard
              title="Success Rate"
              subtitle="Transaksi berhasil"
              value="96,4%"
              :progress="96.4"
            />
          </div>
        </section>
      </div>

      <div
        v-else
        class="blank-page"
        :aria-label="`Halaman ${activePage}`"
      ></div>
    </main>

    <footer class="footer">
      © 2026 NovaPay
    </footer>
  </div>
</template>