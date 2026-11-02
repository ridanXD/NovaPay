<template>
  <div class="page-wrapper">
    <div class="history-container">
      
      
      <header class="history-header">
        <h2>Riwayat Transaksi</h2>
        <p class="subtitle">Daftar seluruh transaksi masuk dan keluar akun NovaPay Anda</p>
      </header>

     
      <DataState :loading="loading" :error="error" @retry="load">
        
        
        <section class="summary-grid">
          <div class="card summary-card highlighted">
            <span class="summary-label">Hari Ini</span>
            <div class="summary-value">{{ formatCurrency(summary.today || 0) }}</div>
            <span class="summary-subtext">Total aktivitas hari ini</span>
          </div>

          <div class="card summary-card highlighted">
            <span class="summary-label">Minggu Ini</span>
            <div class="summary-value">{{ formatCurrency(summary.thisWeek || 0) }}</div>
            <span class="summary-subtext">Total aktivitas minggu ini</span>
          </div>

          <div class="card summary-card highlighted">
            <span class="summary-label">Bulan Ini</span>
            <div class="summary-value">{{ formatCurrency(summary.thisMonth || 0) }}</div>
            <span class="summary-subtext">Total aktivitas bulan ini</span>
          </div>
        </section>

       
        <div class="card main-card">
          <div class="section-title">
            <h3>Seluruh Transaksi</h3>
          </div>

          <!-- Filter & Pencarian -->
          <div class="filter-bar">
            <div class="search-box">
              <svg 
                class="search-icon" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Cari seluruh transaksi atau penerima..." 
                class="search-input"
                aria-label="Cari transaksi atau penerima"
              />
            </div>

            <div class="filter-group">
              <select 
                v-model="selectedFilter" 
                class="filter-select"
                aria-label="Filter jenis transaksi"
              >
                <option value="all">Semua Jenis</option>
                <option value="transfer">Transfer</option>
                <option value="topup">Top Up</option>
                <option value="pembayaran">Pembayaran</option>
              </select>
            </div>
          </div>

          
          <div class="table-responsive">
            <table class="history-table">
              <thead>
                <tr>
                  <th>Tanggal & Waktu</th>
                  <th>Keterangan</th>
                  <th>Tipe</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredTransactions.length === 0">
                  <td colspan="5" class="empty-state">
                    Tidak ada transaksi yang ditemukan.
                  </td>
                </tr>
                <tr v-for="item in filteredTransactions" :key="item.id">
                  <td class="date-cell">{{ formatDate(item.date) }}</td>
                  <td class="description-cell">
                    <span class="title-text">{{ item.title }}</span>
                    <span class="sub-text">{{ item.recipientOrSender }}</span>
                  </td>
                  <td class="type-cell">{{ item.type }}</td>
                  <td :class="['amount-cell', item.isIncome ? 'income' : 'expense']">
                    {{ item.isIncome ? '+' : '-' }} {{ formatCurrency(item.amount) }}
                  </td>
                  <td :class="['status-cell', item.status ? item.status.toLowerCase() : '']">
                    {{ item.status }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </DataState>

    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useFetch } from '../composables/useFetch'
import { getTransactions } from '../services/api'
import DataState from '../components/DataState.vue'

export default {
  name: 'TransactionHistoryView',
  components: {
    DataState
  },
  setup() {
    const searchQuery = ref('')
    const selectedFilter = ref('all')
    
    
    const { data, loading, error, load } = useFetch(getTransactions)

    onMounted(() => {
      load()
    })

    const summary = computed(() => data.value?.summary || {})
    const transactions = computed(() => data.value?.transactions || [])

    const filteredTransactions = computed(() => {
      return transactions.value.filter(item => {
        const rawType = (item.type || '').toLowerCase()
        
        let normalizedType = rawType
        if (rawType.includes('pay') || rawType.includes('bayar')) {
          normalizedType = 'pembayaran'
        } else if (rawType.includes('top')) {
          normalizedType = 'topup'
        }

        const currentFilter = selectedFilter.value.toLowerCase()
        const matchesFilter = currentFilter === 'all' || normalizedType === currentFilter
          
        const matchesSearch = (item.title && item.title.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
          (item.recipientOrSender && item.recipientOrSender.toLowerCase().includes(searchQuery.value.toLowerCase()))

        return matchesFilter && matchesSearch
      })
    })

    const formatCurrency = (val) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(val)
    }

    const formatDate = (dateString) => {
      if (!dateString) return '-'
      const options = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }
      return new Date(dateString).toLocaleDateString('id-ID', options)
    }

    return {
      searchQuery,
      selectedFilter,
      loading,
      error,
      load,
      summary,
      filteredTransactions,
      formatCurrency,
      formatDate
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

.page-wrapper {
  background-color: #F8FAFC;
  min-height: 100vh;
  padding: 32px 24px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #0F172A;
  box-sizing: border-box;
}

.history-container {
  max-width: 1000px;
  margin: 0 auto;
}

.history-header {
  margin-bottom: 24px;
}

.history-header h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 4px 0;
}

.subtitle {
  color: #64748B;
  font-size: 14px;
  margin: 0;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  display: flex;
  flex-direction: column;
}

.summary-card.highlighted {
  border: 2px solid #6366F1;
  background-color: #FFFFFF;
}

.summary-label {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #6366F1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-value {
  font-size: 22px;
  font-weight: 700;
  color: #0F172A;
  margin: 6px 0 2px 0;
}

.summary-subtext {
  font-size: 12px;
  color: #94A3B8;
}

.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #F1F5F9;
}

.section-title h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 16px 0;
}

.filter-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94A3B8;
}

.search-input {
  width: 100%;
  padding: 10px 14px 10px 42px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #0F172A;
  background-color: #FAFAFA;
}

.search-input:focus, .filter-select:focus {
  border-color: #6366F1;
  background-color: #FFFFFF;
}

.filter-select {
  padding: 10px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #334155;
  background-color: #FAFAFA;
  cursor: pointer;
}

.table-responsive {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid #F1F5F9;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
  background-color: #FFFFFF;
}

.history-table th {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  background-color: #EEF2FF;
  color: #6366F1;
  padding: 14px 18px;
  border-bottom: 1px solid #E0E7FF;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.history-table td {
  padding: 16px 18px;
  border-bottom: 1px solid #F1F5F9;
  color: #334155;
}

.history-table tr:last-child td {
  border-bottom: none;
}

.date-cell {
  color: #64748B;
  white-space: nowrap;
  font-size: 13px;
}

.description-cell .title-text {
  display: block;
  color: #0F172A;
  font-weight: 600;
  font-size: 14px;
}

.description-cell .sub-text {
  color: #94A3B8;
  font-size: 12px;
}

.type-cell {
  color: #475569;
}

.amount-cell {
  font-weight: 600;
}

.amount-cell.income {
  color: #10B981;
}

.amount-cell.expense {
  color: #0F172A;
}

.status-cell {
  font-weight: 600;
  font-size: 13px;
}

.status-cell.berhasil {
  color: #10B981;
}

.status-cell.diproses {
  color: #F59E0B;
}

.status-cell.gagal {
  color: #EF4444;
}

.empty-state {
  text-align: center;
  color: #94A3B8;
  padding: 32px;
}


@media (max-width: 640px) {
  .page-wrapper {
    padding: 16px 12px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select {
    width: 100%;
  }

  .card {
    padding: 16px;
  }
}
</style>