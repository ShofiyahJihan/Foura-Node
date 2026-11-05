// Tombol suka & simpan: dikirim ke server tanpa memuat ulang halaman
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-aksi]');
  if (!b) return;
  e.preventDefault();
  b.disabled = true;
  try {
    const r = await fetch('/artikel/' + b.dataset.slug + '/reaksi/' + b.dataset.aksi, {
      method: 'POST', headers: { Accept: 'application/json' }, credentials: 'same-origin',
    });
    if (r.status === 401) {              // belum login, arahkan ke halaman masuk
      const d = await r.json();
      location.href = d.login || '/masuk';
      return;
    }
    const d = await r.json();
    document.querySelectorAll('[data-aksi="' + b.dataset.aksi + '"][data-slug="' + b.dataset.slug + '"]').forEach((el) => {
      el.classList.toggle('on', d.aktif);
      el.setAttribute('aria-pressed', d.aktif);
      const n = el.querySelector('.n');
      if (n) n.textContent = d.jumlah;
    });
  } catch (err) {
    alert('Gagal memproses, coba lagi.');
  } finally {
    b.disabled = false;
  }
});


