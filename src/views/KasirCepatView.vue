
<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { id: 1, name: 'Nasi Goreng', price: 15000, category: 'Makanan' },
  { id: 2, name: 'Mie Goreng', price: 12000, category: 'Makanan' },
  { id: 3, name: 'Kentang Goreng', price: 10000, category: 'Snack' },
  { id: 4, name: 'Es Teh', price: 5000, category: 'Minuman' },
  { id: 5, name: 'Kopi Susu', price: 12000, category: 'Minuman' },
  { id: 6, name: 'Air Mineral', price: 4000, category: 'Minuman' }
])

const cart = ref([])
const search = ref('')
const category = ref('Semua')
const payment = ref(0)
const message = ref('')

const categories = ['Semua', 'Makanan', 'Snack', 'Minuman']

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchesCategory =
      category.value === 'Semua' ||
      product.category === category.value

    return matchesSearch && matchesCategory
  })
})

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
)

const change = computed(() => Number(payment.value) - total.value)

function addToCart(product) {
  const item = cart.value.find(item => item.id === product.id)

  if (item) {
    item.qty++
  } else {
    cart.value.push({ ...product, qty: 1 })
  }

  message.value = ''
}

function updateQty(item, amount) {
  item.qty += amount

  if (item.qty <= 0) {
    cart.value = cart.value.filter(product => product.id !== item.id)
  }
}

function checkout() {
  if (cart.value.length === 0) {
    message.value = 'Keranjang masih kosong.'
    return
  }

  if (Number(payment.value) < total.value) {
    message.value = 'Uang pembayaran masih kurang.'
    return
  }

  message.value = 'Transaksi berhasil! Kembalian: ' +
    formatRupiah(change.value)

  cart.value = []
  payment.value = 0
}

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)
}
</script>

<template>
  <main class="cashier">
    <header class="page-header">
      <div>
        <h1>Kasir Cepat</h1>
        <p>Pilih produk dan proses pembayaran pelanggan.</p>
      </div>
      <span class="status">● Kasir aktif</span>
    </header>

    <section class="layout">
      <div class="product-section">
        <input
          v-model="search"
          class="search"
          placeholder="Cari nama produk..."
        />

        <div class="categories">
          <button
            v-for="item in categories"
            :key="item"
            :class="{ active: category === item }"
            @click="category = item"
          >
            {{ item }}
          </button>
        </div>

        <div class="products">
          <article
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
          >
            <span class="product-category">{{ product.category }}</span>
            <h3>{{ product.name }}</h3>
            <p>{{ formatRupiah(product.price) }}</p>
            <button class="add-button" @click="addToCart(product)">
              + Tambah
            </button>
          </article>
        </div>
      </div>

      <aside class="cart">
        <h2>Keranjang</h2>
        <p class="muted">{{ cart.length }} jenis produk</p>

        <div v-if="cart.length === 0" class="empty">
          <p>Keranjang masih kosong</p>
          <span>Pilih produk untuk memulai transaksi.</span>
        </div>

        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="cart-info">
            <strong>{{ item.name }}</strong>
            <span>{{ formatRupiah(item.price * item.qty) }}</span>
          </div>

          <div class="quantity">
            <button @click="updateQty(item, -1)">−</button>
            <span>{{ item.qty }}</span>
            <button @click="updateQty(item, 1)">+</button>
          </div>
        </div>

        <div class="total">
          <span>Total pembayaran</span>
          <strong>{{ formatRupiah(total) }}</strong>
        </div>

        <label for="payment">Uang pelanggan (Rp)</label>
        <input
          id="payment"
          v-model.number="payment"
          type="number"
          min="0"
          placeholder="Masukkan nominal"
        />

        <div class="change">
          <span>Kembalian</span>
          <strong>{{ formatRupiah(Math.max(0, change)) }}</strong>
        </div>

        <p v-if="message" class="message">{{ message }}</p>

        <button class="checkout" @click="checkout">
          Proses Pembayaran
        </button>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.cashier {
  padding: 32px;
  color: #20352c;
  background: #f5f8f5;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.page-header p,
.muted {
  color: #77867e;
  margin: 0;
}

.status {
  color: #168052;
  background: #e0f4e8;
  border-radius: 20px;
  padding: 10px 14px;
  font-size: 13px;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 1fr);
  gap: 24px;
}

.search,
.cart input {
  box-sizing: border-box;
  width: 100%;
  padding: 13px;
  border: 1px solid #dce5de;
  border-radius: 10px;
  background: white;
  font-size: 14px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 18px 0;
}

button {
  cursor: pointer;
  font: inherit;
}

.categories button {
  border: 1px solid #dce5de;
  border-radius: 9px;
  padding: 9px 14px;
  background: white;
  color: #53645a;
}

.categories button.active {
  background: #18794e;
  color: white;
  border-color: #18794e;
}

.products {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.product-card,
.cart {
  background: white;
  border: 1px solid #e5ece6;
  border-radius: 14px;
  padding: 18px;
}

.product-category {
  color: #188052;
  font-size: 12px;
}

.product-card h3 {
  margin: 14px 0 8px;
}

.product-card p {
  font-weight: bold;
}

.add-button,
.checkout {
  width: 100%;
  border: 0;
  border-radius: 9px;
  padding: 12px;
  background: #18794e;
  color: white;
}

.cart h2 {
  margin: 0 0 8px;
}

.empty {
  text-align: center;
  padding: 28px 0;
  color: #77867e;
}

.empty span {
  font-size: 13px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 16px 0;
  border-bottom: 1px solid #edf1ed;
}

.cart-info {
  display: grid;
  gap: 7px;
}

.cart-info span {
  font-size: 13px;
  color: #77867e;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity button {
  border: 1px solid #dce5de;
  background: white;
  border-radius: 6px;
  width: 28px;
  height: 28px;
}

.total,
.change {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 20px 0;
}

.cart label {
  display: block;
  font-size: 13px;
  margin-bottom: 8px;
}

.message {
  color: #b45309;
  font-size: 13px;
}

.checkout {
  margin-top: 10px;
  font-weight: bold;
}

@media (max-width: 760px) {
  .cashier {
    padding: 18px;
  }

  .layout {
    grid-template-columns: 1fr;
  }

  .products {
    grid-template-columns: 1fr 1fr;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
