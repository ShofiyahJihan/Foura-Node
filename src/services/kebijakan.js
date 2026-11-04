const { KebijakanBagian, KebijakanButir } = require('../models/kebijakan');

const DEFAULT = [
  { halaman: 'kebijakan-privasi', judul: 'Kebijakan Privasi & Keamanan', butir: [
    ['Pengumpulan Data Pengguna', 'Foura Creative mengumpulkan data pengguna seperti nama, username, alamat email, nomor WhatsApp, alamat, dan nama UMKM, serta data pesanan. Data ini digunakan untuk memproses pesanan, menghubungi klien, dan meningkatkan kualitas layanan website.'],
    ['Keamanan Data', 'Foura Creative berkomitmen menjaga keamanan data pengguna. Password disimpan dalam bentuk terenkripsi dan akses ke akun dilindungi dengan sistem masuk, guna mencegah penyalahgunaan data.'],
    ['Penyimpanan Data', 'Data pengguna disimpan selama akun masih digunakan. Pengguna dapat meminta penghapusan data melalui kontak resmi Foura Creative.'],
  ]},
  { halaman: 'syarat-ketentuan', judul: 'Kebijakan Penggunaan Website', butir: [
    ['Tujuan Website', 'Website Foura Creative bertujuan membantu UMKM fashion di Makassar memilih dan memesan layanan pengelolaan media sosial secara praktis, cepat, dan terstruktur melalui katalog layanan, kalkulator estimasi kebutuhan, dan keranjang.'],
    ['Penggunaan Layanan', 'Pengguna menggunakan website untuk melihat katalog, memilih paket atau layanan satuan, memasukkannya ke keranjang, dan memantau pesanan. Untuk memesan, pengguna wajib mendaftar dan masuk, serta bertanggung jawab atas keakuratan data yang dimasukkan.'],
    ['Pembayaran & Transaksi', 'Website menampilkan harga layanan dalam Rupiah dan dapat terhubung dengan sistem pembayaran. Pesanan mulai dikerjakan setelah pembayaran terkonfirmasi. Pengguna diharapkan memastikan data yang dimasukkan benar. Foura Creative tidak bertanggung jawab atas kesalahan yang disebabkan oleh input yang tidak sesuai.'],
    ['Revisi & Pembatalan', 'Setiap hasil kerja mencakup maksimal dua kali revisi sesuai brief awal. Pesanan dapat dibatalkan sebelum pengerjaan dimulai, sedangkan layanan yang sudah selesai dan diserahkan tidak dapat dibatalkan.'],
    ['Hak Kekayaan Intelektual', 'Hasil kerja yang telah dibayar lunas boleh digunakan untuk keperluan bisnis klien. Foura Creative dapat menampilkannya sebagai portofolio kecuali klien menyatakan keberatan secara tertulis.'],
  ]},
  { halaman: 'syarat-ketentuan', judul: 'Kebijakan Pengembalian Dana & Layanan', anchor: 'pengembalian-dana', butir: [
    ['Ketentuan Pengembalian Dana', 'Dana dikembalikan 100% jika pesanan dibatalkan sebelum pengerjaan dimulai, atau jika Foura Creative tidak dapat menyediakan layanan yang dipesan. Jika pengerjaan sudah berjalan, dana dikembalikan secara proporsional untuk bagian yang belum dikerjakan. Layanan yang sudah selesai dan diserahkan tidak dapat dikembalikan dananya.'],
    ['Cara Mengajukan Pengembalian Dana', 'Pengajuan dilakukan melalui kontak resmi Foura Creative (email fouracreativee@gmail.com atau Instagram @fouracreativee) dengan menyertakan kode pesanan dan alasan pengajuan. Pengajuan yang disetujui diproses dalam 3 sampai 7 hari kerja, dan dana dikembalikan melalui metode pembayaran yang digunakan.'],
    ['Kebijakan Produk dan Layanan', 'Seluruh layanan Foura Creative berupa jasa digital, sehingga tidak ada pengiriman barang fisik. Hasil kerja diserahkan secara digital sesuai waktu pengerjaan yang tertera pada tiap layanan. Jika hasil tidak sesuai brief, klien berhak atas revisi sebelum mengajukan pengembalian dana.'],
  ]},
];

let siap = null;
function siapkan() {
  if (!siap) {
    siap = (async () => {
      await KebijakanBagian.sync();
      await KebijakanButir.sync();
      if (await KebijakanBagian.count() > 0) return; // jangan timpa hasil edit
      const urutPerHalaman = {};
      for (const b of DEFAULT) {
        urutPerHalaman[b.halaman] = (urutPerHalaman[b.halaman] || 0) + 1;
        const bagian = await KebijakanBagian.create({
          halaman: b.halaman, judul: b.judul, anchor: b.anchor || null,
          urutan: urutPerHalaman[b.halaman],
        });
        for (let i = 0; i < b.butir.length; i++) {
          await KebijakanButir.create({
            bagian_id: bagian.id, judul: b.butir[i][0], isi: b.butir[i][1], urutan: i + 1,
          });
        }
      }
    })().catch(e => { siap = null; throw e; });
  }
  return siap;
}

async function ambilHalaman(halaman) {
  await siapkan();
  const hasil = await KebijakanBagian.findAll({
    where: { halaman },
    include: [{ model: KebijakanButir, as: 'butir' }],
    order: [['urutan', 'ASC'], [{ model: KebijakanButir, as: 'butir' }, 'urutan', 'ASC']],
  });
  return hasil.map(b => b.get({ plain: true }));
}

module.exports = { DEFAULT, siapkan, ambilHalaman };