const { Pengaturan } = require('../models/pengaturan');

// Isi awal: sama persis dengan teks yang sekarang tertulis di beranda.ejs
const DEFAULT = {
  banner_label: 'Jasa pengelolaan media sosial',
  banner_judul: 'Tingkatkan Brand Fashion UMKM Anda di Media Sosial',
  banner_sorot: 'Brand',
  banner_teks: 'Foura Creative hadir untuk membantu UMKM fashion di Makassar mengelola media sosial secara profesional, kreatif, dan strategis.',
  banner_tombol1: 'Lihat Katalog →',
  banner_tombol2: 'Coba Kalkulator',
  footer_deskripsi: 'Jasa pengelolaan media sosial untuk UMKM fashion di Makassar. Konten, jadwal posting, sampai laporan performa bulanan.',
  kontak_instagram: 'fouracreativee',
  kontak_tiktok: 'fouracreative',
  kontak_wa: '0882-4580-4687',
};

let siap = null;
function siapkan() {
  if (!siap) {
    siap = (async () => {
      await Pengaturan.sync();
      for (const [kunci, nilai] of Object.entries(DEFAULT)) {
        await Pengaturan.findOrCreate({ where: { kunci }, defaults: { nilai } });
      }
    })().catch((e) => { siap = null; throw e; });
  }
  return siap;
}

// Mengembalikan semua pengaturan sebagai objek. Kalau database bermasalah, pakai nilai bawaan.
async function ambil() {
  try {
    await siapkan();
    const hasil = { ...DEFAULT };
    (await Pengaturan.findAll()).forEach((b) => { hasil[b.kunci] = b.nilai; });
    return hasil;
  } catch (e) {
    console.error('Pengaturan gagal dibaca, memakai nilai bawaan:', e.message);
    return { ...DEFAULT };
  }
}

module.exports = { Pengaturan, DEFAULT, siapkan, ambil };