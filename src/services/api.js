// Semua pengambilan data lewat file ini.
// Datanya ada di folder public/data (mock API), diambil pakai fetch.

const BASE_URL = '/data'

// Jeda kecil supaya tampilan loading kelihatan, seperti memanggil server sungguhan
const DELAY = 500

async function request(path) {
  await new Promise((resolve) => setTimeout(resolve, DELAY))

  const response = await fetch(`${BASE_URL}/${path}`)

  if (!response.ok) {
    throw new Error('Gagal memuat data. Coba lagi nanti.')
  }

  return response.json()
}

export const getDashboard = () => request('dashboard.json')
export const getProducts = () => request('products.json')
export const getTransactions = () => request('transactions.json')
export const getUsers = () => request('users.json')
export const getFeatures = () => request('features.json')
