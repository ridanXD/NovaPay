<script setup>
import { ref } from 'vue'
import StatCard from '../components/StatCard.vue'
import DataState from '../components/DataState.vue'
import { getDashboard } from '../services/api'
import { useFetch } from '../composables/useFetch'
import '../assets/styles/dashboard.css'

const { data, loading, error, load } = useFetch(getDashboard)
const withdrawMessage = ref('')

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)

const formatStat = (stat) =>
  stat.format === 'currency'
    ? formatCurrency(stat.value)
    : `${Number(stat.value).toLocaleString('id-ID', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      })}%`

const handleWithdraw = () => {
  withdrawMessage.value = 'Fitur penarikan dana segera tersedia.'
}
</script>

<template>
  <DataState :loading="loading" :error="error" @retry="load">
    <div v-if="data" class="dashboard-content">
      <section class="section" aria-labelledby="account-title">
        <h1 id="account-title" class="section-title">RINGKASAN AKUN</h1>

        <article class="balance-card">
          <div class="balance-copy">
            <p class="card-kicker">Saldo Aktif</p>
            <p class="balance-caption">Saldo yang tersedia untuk ditarik</p>
            <p class="balance-amount">{{ formatCurrency(data.balance.amount) }}</p>
          </div>

          <div class="balance-actions">
            <button class="withdraw-button" type="button" @click="handleWithdraw">
              Tarik Dana <span aria-hidden="true">→</span>
            </button>
            <p class="withdraw-fee">Biaya tarik {{ formatCurrency(data.balance.withdrawFee) }}</p>
          </div>

          <p v-if="withdrawMessage" class="withdraw-message" role="status">
            {{ withdrawMessage }}
          </p>
        </article>
      </section>

      <section class="section transactions-section" aria-labelledby="transactions-title">
        <h2 id="transactions-title" class="section-title">RINGKASAN TRANSAKSI</h2>

        <div class="stats-grid">
          <StatCard
            v-for="stat in data.stats"
            :key="stat.title"
            :title="stat.title"
            :subtitle="stat.subtitle"
            :value="formatStat(stat)"
            :progress="stat.format === 'percent' ? Number(stat.value) : null"
          />
        </div>
      </section>
    </div>
  </DataState>
</template>