// Contoh artikel. Aman dijalankan berulang kali: hanya artikel yang belum ada (dilihat dari slug) yang ditambahkan.
const { sequelize, Artikel } = require('./models');
const sinkronDb = require('./services/sinkron-db');


const CONTOH = [
  {
    judul: '5 Tips Membuat Konten Instagram yang Menarik untuk UMKM Fashion',
    slug: '5-tips-konten-instagram-umkm-fashion',
    kategori: 'Tips Konten',
    ringkasan: 'Foto bagus saja belum cukup. Ini lima langkah sederhana supaya feed Instagram brand fashion kamu terlihat rapi dan membuat orang mau berhenti menggulir.',
    isi: `Instagram sering menjadi tempat pertama calon pembeli mengenal sebuah brand fashion. Karena itu, tampilan akun kamu perlu memberi kesan yang jelas dalam beberapa detik.


## 1. Tentukan satu gaya visual
Pilih beberapa warna utama dan satu jenis pencahayaan, lalu pakai terus. Feed yang punya gaya konsisten lebih mudah diingat dibanding feed yang berganti-ganti tampilan.


## 2. Foto produk dengan cahaya alami
Cahaya dekat jendela di pagi atau sore hari sudah cukup untuk hasil yang bersih. Hindari lampu kamar yang membuat warna kain tampak berbeda dari aslinya.


## 3. Campurkan jenis konten
Jangan hanya menampilkan foto produk. Selingi dengan:
- Video singkat cara memadukan pakaian
- Cerita di balik proses pembuatan
- Testimoni pelanggan
- Promo atau info stok terbaru


## 4. Tulis keterangan yang mengajak
Akhiri keterangan foto dengan ajakan sederhana, misalnya bertanya warna favorit atau mengarahkan ke tautan pemesanan. Ajakan yang jelas membuat orang lebih mudah mengambil langkah berikutnya.


## 5. Cek hasilnya secara berkala
Lihat konten mana yang paling banyak disimpan dan dibagikan, lalu buat lebih banyak yang serupa. Dari situ kamu belajar selera audiensmu sendiri.`,
  },
  {
    judul: 'Kenapa Jadwal Posting yang Konsisten Itu Penting',
    slug: 'kenapa-jadwal-posting-konsisten-itu-penting',
    kategori: 'Strategi',
    ringkasan: 'Akun yang aktif tidak teratur membuat pengikut lupa. Pelajari cara menyusun jadwal posting yang realistis dan mudah dijalankan.',
    isi: `Banyak pemilik usaha memposting banyak sekali saat sedang semangat, lalu menghilang berminggu-minggu karena sibuk melayani pesanan. Pola seperti ini membuat akun terasa tidak terurus.


## Konsisten lebih penting daripada sering
Lebih baik memposting tiga kali seminggu secara rutin daripada sepuluh kali dalam satu minggu lalu berhenti. Pengikut jadi tahu kapan harus menunggu konten barumu.


## Cara menyusun jadwal yang realistis
- Hitung dulu waktu yang benar-benar kamu punya setiap minggu
- Tentukan hari dan jam tetap untuk memposting
- Siapkan konten untuk satu minggu sekaligus, jangan satu per satu
- Pakai fitur penjadwalan agar posting tetap tayang saat kamu sibuk


## Sesuaikan dengan kebiasaan audiens
Perhatikan jam ketika pengikutmu paling aktif, lalu pilih waktu posting di sekitar jam itu. Data ini biasanya tersedia di menu statistik akun.


Dengan jadwal yang rapi, kamu bisa fokus pada hal lain tanpa takut akun terbengkalai.`,
  },
  {
    judul: 'Cara Membaca Laporan Performa Media Sosial untuk Pemula',
    slug: 'cara-membaca-laporan-performa-media-sosial',
    kategori: 'Analitik',
    ringkasan: 'Laporan performa terlihat rumit? Cukup pahami beberapa angka utama ini untuk tahu apakah strategi media sosialmu berjalan baik.',
    isi: `Laporan performa membantu kamu menjawab satu pertanyaan penting: apakah usaha di media sosial sudah membawa hasil? Kamu tidak perlu memahami semua angka, cukup mulai dari yang paling berguna.


## Jangkauan (reach)
Jumlah akun berbeda yang melihat kontenmu. Angka ini menunjukkan seberapa luas brand kamu dikenal.


## Interaksi (engagement)
Total suka, komentar, simpan, dan bagikan pada kontenmu. Interaksi yang tinggi berarti konten benar-benar menarik bagi audiens, bukan sekadar terlihat.


## Klik ke tautan atau profil
Angka ini menunjukkan berapa banyak orang yang tertarik mencari tahu lebih jauh tentang produkmu. Ini sering menjadi tanda awal calon pembeli.


## Cara memakai angka-angka ini
- Bandingkan dengan bulan sebelumnya, bukan dengan akun lain
- Cari konten dengan angka tertinggi, lalu pelajari kesamaannya
- Tentukan satu target kecil untuk bulan berikutnya


Laporan yang dibaca secara rutin akan membantumu mengambil keputusan konten berdasarkan data, bukan tebakan.`,
  },
];


(async () => {
  await sinkronDb(sequelize);
  let baru = 0;
  for (const a of CONTOH) {
    const [, dibuat] = await Artikel.findOrCreate({
      where: { slug: a.slug },
      defaults: { ...a, penulis: a.penulis || 'Tim Foura Creative', terbit: true },
    });
    if (dibuat) baru++;
  }
  console.log(`${baru} artikel baru ditambahkan, ${CONTOH.length - baru} sudah ada.`);
  await sequelize.close();
})();
