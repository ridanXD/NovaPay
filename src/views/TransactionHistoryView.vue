<template>
  <div class="page-wrapper">
    <div class="history-container">
      
      <!-- Header Halaman -->
      <header class="history-header">
        <h2>Riwayat Transaksi</h2>
        <p class="subtitle">Daftar seluruh transaksi masuk dan keluar akun NovaPay Anda</p>
      </header>

      <!-- Section Ringkasan Aktivitas Transaksi -->
      <section class="summary-grid">
        <div class="card summary-card">
          <span class="summary-label">Hari Ini</span>
          <div class="summary-value">{{ formatCurrency(summary.today) }}</div>
          <span class="summary-subtext">Total aktivitas hari ini</span>
        </div>

        <div class="card summary-card">
          <span class="summary-label">Minggu Ini</span>
          <div class="summary-value">{{ formatCurrency(summary.thisWeek) }}</div>
          <span class="summary-subtext">Total aktivitas minggu ini</span>
        </div>

        <div class="card summary-card">
          <span class="summary-label">Bulan Ini</span>
          <div class="summary-value">{{ formatCurrency(summary.thisMonth) }}</div>
          <span class="summary-subtext">Total aktivitas bulan ini</span>
        </div>
      </section>

      <!-- Section Seluruh Transaksi -->
      <div class="card main-card">
        <div class="card-heading">
          <h3>Seluruh Transaksi</h3>
        </div>

        <!-- Filter & Pencarian -->
        <div class="filter-bar">
          <div class="search-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Cari seluruh transaksi atau penerima..." 
              class="search-input"
            />
          </div>

          <div class="filter-group">
            <select v-model="selectedFilter" class="filter-select">
              <option value="all">Semua Jenis</option>
              <option value="transfer">Transfer</option>
              <option value="topup">Top Up</option>
              <option value="payment">Pembayaran</option>
            </select>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="state-message">
          Memuat data riwayat...
        </div>

        <!-- Error State -->
        <div v-else-if="errorMessage" class="state-message error">
          {{ errorMessage }}
        </div>

        <!-- Tabel Riwayat Seluruh Transaksi -->
        <div v-else class="table-responsive">
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
                <td :class="['status-cell', item.status.toLowerCase()]">
                  {{ item.status }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionHistory',
  data() {
    return {
      searchQuery: '',
      selectedFilter: 'all',
      isLoading: false,
      errorMessage: '',
      // Data Ringkasan
      summary: {
        today: 750000,
        thisWeek: 2450000,
        thisMonth: 8900000
      },
      // Data Seluruh Transaksi
      transactions: [
        {
          id: 'TRX-1001',
          title: 'Transfer ke BNI',
          recipientOrSender: 'Erleazar Aryawiguna',
          type: 'Transfer',
          amount: 250000,
          isIncome: false,
          date: '2026-10-25T14:32:00',
          status: 'Berhasil'
        },
        {
          id: 'TRX-1002',
          title: 'Top Up Saldo',
          recipientOrSender: 'VA Mandiri',
          type: 'Topup',
          amount: 500000,
          isIncome: true,
          date: '2026-10-25T09:15:00',
          status: 'Berhasil'
        },
        {
          id: 'TRX-1003',
          title: 'Pembayaran PLN',
          recipientOrSender: 'PLN Postpaid',
          type: 'Payment',
          amount: 125000,
          isIncome: false,
          date: '2026-10-24T19:40:00',
          status: 'Gagal'
        },
        {
          id: 'TRX-1004',
          title: 'Terima Transfer',
          recipientOrSender: 'Siti Rahma',
          type: 'Transfer',
          amount: 150000,
          isIncome: true,
          date: '2026-10-23T11:05:00',
          status: 'Diproses'
        }
      ]
    }
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(item => {
        const matchesFilter = this.selectedFilter === 'all' || 
          item.type.toLowerCase() === this.selectedFilter.toLowerCase();
          
        const matchesSearch = item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.recipientOrSender.toLowerCase().includes(this.searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
      });
    }
  },
  methods: {
    formatCurrency(val) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(val);
    },
    formatDate(dateString) {
      const options = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  background-color: var(--bg);
  min-height: 100vh;
  padding: 32px 24px;
  font-family: var(--font-body);
  color: var(--text);
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
  font-family: var(--font-heading);
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 4px 0;
}

.subtitle {
  color: var(--muted);
  font-size: 14px;
  margin: 0;
}

/* Grid Card Ringkasan */
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

.summary-label {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-value {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  margin: 6px 0 2px 0;
}

.summary-subtext {
  font-size: 12px;
  color: #9ca3af;
}

/* Card Utama */
.card {
  background: var(--white);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border);
}

.card.summary-card {
  border-top: 4px solid var(--primary);
}

.card-heading h3 {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 16px 0;
}

/* Filter Bar */
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
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 10px 14px 10px 42px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  font-family: var(--font-body);
  color: var(--text);
  background-color: var(--white);
}

.search-input:focus, .filter-select:focus {
  border-color: var(--primary);
  background-color: var(--white);
  box-shadow: 0 0 0 4px var(--primary-soft);
}

.search-box:focus-within .search-icon {
  color: var(--primary);
}

.filter-select {
  padding: 10px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  font-family: var(--font-body);
  color: var(--text);
  background-color: var(--white);
  cursor: pointer;
}

/* Tabel */
.table-responsive {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid var(--border);
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
  background-color: var(--white);
}

.history-table th {
  font-family: var(--font-heading);
  font-weight: 600;
  background-color: var(--primary-soft);
  color: var(--primary-dark);
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.history-table td {
  padding: 16px 18px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
}

.history-table tbody tr:hover td {
  background-color: #f7f7ff;
}

.history-table tr:last-child td {
  border-bottom: none;
}

.date-cell {
  color: var(--muted);
  white-space: nowrap;
  font-size: 13px;
}

.description-cell .title-text {
  display: block;
  color: var(--text);
  font-weight: 600;
  font-size: 14px;
}

.description-cell .sub-text {
  color: #9ca3af;
  font-size: 12px;
}

.type-cell {
  color: var(--muted);
}

.amount-cell {
  font-family: var(--font-heading);
  font-weight: 600;
}

.amount-cell.income {
  color: var(--accent);
}

.amount-cell.expense {
  color: var(--text);
}

.status-cell {
  font-weight: 600;
  font-size: 13px;
}

.status-cell.berhasil {
  color: var(--accent);
}

.status-cell.diproses {
  color: #F59E0B;
}

.status-cell.gagal {
  color: #EF4444;
}

.state-message {
  text-align: center;
  padding: 40px;
  color: var(--muted);
}

.state-message.error {
  color: #EF4444;
}

.empty-state {
  text-align: center;
  color: #9ca3af;
  padding: 32px;
}
</style>