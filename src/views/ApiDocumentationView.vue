<template>
  <div class="page-wrapper">
    <div class="docs-container">

      <header class="docs-header">
        <h1>Dokumentasi API &amp; Integrasi</h1>
        <p class="subtitle">Panduan lengkap integrasi payment gateway QRIS NovaPay untuk aplikasi dan sistem bisnis Anda.</p>

        <div class="base-url-card">
          <div class="base-url-info">
            <span class="base-url-label">Base Endpoint URL</span>
            <span class="base-url-value">https://novapay.m1sec.my.id/api.php</span>
          </div>
          <button @click="copyText('https://novapay.m1sec.my.id/api.php', 'base_url')" class="btn-copy-base">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            <span>{{ copiedKeys['base_url'] ? 'Tersalin' : 'Salin Base URL' }}</span>
          </button>
        </div>
      </header>

      <nav class="toc-card">
        <div class="toc-header">
          <h2>Daftar Isi</h2>
          <span>6 Bagian</span>
        </div>
        <div class="toc-grid">
          <a href="#create" class="toc-item">
            <span class="toc-num">1.</span>
            <span>Create Payment</span>
          </a>
          <a href="#snap" class="toc-item">
            <span class="toc-num">2.</span>
            <span>Snap (Popup)</span>
          </a>
          <a href="#check" class="toc-item">
            <span class="toc-num">3.</span>
            <span>Check Status</span>
          </a>
          <a href="#cancel" class="toc-item">
            <span class="toc-num">4.</span>
            <span>Cancel Transaction</span>
          </a>
          <a href="#webhook" class="toc-item">
            <span class="toc-num">5.</span>
            <span>Webhook (Callback)</span>
          </a>
          <a href="#extras" class="toc-item">
            <span class="toc-num">6.</span>
            <span>Fitur Tambahan</span>
          </a>
        </div>
      </nav>

      <section id="create" class="section-block">
        <div class="section-title-row">
          <h2>1. Create Payment</h2>
          <span class="method-tag get">GET</span>
        </div>
        <p class="section-desc">Membuat tagihan transaksi baru dan menghasilkan kode QRIS serta URL pembayaran checkout.</p>

        <div class="request-box">
          <div class="request-box-header">
            <span>REQUEST URL</span>
            <button @click="copyText('https://novapay.m1sec.my.id/api.php?action=createpayment&apikey={APIKEY}&amount={NOMINAL}', 'req_create')" class="btn-copy-link">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['req_create'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <div class="request-url-text">
            https://novapay.m1sec.my.id/api.php?action=createpayment&amp;apikey=<span class="param-hl">{APIKEY}</span>&amp;amount=<span class="param-hl">{NOMINAL}</span>
          </div>
        </div>

        <h3 class="subsection-title">Parameter Tambahan (Opsional)</h3>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Tipe</th>
                <th>Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="param-cell">expiry</td>
                <td class="type-cell">Integer</td>
                <td>Waktu kedaluwarsa dalam menit (Min: 5). Default: 60.</td>
              </tr>
              <tr>
                <td class="param-cell">redirect_url</td>
                <td class="type-cell">String (URL)</td>
                <td>URL tujuan setelah pembayaran sukses (harus di-urlencode).</td>
              </tr>
              <tr>
                <td class="param-cell">template</td>
                <td class="type-cell">String</td>
                <td>Tema halaman pembayaran: default, simple, premium.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="code-card">
          <div class="code-card-header">
            <span class="code-lang">PHP (Server-Side)</span>
            <button @click="copyCode('php_create_code', 'code_create')" class="btn-code-copy">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['code_create'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <pre class="code-pre" id="php_create_code">&lt;?php
<span class="tok-var">$apiKey</span> = <span class="tok-str">'YOUR_API_KEY'</span>;
<span class="tok-var">$amount</span> = <span class="tok-num">10000</span>;
<span class="tok-var">$url</span> = <span class="tok-str">'https://novapay.m1sec.my.id/api.php?action=createpayment&amp;apikey='</span> . <span class="tok-var">$apiKey</span> . <span class="tok-str">'&amp;amount='</span> . <span class="tok-var">$amount</span> . <span class="tok-str">'&amp;expiry=30&amp;template=premium'</span>;

<span class="tok-var">$res</span> = <span class="tok-fn">file_get_contents</span>(<span class="tok-var">$url</span>);
<span class="tok-var">$data</span> = <span class="tok-fn">json_decode</span>(<span class="tok-var">$res</span>, <span class="tok-bool">true</span>);

<span class="tok-kw">if</span> (<span class="tok-var">$data</span>[<span class="tok-str">'status'</span>]) {
    <span class="tok-fn">print_r</span>(<span class="tok-var">$data</span>[<span class="tok-str">'data'</span>]);
}
?&gt;</pre>
        </div>

        <h3 class="subsection-title">Contoh Respon JSON (Sukses)</h3>
        <div class="code-card">
          <div class="code-card-header right-only">
            <button @click="copyCode('json_create_resp', 'resp_create')" class="btn-code-copy-link">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['resp_create'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <pre class="code-pre" id="json_create_resp">{
  <span class="tok-key">"status"</span>: <span class="tok-bool">true</span>,
  <span class="tok-key">"data"</span>: {
    <span class="tok-key">"transaction_id"</span>: <span class="tok-str">"NOVA-ABC12345"</span>,
    <span class="tok-key">"amount"</span>: <span class="tok-num">10123</span>,
    <span class="tok-key">"payment_url"</span>: <span class="tok-str">"https://novapay.m1sec.my.id/pay/..."</span>,
    <span class="tok-key">"qr_image"</span>: <span class="tok-str">"https://novapay.m1sec.my.id/assets/..."</span>,
    <span class="tok-key">"expired_at"</span>: <span class="tok-str">"2026-01-01 12:00:00"</span>
  }
}</pre>
        </div>
      </section>

      <hr class="section-divider" />

      <section id="snap" class="section-block">
        <div class="section-title-row">
          <h2>2. Snap / Popup Integration</h2>
        </div>
        <p class="section-desc">Menerima pembayaran langsung dalam modal popup tanpa me-redirect pelanggan dari halaman toko Anda.</p>

        <div class="step-card">
          <h3 class="step-title">Langkah 1: Backend (Dapatkan Payment URL)</h3>
          <p class="step-desc">Panggil API createpayment dari server Anda untuk mendapatkan payment_url. Tambahkan parameter template=mobile agar tampilan di dalam popup responsif dan pas.</p>

          <div class="code-card">
            <div class="code-card-header">
              <span class="code-lang">PHP (Server-Side)</span>
              <button @click="copyCode('php_snap_backend', 'code_snap_be')" class="btn-code-copy">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['code_snap_be'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="php_snap_backend">&lt;?php
<span class="tok-var">$apiKey</span> = <span class="tok-str">'YOUR_API_KEY'</span>;
<span class="tok-var">$amount</span> = <span class="tok-num">100000</span>;
<span class="tok-var">$apiUrl</span> = <span class="tok-str">'https://novapay.m1sec.my.id/api.php?action=createpayment&amp;apikey='</span> . <span class="tok-var">$apiKey</span> . <span class="tok-str">'&amp;amount='</span> . <span class="tok-var">$amount</span> . <span class="tok-str">'&amp;template=mobile'</span>;

<span class="tok-var">$response</span> = <span class="tok-fn">file_get_contents</span>(<span class="tok-var">$apiUrl</span>);
<span class="tok-var">$data</span> = <span class="tok-fn">json_decode</span>(<span class="tok-var">$response</span>, <span class="tok-bool">true</span>);

<span class="tok-var">$snapToken</span> = <span class="tok-var">$data</span>[<span class="tok-str">'data'</span>][<span class="tok-str">'payment_url'</span>];
?&gt;</pre>
          </div>
        </div>

        <div class="step-card">
          <h3 class="step-title">Langkah 2: Frontend (Tampilkan Popup)</h3>
          <p class="step-desc">Sertakan library snap.js pada halaman Anda, lalu picu fungsi snap.pay() dengan memasukkan URL pembayaran.</p>

          <div class="code-card">
            <div class="code-card-header">
              <span class="code-lang">HTML &amp; JavaScript</span>
              <button @click="copyCode('html_snap_frontend', 'code_snap_fe')" class="btn-code-copy">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['code_snap_fe'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="html_snap_frontend">&lt;script src="https://novapay.m1sec.my.id/assets/js/snap.js"&gt;&lt;/script&gt;

&lt;button id="pay-btn"&gt;Bayar Sekarang&lt;/button&gt;

&lt;script&gt;
    var paymentUrl = "&lt;?= $snapToken ?&gt;";

    document.getElementById('pay-btn').onclick = function() {
        snap.pay(paymentUrl, {
            onSuccess: function(result) {
                alert('Pembayaran Berhasil!');
            },
            onPending: function(result) {
                console.log(result);
            },
            onError: function(result) {
                console.log(result);
            },
            onClose: function() {
                console.log('Popup ditutup oleh user');
            }
        });
    };
&lt;/script&gt;</pre>
          </div>
        </div>
      </section>

      <hr class="section-divider" />

      <section id="check" class="section-block">
        <div class="section-title-row">
          <h2>3. Check Status</h2>
          <span class="method-tag get">GET</span>
        </div>
        <p class="section-desc">Mengecek status pembayaran terkini berdasarkan transaction ID secara manual atau periodik.</p>

        <div class="request-box">
          <div class="request-box-header">
            <span>REQUEST URL</span>
            <button @click="copyText('https://novapay.m1sec.my.id/api.php?action=checkstatus&apikey={APIKEY}&transaction_id={TRANSACTION_ID}', 'req_check')" class="btn-copy-link">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['req_check'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <div class="request-url-text">
            https://novapay.m1sec.my.id/api.php?action=checkstatus&amp;apikey=<span class="param-hl">{APIKEY}</span>&amp;transaction_id=<span class="param-hl">{TRANSACTION_ID}</span>
          </div>
        </div>

        <div class="code-card">
          <div class="code-card-header">
            <span class="code-lang">PHP (Server-Side)</span>
            <button @click="copyCode('php_check_code', 'code_check')" class="btn-code-copy">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['code_check'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <pre class="code-pre" id="php_check_code">&lt;?php
<span class="tok-var">$apiKey</span> = <span class="tok-str">'YOUR_API_KEY'</span>;
<span class="tok-var">$transactionId</span> = <span class="tok-str">'NOVA-CONTOH'</span>; 
<span class="tok-var">$url</span> = <span class="tok-str">'https://novapay.m1sec.my.id/api.php?action=checkstatus&amp;apikey='</span> . <span class="tok-var">$apiKey</span> . <span class="tok-str">'&amp;transaction_id='</span> . <span class="tok-var">$transactionId</span>;

<span class="tok-var">$res</span> = <span class="tok-fn">file_get_contents</span>(<span class="tok-var">$url</span>);
<span class="tok-var">$data</span> = <span class="tok-fn">json_decode</span>(<span class="tok-var">$res</span>, <span class="tok-bool">true</span>);
<span class="tok-fn">print_r</span>(<span class="tok-var">$data</span>);
?&gt;</pre>
        </div>

        <div class="grid-two">
          <div class="code-card">
            <div class="code-card-header">
              <span class="label-status success">SUKSES / PENDING</span>
              <button @click="copyCode('json_check_success', 'resp_chk_suc')" class="btn-code-copy-link">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['resp_chk_suc'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="json_check_success">{
  <span class="tok-key">"status"</span>: <span class="tok-bool">true</span>,
  <span class="tok-key">"data"</span>: {
    <span class="tok-key">"status"</span>: <span class="tok-str">"SUCCESS"</span>,
    <span class="tok-key">"transaction_id"</span>: <span class="tok-str">"NOVA-ABC12345"</span>,
    <span class="tok-key">"amount"</span>: <span class="tok-num">10000</span>,
    <span class="tok-key">"payment_url"</span>: <span class="tok-str">"https://novapay.m1sec.my.id/pay/..."</span>,
    <span class="tok-key">"qr_image"</span>: <span class="tok-str">"https://novapay.m1sec.my.id/assets/..."</span>
  }
}</pre>
          </div>

          <div class="code-card">
            <div class="code-card-header">
              <span class="label-status expired">EXPIRED</span>
              <button @click="copyCode('json_check_expired', 'resp_chk_exp')" class="btn-code-copy-link">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['resp_chk_exp'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="json_check_expired">{
  <span class="tok-key">"status"</span>: <span class="tok-bool">true</span>,
  <span class="tok-key">"data"</span>: {
    <span class="tok-key">"status"</span>: <span class="tok-str">"EXPIRED"</span>,
    <span class="tok-key">"transaction_id"</span>: <span class="tok-str">"NOVA-ABC12345"</span>,
    <span class="tok-key">"qr_image"</span>: <span class="tok-str">"https://novapay.m1sec.my.id/assets/expired.png"</span>
  }
}</pre>
          </div>
        </div>
      </section>

      <hr class="section-divider" />

      <section id="cancel" class="section-block">
        <div class="section-title-row">
          <h2>4. Cancel Transaction</h2>
          <span class="method-tag post">POST</span>
        </div>
        <p class="section-desc">Membatalkan tagihan transaksi yang masih berstatus PENDING.</p>

        <div class="request-box">
          <div class="request-box-header">
            <span>REQUEST URL</span>
            <button @click="copyText('https://novapay.m1sec.my.id/api.php?action=cancel_transaction&apikey={APIKEY}', 'req_cancel')" class="btn-copy-link">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['req_cancel'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <div class="request-url-text">
            https://novapay.m1sec.my.id/api.php?action=cancel_transaction&amp;apikey=<span class="param-hl">{APIKEY}</span>
          </div>
        </div>

        <h3 class="subsection-title">Body Parameter (JSON)</h3>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Tipe</th>
                <th>Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="param-cell">transaction_id</td>
                <td class="type-cell">String</td>
                <td>ID Transaksi internal NovaPay (Contoh: NOVA-ABC12345).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="code-card">
          <div class="code-card-header">
            <span class="code-lang">PHP (cURL)</span>
            <button @click="copyCode('php_cancel_code', 'code_cancel')" class="btn-code-copy">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['code_cancel'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <pre class="code-pre" id="php_cancel_code">&lt;?php
<span class="tok-var">$apiKey</span> = <span class="tok-str">'YOUR_API_KEY'</span>;
<span class="tok-var">$url</span> = <span class="tok-str">'https://novapay.m1sec.my.id/api.php?action=cancel_transaction&amp;apikey='</span> . <span class="tok-var">$apiKey</span>;

<span class="tok-var">$data</span> = [<span class="tok-str">'transaction_id'</span> =&gt; <span class="tok-str">'NOVA-ABC12345'</span>];

<span class="tok-var">$ch</span> = <span class="tok-fn">curl_init</span>(<span class="tok-var">$url</span>);
<span class="tok-fn">curl_setopt</span>(<span class="tok-var">$ch</span>, CURLOPT_POST, <span class="tok-num">1</span>);
<span class="tok-fn">curl_setopt</span>(<span class="tok-var">$ch</span>, CURLOPT_POSTFIELDS, <span class="tok-fn">json_encode</span>(<span class="tok-var">$data</span>));
<span class="tok-fn">curl_setopt</span>(<span class="tok-var">$ch</span>, CURLOPT_HTTPHEADER, [<span class="tok-str">'Content-Type: application/json'</span>]);
<span class="tok-fn">curl_setopt</span>(<span class="tok-var">$ch</span>, CURLOPT_RETURNTRANSFER, <span class="tok-bool">true</span>);

<span class="tok-var">$response</span> = <span class="tok-fn">curl_exec</span>(<span class="tok-var">$ch</span>);
<span class="tok-fn">curl_close</span>(<span class="tok-var">$ch</span>);

<span class="tok-fn">print_r</span>(<span class="tok-fn">json_decode</span>(<span class="tok-var">$response</span>, <span class="tok-bool">true</span>));
?&gt;</pre>
        </div>

        <h3 class="subsection-title">Contoh Respon JSON</h3>
        <div class="code-card">
          <div class="code-card-header right-only">
            <button @click="copyCode('json_cancel_resp', 'resp_cancel')" class="btn-code-copy-link">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['resp_cancel'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <pre class="code-pre" id="json_cancel_resp">{
  <span class="tok-key">"status"</span>: <span class="tok-bool">true</span>,
  <span class="tok-key">"message"</span>: <span class="tok-str">"Transaction cancelled successfully"</span>,
  <span class="tok-key">"data"</span>: {
    <span class="tok-key">"transaction_id"</span>: <span class="tok-str">"NOVA-ABC12345"</span>,
    <span class="tok-key">"status"</span>: <span class="tok-str">"CANCELLED"</span>,
    <span class="tok-key">"cancelled_at"</span>: <span class="tok-str">"2026-01-01 12:10:00"</span>
  }
}</pre>
        </div>
      </section>

      <hr class="section-divider" />

      <section id="webhook" class="section-block">
        <div class="section-title-row">
          <h2>5. Webhook (Callback)</h2>
          <span class="method-tag post">POST</span>
        </div>
        <p class="section-desc">Notifikasi instan dikirim oleh server NovaPay ke endpoint callback URL Anda secara asynchronous saat status transaksi berubah menjadi SUCCESS, CANCELLED, atau EXPIRED.</p>

        <div class="banner-purple">
          <div class="banner-title">
            <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <span>Verifikasi Signature</span>
          </div>
          <p class="banner-text">Wajib memvalidasi keaslian webhook dengan memeriksa parameter signature atau header X-NovaPay-Signature menggunakan hash HMAC-SHA256 dengan Secret / Merchant Key Anda.</p>
        </div>

        <div class="code-card">
          <div class="code-card-header">
            <span class="code-lang">Contoh Handler PHP</span>
            <button @click="copyCode('php_webhook_code', 'code_webhook')" class="btn-code-copy">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['code_webhook'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <pre class="code-pre" id="php_webhook_code">&lt;?php
<span class="tok-var">$secret</span> = <span class="tok-str">'RAHASIA_DARI_DASHBOARD'</span>; 
<span class="tok-var">$json</span> = <span class="tok-fn">file_get_contents</span>(<span class="tok-str">'php://input'</span>);
<span class="tok-var">$data</span> = <span class="tok-fn">json_decode</span>(<span class="tok-var">$json</span>, <span class="tok-bool">true</span>);
<span class="tok-var">$signature</span> = <span class="tok-var">$_SERVER</span>[<span class="tok-str">'HTTP_X_NOVAPAY_SIGNATURE'</span>] ?? (<span class="tok-var">$data</span>[<span class="tok-str">'signature'</span>] ?? <span class="tok-str">''</span>);

<span class="tok-kw">if</span> (!<span class="tok-fn">hash_equals</span>(<span class="tok-fn">hash_hmac</span>(<span class="tok-str">'sha256'</span>, <span class="tok-var">$json</span>, <span class="tok-var">$secret</span>), <span class="tok-var">$signature</span>)) {
    <span class="tok-fn">http_response_code</span>(<span class="tok-num">403</span>);
    <span class="tok-kw">exit</span>;
}

<span class="tok-fn">http_response_code</span>(<span class="tok-num">200</span>);
?&gt;</pre>
        </div>

        <h3 class="subsection-title">Payload Sukses (POST)</h3>
        <div class="code-card">
          <div class="code-card-header right-only">
            <button @click="copyCode('json_webhook_success', 'resp_wh_suc')" class="btn-code-copy-link">
              <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>{{ copiedKeys['resp_wh_suc'] ? 'Tersalin' : 'Salin' }}</span>
            </button>
          </div>
          <pre class="code-pre" id="json_webhook_success">{
  <span class="tok-key">"merchant_code"</span>: <span class="tok-str">"NOVA-MERCHANT"</span>,
  <span class="tok-key">"merchant_key"</span>: <span class="tok-str">"xxxxxxxxxxxxxxx"</span>,
  <span class="tok-key">"transaction_id"</span>: <span class="tok-str">"NOVA-ABC12345"</span>,
  <span class="tok-key">"amount"</span>: <span class="tok-num">10123</span>,
  <span class="tok-key">"status"</span>: <span class="tok-str">"SUCCESS"</span>,
  <span class="tok-key">"signature"</span>: <span class="tok-str">"xxxxxxxxxxxxxxxx"</span>,
  <span class="tok-key">"customer"</span>: {
    <span class="tok-key">"name"</span>: <span class="tok-str">"Guest"</span>,
    <span class="tok-key">"phone"</span>: <span class="tok-str">"-"</span>
  },
  <span class="tok-key">"description"</span>: <span class="tok-str">"Transaction"</span>,
  <span class="tok-key">"timestamp"</span>: <span class="tok-str">"2026-01-01 12:05:00"</span>
}</pre>
        </div>

        <div class="grid-two">
          <div class="code-card">
            <div class="code-card-header">
              <span class="label-status default">PAYLOAD: CANCELLED</span>
              <button @click="copyCode('json_webhook_cancel', 'resp_wh_can')" class="btn-code-copy-link">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['resp_wh_can'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="json_webhook_cancel">{
  <span class="tok-key">"merchant_code"</span>: <span class="tok-str">"NOVA-MERCHANT"</span>,
  <span class="tok-key">"merchant_key"</span>: <span class="tok-str">"xxxxxxxxxxxxxxx"</span>,
  <span class="tok-key">"transaction_id"</span>: <span class="tok-str">"NOVA-ABC12345"</span>,
  <span class="tok-key">"amount"</span>: <span class="tok-num">10123</span>,
  <span class="tok-key">"status"</span>: <span class="tok-str">"CANCELLED"</span>,
  <span class="tok-key">"signature"</span>: <span class="tok-str">"xxxxxxxxxxxxxxxx"</span>,
  <span class="tok-key">"customer"</span>: {
    <span class="tok-key">"name"</span>: <span class="tok-str">"Guest"</span>,
    <span class="tok-key">"phone"</span>: <span class="tok-str">"-"</span>
  },
  <span class="tok-key">"description"</span>: <span class="tok-str">"Transaction"</span>,
  <span class="tok-key">"timestamp"</span>: <span class="tok-null">null</span>
}</pre>
          </div>

          <div class="code-card">
            <div class="code-card-header">
              <span class="label-status expired">PAYLOAD: EXPIRED</span>
              <button @click="copyCode('json_webhook_expired', 'resp_wh_exp')" class="btn-code-copy-link">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['resp_wh_exp'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="json_webhook_expired">{
  <span class="tok-key">"merchant_code"</span>: <span class="tok-str">"NOVA-MERCHANT"</span>,
  <span class="tok-key">"merchant_key"</span>: <span class="tok-str">"xxxxxxxxxxxxxxx"</span>,
  <span class="tok-key">"transaction_id"</span>: <span class="tok-str">"NOVA-ABC12345"</span>,
  <span class="tok-key">"amount"</span>: <span class="tok-num">10123</span>,
  <span class="tok-key">"status"</span>: <span class="tok-str">"EXPIRED"</span>,
  <span class="tok-key">"signature"</span>: <span class="tok-str">"xxxxxxxxxxxxxxxx"</span>,
  <span class="tok-key">"customer"</span>: {
    <span class="tok-key">"name"</span>: <span class="tok-str">"Guest"</span>,
    <span class="tok-key">"phone"</span>: <span class="tok-str">"-"</span>
  },
  <span class="tok-key">"description"</span>: <span class="tok-str">"Transaction"</span>,
  <span class="tok-key">"timestamp"</span>: <span class="tok-null">null</span>
}</pre>
          </div>
        </div>
      </section>

      <hr class="section-divider" />

      <section id="extras" class="section-block">
        <h2 class="section-main-title">6. Fitur Tambahan</h2>

        <div class="sub-feature">
          <div class="section-title-row">
            <h3>Cek Profil &amp; Saldo</h3>
            <span class="method-tag get">GET</span>
          </div>
          <p class="section-desc">Melihat rincian akun merchant serta informasi saldo aktif terkini.</p>

          <div class="request-box">
            <div class="request-box-header">
              <span>REQUEST URL</span>
              <button @click="copyText('https://novapay.m1sec.my.id/api.php?action=check_profile&apikey={APIKEY}', 'req_profile')" class="btn-copy-link">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['req_profile'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <div class="request-url-text">
              https://novapay.m1sec.my.id/api.php?action=check_profile&amp;apikey=<span class="param-hl">{APIKEY}</span>
            </div>
          </div>

          <div class="code-card">
            <div class="code-card-header">
              <span class="code-lang">PHP (Server-Side)</span>
              <button @click="copyCode('php_profile_code', 'code_profile')" class="btn-code-copy">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['code_profile'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="php_profile_code">&lt;?php
<span class="tok-var">$apiKey</span> = <span class="tok-str">'YOUR_API_KEY'</span>;
<span class="tok-var">$url</span> = <span class="tok-str">'https://novapay.m1sec.my.id/api.php?action=check_profile&amp;apikey='</span> . <span class="tok-var">$apiKey</span>;

<span class="tok-var">$res</span> = <span class="tok-fn">file_get_contents</span>(<span class="tok-var">$url</span>);
<span class="tok-var">$data</span> = <span class="tok-fn">json_decode</span>(<span class="tok-var">$res</span>, <span class="tok-bool">true</span>);

<span class="tok-kw">if</span> (<span class="tok-var">$data</span>[<span class="tok-str">'status'</span>]) {
    <span class="tok-fn">echo</span> <span class="tok-str">"Saldo: "</span> . <span class="tok-var">$data</span>[<span class="tok-str">'data'</span>][<span class="tok-str">'current_balance'</span>];
}
?&gt;</pre>
          </div>

          <div class="code-card">
            <div class="code-card-header right-only">
              <button @click="copyCode('json_profile_resp', 'resp_profile')" class="btn-code-copy-link">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['resp_profile'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="json_profile_resp">{
  <span class="tok-key">"status"</span>: <span class="tok-bool">true</span>,
  <span class="tok-key">"message"</span>: <span class="tok-str">"Profile data retrieved successfully"</span>,
  <span class="tok-key">"data"</span>: {
    <span class="tok-key">"project_name"</span>: <span class="tok-str">"Toko Online Saya"</span>,
    <span class="tok-key">"merchant_username"</span>: <span class="tok-str">"user123"</span>,
    <span class="tok-key">"merchant_email"</span>: <span class="tok-str">"merchant@example.com"</span>,
    <span class="tok-key">"current_balance"</span>: <span class="tok-num">1500000</span>,
    <span class="tok-key">"is_active"</span>: <span class="tok-bool">true</span>
  }
}</pre>
          </div>
        </div>

        <hr class="section-divider" />

        <div class="sub-feature">
          <div class="section-title-row">
            <h3>Request Withdrawal</h3>
            <span class="method-tag post">POST</span>
          </div>
          <p class="section-desc">Mengajukan penarikan dana otomatis ke rekening bank atau e-wallet merchant.</p>

          <div class="request-box">
            <div class="request-box-header">
              <span>REQUEST URL</span>
              <button @click="copyText('https://novapay.m1sec.my.id/api.php?action=request_withdrawal', 'req_wd')" class="btn-copy-link">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['req_wd'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <div class="request-url-text">
              https://novapay.m1sec.my.id/api.php?action=request_withdrawal
            </div>
          </div>

          <div class="code-card">
            <div class="code-card-header">
              <span class="code-lang">PHP (cURL)</span>
              <button @click="copyCode('php_wd_code', 'code_wd')" class="btn-code-copy">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['code_wd'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="php_wd_code">&lt;?php
<span class="tok-var">$url</span> = <span class="tok-str">'https://novapay.m1sec.my.id/api.php?action=request_withdrawal'</span>;
<span class="tok-var">$data</span> = [
    <span class="tok-str">'api_key'</span> =&gt; <span class="tok-str">'YOUR_API_KEY'</span>,
    <span class="tok-str">'amount'</span> =&gt; <span class="tok-num">50000</span>,
    <span class="tok-str">'bank_code'</span> =&gt; <span class="tok-str">'BCA'</span>,
    <span class="tok-str">'account_number'</span> =&gt; <span class="tok-str">'1234567890'</span>,
    <span class="tok-str">'account_name'</span> =&gt; <span class="tok-str">'JOHN DOE'</span>
];

<span class="tok-var">$ch</span> = <span class="tok-fn">curl_init</span>(<span class="tok-var">$url</span>);
<span class="tok-fn">curl_setopt</span>(<span class="tok-var">$ch</span>, CURLOPT_POST, <span class="tok-num">1</span>);
<span class="tok-fn">curl_setopt</span>(<span class="tok-var">$ch</span>, CURLOPT_POSTFIELDS, <span class="tok-fn">json_encode</span>(<span class="tok-var">$data</span>));
<span class="tok-fn">curl_setopt</span>(<span class="tok-var">$ch</span>, CURLOPT_HTTPHEADER, [<span class="tok-str">'Content-Type: application/json'</span>]);
<span class="tok-fn">curl_setopt</span>(<span class="tok-var">$ch</span>, CURLOPT_RETURNTRANSFER, <span class="tok-bool">true</span>);

<span class="tok-var">$response</span> = <span class="tok-fn">curl_exec</span>(<span class="tok-var">$ch</span>);
<span class="tok-fn">curl_close</span>(<span class="tok-var">$ch</span>);

<span class="tok-fn">print_r</span>(<span class="tok-fn">json_decode</span>(<span class="tok-var">$response</span>, <span class="tok-bool">true</span>));
?&gt;</pre>
          </div>

          <div class="code-card">
            <div class="code-card-header right-only">
              <button @click="copyCode('json_wd_resp', 'resp_wd')" class="btn-code-copy-link">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['resp_wd'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="json_wd_resp">{
  <span class="tok-key">"status"</span>: <span class="tok-bool">true</span>,
  <span class="tok-key">"message"</span>: <span class="tok-str">"Withdrawal request submitted successfully"</span>,
  <span class="tok-key">"data"</span>: {
    <span class="tok-key">"amount_requested"</span>: <span class="tok-num">50000</span>,
    <span class="tok-key">"admin_fee"</span>: <span class="tok-num">5000</span>,
    <span class="tok-key">"amount_received"</span>: <span class="tok-num">45000</span>,
    <span class="tok-key">"bank"</span>: <span class="tok-str">"BCA"</span>,
    <span class="tok-key">"account"</span>: <span class="tok-str">"1234567890"</span>,
    <span class="tok-key">"status"</span>: <span class="tok-str">"PENDING"</span>
  }
}</pre>
          </div>
        </div>

        <hr class="section-divider" />

        <div class="sub-feature">
          <div class="section-title-row">
            <h3>List Metode Penarikan</h3>
            <span class="method-tag get">GET</span>
          </div>
          <p class="section-desc">Mendapatkan daftar lengkap institusi Bank dan E-Wallet yang didukung oleh sistem penarikan NovaPay.</p>

          <div class="banner-purple">
            <div class="banner-title">
              <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Perhatian</span>
            </div>
            <p class="banner-text">Nilai parameter code (contoh: BCA) WAJIB digunakan sebagai nilai bank_code pada saat request penarikan dana.</p>
          </div>

          <div class="request-box">
            <div class="request-box-header">
              <span>REQUEST URL</span>
              <button @click="copyText('https://novapay.m1sec.my.id/api.php?action=get_withdrawal_methods&apikey={APIKEY}', 'req_methods')" class="btn-copy-link">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['req_methods'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <div class="request-url-text">
              https://novapay.m1sec.my.id/api.php?action=get_withdrawal_methods&amp;apikey=<span class="param-hl">{APIKEY}</span>
            </div>
          </div>

          <div class="code-card">
            <div class="code-card-header">
              <span class="code-lang">PHP (Server-Side)</span>
              <button @click="copyCode('php_methods_code', 'code_methods')" class="btn-code-copy">
                <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>{{ copiedKeys['code_methods'] ? 'Tersalin' : 'Salin' }}</span>
              </button>
            </div>
            <pre class="code-pre" id="php_methods_code">&lt;?php
<span class="tok-var">$apiKey</span> = <span class="tok-str">'YOUR_API_KEY'</span>;
<span class="tok-var">$url</span> = <span class="tok-str">'https://novapay.m1sec.my.id/api.php?action=get_withdrawal_methods&amp;apikey='</span> . <span class="tok-var">$apiKey</span>;

<span class="tok-var">$ch</span> = <span class="tok-fn">curl_init</span>(<span class="tok-var">$url</span>);
<span class="tok-fn">curl_setopt</span>(<span class="tok-var">$ch</span>, CURLOPT_RETURNTRANSFER, <span class="tok-bool">true</span>);
<span class="tok-var">$response</span> = <span class="tok-fn">curl_exec</span>(<span class="tok-var">$ch</span>);
<span class="tok-fn">curl_close</span>(<span class="tok-var">$ch</span>);

<span class="tok-var">$result</span> = <span class="tok-fn">json_decode</span>(<span class="tok-var">$response</span>, <span class="tok-bool">true</span>);

<span class="tok-kw">if</span> (<span class="tok-var">$result</span>[<span class="tok-str">'status'</span>]) {
    <span class="tok-kw">foreach</span> (<span class="tok-var">$result</span>[<span class="tok-str">'data'</span>] <span class="tok-kw">as</span> <span class="tok-var">$method</span>) {
        <span class="tok-fn">echo</span> <span class="tok-str">"["</span> . <span class="tok-var">$method</span>[<span class="tok-str">'code'</span>] . <span class="tok-str">"] "</span> . <span class="tok-var">$method</span>[<span class="tok-str">'name'</span>] . <span class="tok-str">" ("</span> . <span class="tok-var">$method</span>[<span class="tok-str">'type'</span>] . <span class="tok-str">")\n"</span>;
    }
}
?&gt;</pre>
          </div>

          <div class="grid-two">
            <div class="field-card">
              <h4 class="field-title">Penjelasan Field</h4>
              <ul class="field-list">
                <li>
                  <span class="field-name">code</span>
                  <span class="field-desc">: Kode unik bank/e-wallet (contoh: BCA, DANA).</span>
                </li>
                <li>
                  <span class="field-name">name</span>
                  <span class="field-desc">: Nama resmi institusi perbankan atau e-wallet.</span>
                </li>
                <li>
                  <span class="field-name">type</span>
                  <span class="field-desc">: Kategori metode: BANK atau EWALLET.</span>
                </li>
              </ul>
            </div>

            <div class="code-card">
              <div class="code-card-header right-only">
                <button @click="copyCode('json_methods_resp', 'resp_methods')" class="btn-code-copy-link">
                  <svg class="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  <span>{{ copiedKeys['resp_methods'] ? 'Tersalin' : 'Salin' }}</span>
                </button>
              </div>
              <pre class="code-pre" id="json_methods_resp">{
  <span class="tok-key">"status"</span>: <span class="tok-bool">true</span>,
  <span class="tok-key">"message"</span>: <span class="tok-str">"Available withdrawal methods retrieved"</span>,
  <span class="tok-key">"total"</span>: <span class="tok-num">2</span>,
  <span class="tok-key">"data"</span>: [
    {
      <span class="tok-key">"code"</span>: <span class="tok-str">"BCA"</span>,
      <span class="tok-key">"name"</span>: <span class="tok-str">"Bank Central Asia"</span>,
      <span class="tok-key">"type"</span>: <span class="tok-str">"BANK"</span>,
      <span class="tok-key">"is_active"</span>: <span class="tok-bool">true</span>
    },
    {
      <span class="tok-key">"code"</span>: <span class="tok-str">"DANA"</span>,
      <span class="tok-key">"name"</span>: <span class="tok-str">"DANA Indonesia"</span>,
      <span class="tok-key">"type"</span>: <span class="tok-str">"EWALLET"</span>,
      <span class="tok-key">"is_active"</span>: <span class="tok-bool">true</span>
    }
  ]
}</pre>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ApiDocumentation',
  data() {
    return {
      copiedKeys: {}
    }
  },
  methods: {
    copyText(text, key) {
      navigator.clipboard.writeText(text).then(() => {
        this.copiedKeys[key] = true
        setTimeout(() => {
          this.copiedKeys[key] = false
        }, 1500)
      })
    },
    copyCode(elementId, key) {
      const el = document.getElementById(elementId)
      if (!el) return
      navigator.clipboard.writeText(el.innerText).then(() => {
        this.copiedKeys[key] = true
        setTimeout(() => {
          this.copiedKeys[key] = false
        }, 1500)
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

.page-wrapper {
  background-color: #F8FAFC;
  min-height: 100vh;
  padding: 40px 20px 80px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #0F172A;
  box-sizing: border-box;
}

.docs-container {
  max-width: 900px;
  margin: 0 auto;
}

.docs-header {
  margin-bottom: 36px;
  padding-bottom: 28px;
  border-bottom: 1px solid #E2E8F0;
}

.docs-header h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #64748B;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.base-url-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 16px 20px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 640px) {
  .base-url-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.base-url-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.base-url-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
}

.base-url-value {
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
  word-break: break-all;
}

.btn-copy-base {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s;
}

.btn-copy-base:hover {
  background: #EEF2FF;
  border-color: #C7D2FE;
  color: #4F46E5;
}

.toc-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 40px;
}

.toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.toc-header h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #94A3B8;
  margin: 0;
}

.toc-header span {
  font-size: 12px;
  color: #94A3B8;
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.toc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #F1F5F9;
  color: #334155;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.toc-item:hover {
  background: #EEF2FF;
  border-color: #C7D2FE;
  color: #4F46E5;
}

.toc-num {
  font-weight: 700;
  color: #6366F1;
}

.section-block {
  margin-bottom: 40px;
}

.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.section-title-row h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.section-title-row h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.section-main-title {
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 24px 0;
}

.method-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.method-tag.get {
  color: #6366F1;
}

.method-tag.post {
  color: #10B981;
}

.section-desc {
  font-size: 14px;
  color: #64748B;
  line-height: 1.6;
  margin: 0 0 18px 0;
}

.subsection-title {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #64748B;
  margin: 20px 0 10px 0;
}

.request-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.request-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #F1F5F9;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  color: #94A3B8;
  letter-spacing: 0.5px;
}

.btn-copy-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #6366F1;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}

.btn-copy-link:hover {
  color: #4F46E5;
}

.request-url-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #0F172A;
  word-break: break-all;
  line-height: 1.6;
}

.param-hl {
  color: #6366F1;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.docs-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.docs-table th {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #F8FAFC;
  color: #475569;
  padding: 12px 16px;
  border-bottom: 1px solid #E2E8F0;
}

.docs-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #F1F5F9;
  color: #334155;
  line-height: 1.5;
}

.docs-table tr:last-child td {
  border-bottom: none;
}

.param-cell {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  color: #0F172A;
}

.type-cell {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #64748B;
}

.code-card {
  background: #0F172A;
  border: 1px solid #1E293B;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
}

.code-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #020617;
  border-bottom: 1px solid #1E293B;
}

.code-card-header.right-only {
  justify-content: flex-end;
}

.code-lang {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #818CF8;
}

.btn-code-copy {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background: #1E293B;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #CBD5E1;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-code-copy:hover {
  background: #334155;
  color: #FFFFFF;
}

.btn-code-copy-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #818CF8;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}

.btn-code-copy-link:hover {
  color: #A5B4FC;
}

.code-pre {
  margin: 0;
  padding: 18px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #E2E8F0;
  overflow-x: auto;
}

.tok-var { color: #7DD3FC; }
.tok-str { color: #34D399; }
.tok-num { color: #FBBF24; }
.tok-kw  { color: #FB7185; }
.tok-fn  { color: #A5B4FC; }
.tok-key { color: #818CF8; }
.tok-bool{ color: #FBBF24; }
.tok-null{ color: #94A3B8; }

.grid-two {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 16px;
}

@media (min-width: 640px) {
  .grid-two {
    grid-template-columns: 1fr 1fr;
  }
}

.label-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
}

.label-status.success { color: #34D399; }
.label-status.expired { color: #FB7185; }
.label-status.default { color: #94A3B8; }

.step-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.step-title {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 8px 0;
}

.step-desc {
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.banner-purple {
  background: #9333EA;
  color: #FFFFFF;
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.banner-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #F3E8FF;
  margin-bottom: 6px;
}

.banner-text {
  font-size: 14px;
  line-height: 1.6;
  color: #FAF5FF;
  margin: 0;
}

.sub-feature {
  margin-bottom: 32px;
}

.field-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.field-title {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #94A3B8;
  margin: 0 0 14px 0;
}

.field-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
}

.field-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: #0F172A;
}

.field-desc {
  color: #475569;
}

.section-divider {
  border: none;
  border-top: 1px solid #E2E8F0;
  margin: 36px 0;
}

.icon-sm {
  width: 16px;
  height: 16px;
}

.icon-xs {
  width: 14px;
  height: 14px;
}
</style>
