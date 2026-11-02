import { ref, onMounted } from 'vue'

// Mengurus data, status loading, dan pesan error untuk satu pemanggilan API.
// Contoh: const { data, loading, error, load } = useFetch(getProducts)
export function useFetch(apiFunction) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function load() {
    loading.value = true
    error.value = ''

    try {
      data.value = await apiFunction()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { data, loading, error, load }
}
