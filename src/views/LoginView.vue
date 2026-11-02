<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'
import { getUsers } from '../services/api'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const loading = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''

  try {
    // Ambil daftar akun dari mock API (public/data/users.json)
    const users = await getUsers()

    const user = users.find(
      (item) => item.email === form.email && item.password === form.password,
    )

    if (!user) {
      errorMessage.value = 'Email atau password salah.'
      return
    }

    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout title="Masuk" subtitle="Selamat datang kembali.">
    <form class="form" @submit.prevent="handleSubmit">
      <p v-if="errorMessage" class="alert alert-error" role="alert">
        {{ errorMessage }}
      </p>

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
          placeholder="Masukkan password"
          autocomplete="current-password"
          required
        />
      </div>

      <label class="check">
        <input v-model="form.remember" type="checkbox" />
        Ingat saya
      </label>

      <button type="submit" class="btn-primary" :disabled="loading">
        {{ loading ? 'Memproses...' : 'Masuk' }}
      </button>

      <p class="switch">
        Belum punya akun?
        <RouterLink to="/register">Daftar</RouterLink>
      </p>
    </form>
  </AuthLayout>
</template>

<style scoped>
@import '../assets/styles/auth-form.css';
</style>
