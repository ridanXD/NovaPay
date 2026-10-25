<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const passwordMismatch = computed(
  () => form.confirmPassword !== '' && form.password !== form.confirmPassword,
)

function handleSubmit() {
  if (passwordMismatch.value) return
  // Belum ada backend, jadi langsung arahkan ke halaman login
  router.push('/login')
}
</script>

<template>
  <AuthLayout title="Daftar" subtitle="Buat akun NovaPay kamu.">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="field">
        <label for="name">Nama lengkap</label>
        <input id="name" v-model="form.name" type="text" placeholder="Nama kamu" required />
      </div>

      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="nama@email.com"
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
          :class="{ invalid: passwordMismatch }"
          required
        />
        <span v-if="passwordMismatch" class="error">Password tidak sama</span>
      </div>

      <button type="submit" class="btn-primary">Daftar</button>

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
