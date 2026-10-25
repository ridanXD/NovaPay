# NovaPay

Aplikasi pembayaran NovaPay, dibuat dengan Vue 3, Vue Router, dan Vite.

## Menjalankan project

```sh
npm install
npm run dev
```

## Struktur folder

```
src/
├── assets/
│   └── styles/          CSS bersama (global, form auth, dashboard)
├── components/          Komponen kecil yang dipakai ulang
├── router/index.js      Daftar halaman (route)
├── views/               Satu file per halaman
├── App.vue
└── main.js
```

## Halaman

| Route           | File                         |
| --------------- | ---------------------------- |
| `/`             | `views/LandingView.vue`      |
| `/login`        | `views/LoginView.vue`        |
| `/register`     | `views/RegisterView.vue`     |
| `/dashboard`    | `views/DashboardView.vue`    |
| `/transactions` | `views/TransactionHistoryView.vue` |
| `/api-docs`     | `views/ApiDocumentationView.vue`   |
| `/kasir-cepat`  | `views/KasirCepatView.vue`   |

Halaman baru dibuat di `src/views/` dengan nama berakhiran `View`, lalu didaftarkan di `src/router/index.js`.
