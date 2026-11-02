<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'
import { getUsers } from '../services/api'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const passwordMismatch = computed(
  () => form.confirmPassword !== '' && form.password !== form.confirmPassword,
)

async function handleSubmit() {
  if (passwordMismatch.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    // Ambil daftar akun dari mock API untuk cek email sudah dipakai atau belum
    const users = await getUsers()

    const emailUsed = users.some((item) => item.email === form.email)

    if (emailUsed) {
      errorMessage.value = 'Email sudah terdaftar. Silakan masuk.'
      return
    }

    successMessage.value = 'Akun berhasil dibuat! Mengarahkan ke halaman masuk...'
    setTimeout(() => router.push('/login'), 1500)
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout title="Daftar" subtitle="Buat akun NovaPay kamu.">
    <form class="form" @submit.prevent="handleSubmit">
      <p v-if="errorMessage" class="alert alert-error" role="alert">
        {{ errorMessage }}
      </p>
      <p v-if="successMessage" class="alert alert-success" role="status">
        {{ successMessage }}
      </p>

      <div class="field">
        <label for="name">Nama lengkap</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Nama kamu"
          autocomplete="name"
          required
        />
      </div>

      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="nama@email.com"
          autocomplete="email"
          required
        />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Minimal 8 karakter"
          autocomplete="new-password"
          minlength="8"
          required
        />
      </div>

      <div class="field">
        <label for="confirmPassword">Konfirmasi password</label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          placeholder="Ulangi password"
          autocomplete="new-password"
          :class="{ invalid: passwordMismatch }"
          :aria-invalid="passwordMismatch"
          aria-describedby="confirm-error"
          required
        />
        <span v-if="passwordMismatch" id="confirm-error" class="error">
          Password tidak sama
        </span>
      </div>

      <button type="submit" class="btn-primary" :disabled="loading || successMessage !== ''">
        {{ loading ? 'Memproses...' : 'Daftar' }}
      </button>

      <p class="switch">
        Sudah punya akun?
        <RouterLink to="/login">Masuk</RouterLink>
      </p>
    </form>
  </AuthLayout>
</template>

<style scoped>
@import '../assets/styles/auth-form.css';
</style>
