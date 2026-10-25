<script setup>
import { reactive } from 'vue'
import AuthLayout from '../components/AuthLayout.vue'

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

function handleSubmit() {
  console.log('login', form)
}
</script>

<template>
  <AuthLayout title="Masuk" subtitle="Selamat datang kembali.">
    <form class="form" @submit.prevent="handleSubmit">
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
          placeholder="Masukkan password"
          required
        />
      </div>

      <div class="row">
        <label class="check">
          <input v-model="form.remember" type="checkbox" />
          Ingat saya
        </label>
        <a href="#">Lupa password?</a>
      </div>

      <button type="submit" class="btn-primary">Masuk</button>

      <p class="switch">
        Belum punya akun?
        <RouterLink to="/register">Daftar</RouterLink>
      </p>
    </form>
  </AuthLayout>
</template>

<style scoped>
@import '../components/auth-form.css';
</style>
