import Navbar from './components/Navbar'

export default function App() {
  return (
    <main>
      <Navbar />
      <section id="home" className="hero">
        <h1>Bayar dan kirim uang<br /><span>tanpa ribet.</span></h1>
        <p className="intro">NovaPay bantu kamu mengatur pembayaran sehari-hari dalam satu tempat.</p>
      </section>

      <section id="features" className="features">
        <h2>Yang kamu butuhkan</h2>
        <article><span>01</span><div><h3>Bayar dengan mudah</h3><p>Selesaikan pembayaran tanpa langkah yang berbelit.</p></div></article>
        <article><span>02</span><div><h3>Kirim uang cepat</h3><p>Kirim uang ke teman dan keluarga dengan praktis.</p></div></article>
        <article><span>03</span><div><h3>Pantau transaksi</h3><p>Lihat aktivitas pembayaranmu di satu tempat.</p></div></article>
      </section>
    </main>
  )
}
