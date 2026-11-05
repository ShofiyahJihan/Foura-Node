-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2026 at 02:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foura_creative`
--

-- --------------------------------------------------------

--
-- Table structure for table `artikel`
--

CREATE TABLE `artikel` (
  `id` int(11) NOT NULL,
  `judul` varchar(200) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `ringkasan` varchar(400) DEFAULT NULL,
  `isi` longtext NOT NULL,
  `kategori` varchar(80) DEFAULT NULL,
  `gambar` varchar(500) DEFAULT NULL,
  `penulis` varchar(100) DEFAULT 'Tim Foura Creative',
  `penulis_foto` varchar(500) DEFAULT NULL,
  `terbit` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artikel`
--

INSERT INTO `artikel` (`id`, `judul`, `slug`, `ringkasan`, `isi`, `kategori`, `gambar`, `penulis`, `penulis_foto`, `terbit`, `created_at`, `updated_at`) VALUES
(1, '5 Tips Membuat Konten Instagram yang Menarik untuk UMKM Fashion', '5-tips-konten-instagram-umkm-fashion', 'Foto bagus saja belum cukup. Ini lima langkah sederhana supaya feed Instagram brand fashion kamu terlihat rapi dan membuat orang mau berhenti menggulir.', 'Instagram sering menjadi tempat pertama calon pembeli mengenal sebuah brand fashion. Karena itu, tampilan akun kamu perlu memberi kesan yang jelas dalam beberapa detik.\n\n\n## 1. Tentukan satu gaya visual\nPilih beberapa warna utama dan satu jenis pencahayaan, lalu pakai terus. Feed yang punya gaya konsisten lebih mudah diingat dibanding feed yang berganti-ganti tampilan.\n\n\n## 2. Foto produk dengan cahaya alami\nCahaya dekat jendela di pagi atau sore hari sudah cukup untuk hasil yang bersih. Hindari lampu kamar yang membuat warna kain tampak berbeda dari aslinya.\n\n\n## 3. Campurkan jenis konten\nJangan hanya menampilkan foto produk. Selingi dengan:\n- Video singkat cara memadukan pakaian\n- Cerita di balik proses pembuatan\n- Testimoni pelanggan\n- Promo atau info stok terbaru\n\n\n## 4. Tulis keterangan yang mengajak\nAkhiri keterangan foto dengan ajakan sederhana, misalnya bertanya warna favorit atau mengarahkan ke tautan pemesanan. Ajakan yang jelas membuat orang lebih mudah mengambil langkah berikutnya.\n\n\n## 5. Cek hasilnya secara berkala\nLihat konten mana yang paling banyak disimpan dan dibagikan, lalu buat lebih banyak yang serupa. Dari situ kamu belajar selera audiensmu sendiri.', 'Tips Konten', NULL, 'Tim Foura Creative', NULL, 1, '2026-11-05 12:50:17', '2026-11-05 12:50:17'),
(2, 'Kenapa Jadwal Posting yang Konsisten Itu Penting', 'kenapa-jadwal-posting-konsisten-itu-penting', 'Akun yang aktif tidak teratur membuat pengikut lupa. Pelajari cara menyusun jadwal posting yang realistis dan mudah dijalankan.', 'Banyak pemilik usaha memposting banyak sekali saat sedang semangat, lalu menghilang berminggu-minggu karena sibuk melayani pesanan. Pola seperti ini membuat akun terasa tidak terurus.\n\n\n## Konsisten lebih penting daripada sering\nLebih baik memposting tiga kali seminggu secara rutin daripada sepuluh kali dalam satu minggu lalu berhenti. Pengikut jadi tahu kapan harus menunggu konten barumu.\n\n\n## Cara menyusun jadwal yang realistis\n- Hitung dulu waktu yang benar-benar kamu punya setiap minggu\n- Tentukan hari dan jam tetap untuk memposting\n- Siapkan konten untuk satu minggu sekaligus, jangan satu per satu\n- Pakai fitur penjadwalan agar posting tetap tayang saat kamu sibuk\n\n\n## Sesuaikan dengan kebiasaan audiens\nPerhatikan jam ketika pengikutmu paling aktif, lalu pilih waktu posting di sekitar jam itu. Data ini biasanya tersedia di menu statistik akun.\n\n\nDengan jadwal yang rapi, kamu bisa fokus pada hal lain tanpa takut akun terbengkalai.', 'Strategi', NULL, 'Tim Foura Creative', NULL, 1, '2026-11-05 12:50:17', '2026-11-05 12:50:17'),
(3, 'Cara Membaca Laporan Performa Media Sosial untuk Pemula', 'cara-membaca-laporan-performa-media-sosial', 'Laporan performa terlihat rumit? Cukup pahami beberapa angka utama ini untuk tahu apakah strategi media sosialmu berjalan baik.', 'Laporan performa membantu kamu menjawab satu pertanyaan penting: apakah usaha di media sosial sudah membawa hasil? Kamu tidak perlu memahami semua angka, cukup mulai dari yang paling berguna.\n\n\n## Jangkauan (reach)\nJumlah akun berbeda yang melihat kontenmu. Angka ini menunjukkan seberapa luas brand kamu dikenal.\n\n\n## Interaksi (engagement)\nTotal suka, komentar, simpan, dan bagikan pada kontenmu. Interaksi yang tinggi berarti konten benar-benar menarik bagi audiens, bukan sekadar terlihat.\n\n\n## Klik ke tautan atau profil\nAngka ini menunjukkan berapa banyak orang yang tertarik mencari tahu lebih jauh tentang produkmu. Ini sering menjadi tanda awal calon pembeli.\n\n\n## Cara memakai angka-angka ini\n- Bandingkan dengan bulan sebelumnya, bukan dengan akun lain\n- Cari konten dengan angka tertinggi, lalu pelajari kesamaannya\n- Tentukan satu target kecil untuk bulan berikutnya\n\n\nLaporan yang dibaca secara rutin akan membantumu mengambil keputusan konten berdasarkan data, bukan tebakan.', 'Analitik', NULL, 'Tim Foura Creative', NULL, 1, '2026-11-05 12:50:17', '2026-11-05 12:50:17');

-- --------------------------------------------------------

--
-- Table structure for table `artikel_komentar`
--

CREATE TABLE `artikel_komentar` (
  `id` int(11) NOT NULL,
  `artikel_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `isi` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `artikel_reaksi`
--

CREATE TABLE `artikel_reaksi` (
  `id` int(11) NOT NULL,
  `artikel_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `jenis` enum('suka','simpan') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(150) DEFAULT '',
  `last_name` varchar(150) DEFAULT '',
  `email` varchar(255) DEFAULT '',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2a$10$L2inVNtZ4.wr3/ruEZ9hF.zjJ1aJq5CFoTbGPuVgQeZfiWbBhaFJi', 'Admin Foura', '', 'admin@foura.test', '2026-10-18 21:27:57', '2026-10-18 21:27:57'),
(3, 'budi', '$2a$10$pbyrqcLcZzk8QzVRATWQZONbURak3t.mCTFdFCdJ8nPGSWfnkjKmG', 'Budi', '', 'budi@foura.test', '2026-10-18 21:27:57', '2026-10-18 21:27:57'),
(4, 'shofiyah', '$2a$10$2wqHwlHO0q2zSLOkr0T8leVdKYO68czHGSev0ByX5t99ghuo2Ry.W', 'Shofiyah Jihan', 'Aulia', 'shofiyahjihanauliaanwar@gmail.com', '2026-10-28 23:52:55', '2026-11-02 06:51:43'),
(5, 'jeeanrin', '$2a$10$F3FxP/QOKreAmkARnLwlvulH5tTvr2df8bqF8TflzVoRfz8UiWIsq', 'jeeanrin', '', '', '2026-11-05 12:24:55', '2026-11-05 12:24:55');

-- --------------------------------------------------------

--
-- Table structure for table `category_product`
--

CREATE TABLE `category_product` (
  `id` int(11) NOT NULL,
  `name_kategori` varchar(100) NOT NULL,
  `deskripsi_kategori` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_product`
--

INSERT INTO `category_product` (`id`, `name_kategori`, `deskripsi_kategori`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Paket Bundling', 'Solusi lengkap untuk mengelola media sosial bisnismu.', NULL, '2026-10-18 21:27:57', '2026-10-18 21:27:57'),
(2, 'Konten & Foto', 'Konten visual yang menarik untuk brand fashion.', NULL, '2026-10-18 21:27:57', '2026-10-18 21:27:57'),
(3, 'Manajemen Akun', 'Pengelolaan akun media sosial agar tetap aktif dan konsisten.', NULL, '2026-10-18 21:27:57', '2026-10-18 21:28:12'),
(4, 'Laporan & Konsultasi', 'Pantau performa dan dapatkan arahan strategi dari tim kami.', NULL, '2026-10-18 21:27:57', '2026-10-18 21:28:12');

-- --------------------------------------------------------

--
-- Table structure for table `kebijakan_bagian`
--

CREATE TABLE `kebijakan_bagian` (
  `id` int(11) NOT NULL,
  `halaman` varchar(40) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `anchor` varchar(60) DEFAULT NULL,
  `urutan` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kebijakan_bagian`
--

INSERT INTO `kebijakan_bagian` (`id`, `halaman`, `judul`, `anchor`, `urutan`, `created_at`, `updated_at`) VALUES
(1, 'kebijakan-privasi', 'Kebijakan Privasi & Keamanan', NULL, 1, '2026-11-04 05:55:33', '2026-11-04 05:55:33'),
(2, 'syarat-ketentuan', 'Kebijakan Penggunaan Website', NULL, 1, '2026-11-04 05:55:33', '2026-11-04 05:55:33'),
(3, 'syarat-ketentuan', 'Kebijakan Pengembalian Dana & Layanan', 'pengembalian-dana', 2, '2026-11-04 05:55:33', '2026-11-04 05:55:33');

-- --------------------------------------------------------

--
-- Table structure for table `kebijakan_butir`
--

CREATE TABLE `kebijakan_butir` (
  `id` int(11) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `isi` text NOT NULL,
  `urutan` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `bagian_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kebijakan_butir`
--

INSERT INTO `kebijakan_butir` (`id`, `judul`, `isi`, `urutan`, `created_at`, `updated_at`, `bagian_id`) VALUES
(1, 'Pengumpulan Data Pengguna', 'Foura Creative mengumpulkan data pengguna seperti nama, username, alamat email, nomor WhatsApp, alamat, dan nama UMKM, serta data pesanan. Data ini digunakan untuk memproses pesanan, menghubungi klien, dan meningkatkan kualitas layanan website.', 1, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 1),
(2, 'Keamanan Data', 'Foura Creative berkomitmen menjaga keamanan data pengguna. Password disimpan dalam bentuk terenkripsi dan akses ke akun dilindungi dengan sistem masuk, guna mencegah penyalahgunaan data.', 2, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 1),
(3, 'Penyimpanan Data', 'Data pengguna disimpan selama akun masih digunakan. Pengguna dapat meminta penghapusan data melalui kontak resmi Foura Creative.', 3, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 1),
(4, 'Tujuan Website', 'Website Foura Creative bertujuan membantu UMKM fashion di Makassar memilih dan memesan layanan pengelolaan media sosial secara praktis, cepat, dan terstruktur melalui katalog layanan, kalkulator estimasi kebutuhan, dan keranjang.', 1, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 2),
(5, 'Penggunaan Layanan', 'Pengguna menggunakan website untuk melihat katalog, memilih paket atau layanan satuan, memasukkannya ke keranjang, dan memantau pesanan. Untuk memesan, pengguna wajib mendaftar dan masuk, serta bertanggung jawab atas keakuratan data yang dimasukkan.', 2, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 2),
(6, 'Pembayaran & Transaksi', 'Website menampilkan harga layanan dalam Rupiah dan dapat terhubung dengan sistem pembayaran. Pesanan mulai dikerjakan setelah pembayaran terkonfirmasi. Pengguna diharapkan memastikan data yang dimasukkan benar. Foura Creative tidak bertanggung jawab atas kesalahan yang disebabkan oleh input yang tidak sesuai.', 3, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 2),
(7, 'Revisi & Pembatalan', 'Setiap hasil kerja mencakup maksimal dua kali revisi sesuai brief awal. Pesanan dapat dibatalkan sebelum pengerjaan dimulai, sedangkan layanan yang sudah selesai dan diserahkan tidak dapat dibatalkan.', 4, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 2),
(8, 'Hak Kekayaan Intelektual', 'Hasil kerja yang telah dibayar lunas boleh digunakan untuk keperluan bisnis klien. Foura Creative dapat menampilkannya sebagai portofolio kecuali klien menyatakan keberatan secara tertulis.', 5, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 2),
(9, 'Ketentuan Pengembalian Dana', 'Dana dikembalikan 100% jika pesanan dibatalkan sebelum pengerjaan dimulai, atau jika Foura Creative tidak dapat menyediakan layanan yang dipesan. Jika pengerjaan sudah berjalan, dana dikembalikan secara proporsional untuk bagian yang belum dikerjakan. Layanan yang sudah selesai dan diserahkan tidak dapat dikembalikan dananya.', 1, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 3),
(10, 'Cara Mengajukan Pengembalian Dana', 'Pengajuan dilakukan melalui kontak resmi Foura Creative (email fouracreativee@gmail.com atau Instagram @fouracreativee) dengan menyertakan kode pesanan dan alasan pengajuan. Pengajuan yang disetujui diproses dalam 3 sampai 7 hari kerja, dan dana dikembalikan melalui metode pembayaran yang digunakan.', 2, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 3),
(11, 'Kebijakan Produk dan Layanan', 'Seluruh layanan Foura Creative berupa jasa digital, sehingga tidak ada pengiriman barang fisik. Hasil kerja diserahkan secara digital sesuai waktu pengerjaan yang tertera pada tiap layanan. Jika hasil tidak sesuai brief, klien berhak atas revisi sebelum mengajukan pengembalian dana.', 3, '2026-11-04 05:55:33', '2026-11-04 05:55:33', 3);

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `jumlah` int(11) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `keranjang`
--

INSERT INTO `keranjang` (`id`, `user_id`, `product_id`, `jumlah`, `created_at`, `updated_at`) VALUES
(15, 4, 1, 1, '2026-11-04 03:56:47', '2026-11-04 03:56:47'),
(16, 4, 16, 1, '2026-11-05 08:26:56', '2026-11-05 08:26:56');

-- --------------------------------------------------------

--
-- Table structure for table `media_file`
--

CREATE TABLE `media_file` (
  `id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `uploaded_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengaturan`
--

CREATE TABLE `pengaturan` (
  `kunci` varchar(100) NOT NULL,
  `nilai` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengaturan`
--

INSERT INTO `pengaturan` (`kunci`, `nilai`, `created_at`, `updated_at`) VALUES
('banner_judul', 'Tingkatkan Brand Fashion UMKM Anda di Media Sosial', '2026-11-04 04:47:59', '2026-11-04 04:47:59'),
('banner_label', 'Jasa pengelolaan media sosial', '2026-11-04 04:47:59', '2026-11-04 04:47:59'),
('banner_sorot', 'Brand', '2026-11-04 04:47:59', '2026-11-04 04:47:59'),
('banner_teks', 'Foura Creative hadir untuk membantu UMKM fashion di Makassar mengelola media sosial secara profesional, kreatif, dan strategis.', '2026-11-04 04:47:59', '2026-11-04 04:47:59'),
('banner_tombol1', 'Lihat Katalog →', '2026-11-04 04:47:59', '2026-11-04 04:47:59'),
('banner_tombol2', 'Coba Kalkulator', '2026-11-04 04:47:59', '2026-11-04 04:47:59'),
('footer_deskripsi', 'Jasa pengelolaan media sosial untuk UMKM fashion di Makassar. Konten, jadwal posting, sampai laporan performa bulanan.', '2026-11-04 05:02:32', '2026-11-04 05:02:32'),
('kontak_instagram', 'fouracreativee', '2026-11-04 05:02:32', '2026-11-04 05:02:32'),
('kontak_tiktok', 'fouracreative', '2026-11-04 05:02:32', '2026-11-04 05:02:32'),
('kontak_wa', '0882-4580-4687', '2026-11-04 05:02:32', '2026-11-04 05:02:32'),
('tentang_cerita_1', 'Foura Creative didirikan di Makassar oleh sekelompok anak muda yang percaya bahwa setiap brand, sekecil apa pun, layak tampil menarik dan profesional di media sosial.', '2026-11-04 07:34:33', '2026-11-04 07:34:33'),
('tentang_cerita_2', 'Kami melihat banyak UMKM fashion di Makassar yang punya produk luar biasa, tapi masih kesulitan mengelola media sosial dan membangun citra brand yang kuat. Dari situlah Foura Creative lahir.', '2026-11-04 07:34:33', '2026-11-04 07:34:33'),
('tentang_cerita_judul', 'Berawal dari kecintaan pada fashion dan dunia digital.', '2026-11-04 07:34:33', '2026-11-04 07:34:33'),
('tentang_hero_teks', 'Foura Creative hadir untuk membantu brand fashion lokal tumbuh melalui strategi media sosial yang tepat, konten yang berkualitas, dan pendekatan yang kreatif serta berkelanjutan.', '2026-11-04 07:34:33', '2026-11-04 07:34:33'),
('tentang_tim_judul', 'Di balik setiap konten hebat, ada tim yang luar biasa.', '2026-11-04 07:34:33', '2026-11-04 07:34:33'),
('tentang_tim_teks', 'Foura Creative terdiri dari mahasiswa yang bekerja sebagai strategist, analyst, dan content creator, dengan semangat membantu brand fashion lokal di Makassar berkembang.', '2026-11-04 07:34:33', '2026-11-04 07:34:33');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id` int(11) NOT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `nama_pelanggan` varchar(255) DEFAULT '',
  `total` int(11) DEFAULT 0,
  `status` varchar(255) DEFAULT 'menunggu',
  `tahap` int(11) DEFAULT 0,
  `tahap_tanggal` text DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `metode_bayar` varchar(30) DEFAULT NULL,
  `bukti_bayar` varchar(255) DEFAULT NULL,
  `status_bayar` varchar(30) DEFAULT 'belum_bayar',
  `nama_umkm` varchar(150) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `bukti_data` longtext DEFAULT NULL,
  `bukti_mime` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pesanan_item`
--

CREATE TABLE `pesanan_item` (
  `id` int(11) NOT NULL,
  `pesanan_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `kategori` varchar(255) DEFAULT '',
  `harga` int(11) DEFAULT 0,
  `satuan` varchar(255) DEFAULT '',
  `jumlah` int(11) DEFAULT 1,
  `gambar` varchar(255) DEFAULT '',
  `fitur` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `deskripsi`, `price`, `image`, `created_at`, `updated_at`, `category_id`) VALUES
(1, 'Paket Basic', 'Cocok untuk bisnis yang baru memulai.', 500000.00, 'product_images/1426e4704cd734a8486ada1f.jpg', '2026-10-18 21:27:57', '2026-11-05 12:59:39', 1),
(2, 'Paket Pro', 'Untuk bisnis yang ingin lebih berkembang.', 1100000.00, 'product_images/737143b3dae35f9d1408ec63.jpg', '2026-10-18 21:27:57', '2026-11-05 12:59:39', 1),
(3, 'Paket Premium', 'Untuk brand yang ingin hasil maksimal.', 2000000.00, 'product_images/46945e7cc22ae5dfa749b045.jpg', '2026-10-18 21:27:57', '2026-11-05 12:59:39', 1),
(14, 'Konten Feed Instagram', 'Desain feed Instagram yang rapi dan sesuai karakter brand.', 35000.00, 'product_images/0e81b3ee556980f6db0ab6de.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 2),
(15, 'Konten Video TikTok', 'Video pendek untuk meningkatkan engagement.', 45000.00, 'product_images/185fbef42347d41e45eeda91.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 2),
(16, 'Sesi Foto Produk Profesional', 'Foto produk berkualitas tinggi dan estetik.', 350000.00, 'product_images/9eedf61f7a336580a1403cab.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 2),
(17, 'Video Promosi Produk', 'Video promosi untuk menampilkan produk secara menarik.', 150000.00, 'product_images/9365cd96ac3e9c465a2b8bf9.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 2),
(18, 'Desain Konten Promo Musiman', 'Desain promosi untuk momen spesial.', 200000.00, 'product_images/6b688d34874fe9f0b417db31.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 2),
(19, 'Kelola Instagram', 'Pengelolaan akun Instagram secara rutin.', 130000.00, 'product_images/c9b501f8af729061e6832e7a.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 3),
(20, 'Kelola TikTok', 'Pengelolaan akun TikTok secara rutin.', 130000.00, 'product_images/45f5f151295c810757bbfe13.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 3),
(21, 'Jadwal Posting Instagram', 'Penjadwalan posting Instagram agar konsisten.', 45000.00, 'product_images/2b1e554d650cbd586cc24f74.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 3),
(22, 'Jadwal Posting TikTok', 'Penjadwalan posting TikTok agar konsisten.', 45000.00, 'product_images/96b0a2f07aad1b8579ff62cb.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 3),
(23, 'Setup Awal Akun', 'Penyiapan akun media sosial dari awal.', 200000.00, 'product_images/4ab5b378750c634a08c7cf67.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 3),
(24, 'Riset & Strategi Konten Bulanan', 'Riset tren dan rencana konten untuk satu bulan.', 150000.00, 'product_images/5215b7ce0feb5cb827c4efff.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 3),
(25, 'Laporan Performa Sederhana', 'Ringkasan performa akun media sosial.', 75000.00, 'product_images/dbcae3476334c01172711ebd.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 4),
(26, 'Laporan Performa Detail', 'Analisis performa akun yang lebih mendalam.', 175000.00, 'product_images/f7050540a87c0ed8a64c3cee.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 4),
(27, 'Sesi Konsultasi Strategi', 'Diskusi strategi konten bersama tim kami.', 100000.00, 'product_images/ed88427327eb5847de439c9b.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 4),
(28, 'Paket Konsultasi Rutin', 'Konsultasi berkala untuk menjaga arah strategi.', 180000.00, 'product_images/fecbc644ad6a890b4b6bfa13.jpg', '2026-10-18 21:28:12', '2026-11-05 12:59:39', 4);

-- --------------------------------------------------------

--
-- Table structure for table `product_media`
--

CREATE TABLE `product_media` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `product_id` int(11) NOT NULL,
  `media_file_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tentang_item`
--

CREATE TABLE `tentang_item` (
  `id` int(11) NOT NULL,
  `jenis` varchar(20) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `teks` text DEFAULT NULL,
  `ikon` varchar(20) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `urutan` int(11) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tentang_item`
--

INSERT INTO `tentang_item` (`id`, `jenis`, `judul`, `teks`, `ikon`, `foto`, `urutan`, `created_at`, `updated_at`) VALUES
(1, 'keunggulan', 'Kreatif & Strategis', 'Setiap konten dirancang dengan strategi yang matang, bukan sekadar tampil.', 'bulb', NULL, 1, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(2, 'keunggulan', 'Tim Profesional', 'Dikerjakan oleh tim yang paham media sosial dan dunia fashion.', 'users', NULL, 2, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(3, 'keunggulan', 'Fokus pada Hasil', 'Kami tidak hanya membuat konten, tapi juga memantau performa dan terus memperbaiki.', 'chart', NULL, 3, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(4, 'keunggulan', 'Tumbuh Bersama', 'Kami ingin brand kamu tumbuh panjang dan berkelanjutan bersama kami.', 'heart', NULL, 4, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(5, 'tim', 'Mutiah Anwar', 'Strategist', NULL, '/images/tim/mutiah.jpg', 1, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(6, 'tim', 'Nadyah Fakhiriyah Izzah FS', 'Analyst', NULL, '/images/tim/nadyah.jpg', 2, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(7, 'tim', 'Shofiyah Jihan Aulia Anwar', 'CEO', NULL, '/images/tim/shofiyah.jpg', 3, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(8, 'tim', 'Siti Nadhifa Fadhilah', 'Content Creator', NULL, '/images/tim/nadhifa.jpg', 4, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(9, 'nilai', 'Kreativitas Tanpa Batas', 'Kami selalu mencari ide segar yang relevan dengan brand kamu.', NULL, NULL, 1, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(10, 'nilai', 'Integritas', 'Kerja jujur, transparan, dan bisa dipercaya.', NULL, NULL, 2, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(11, 'nilai', 'Kolaborasi', 'Kami bekerja bersama klien, bukan hanya untuk klien.', NULL, NULL, 3, '2026-11-04 07:34:35', '2026-11-04 07:34:35'),
(12, 'nilai', 'Pertumbuhan Berkelanjutan', 'Fokus pada hasil jangka panjang, bukan tren sesaat.', NULL, NULL, 4, '2026-11-04 07:34:35', '2026-11-04 07:34:35');

-- --------------------------------------------------------

--
-- Table structure for table `tentang_teks`
--

CREATE TABLE `tentang_teks` (
  `id` int(11) NOT NULL,
  `kunci` varchar(60) NOT NULL,
  `nilai` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tentang_teks`
--

INSERT INTO `tentang_teks` (`id`, `kunci`, `nilai`, `created_at`, `updated_at`) VALUES
(1, 'hero_judul', 'Kami adalah partner kreatif untuk UMKM *fashion* di Makassar.', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(2, 'hero_teks', 'Foura Creative hadir untuk membantu brand fashion lokal tumbuh melalui strategi media sosial yang tepat, konten yang berkualitas, dan pendekatan yang kreatif serta berkelanjutan.', '2026-11-05 06:52:03', '2026-11-05 07:03:23'),
(3, 'hero_gambar', '/images/tentang/hero.jpg', '2026-11-05 06:52:03', '2026-11-05 07:03:23'),
(4, 'cerita_judul', 'Berawal dari kecintaan pada fashion dan dunia digital.', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(5, 'cerita_1', 'Foura Creative didirikan di Makassar oleh sekelompok anak muda yang percaya bahwa setiap brand, sekecil apa pun, layak tampil menarik dan profesional di media sosial.', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(6, 'cerita_2', 'Kami melihat banyak UMKM fashion di Makassar yang punya produk luar biasa, tapi masih kesulitan mengelola media sosial dan membangun citra brand yang kuat. Dari situlah Foura Creative lahir.', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(7, 'cerita_tombol', 'Lihat Layanan →', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(8, 'cerita_gambar', '/images/tentang/cerita.jpg', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(9, 'tim_judul', 'Di balik setiap konten hebat, ada tim yang luar biasa.', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(10, 'tim_teks', 'Foura Creative terdiri dari individu-individu berbakat yang berkolaborasi untuk membuat konten terbaik bagi brand kamu.', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(11, 'nilai_judul', 'Nilai yang selalu kami pegang.', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(12, 'nilai_gambar', '/images/tentang/nilai.jpg', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(13, 'cta_eyebrow', 'SIAP MEMBANGUN BRAND KAMU?', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(14, 'cta_judul', 'Yuk, mulai perjalanan kreatif bersama Foura Creative.', '2026-11-05 06:52:03', '2026-11-05 07:08:24'),
(15, 'cta_tombol', 'Hubungi Kami →', '2026-11-05 06:52:03', '2026-11-05 07:08:24');

-- --------------------------------------------------------

--
-- Table structure for table `user_admin`
--

CREATE TABLE `user_admin` (
  `id` int(11) NOT NULL,
  `alamat` text DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_admin`
--

INSERT INTO `user_admin` (`id`, `alamat`, `no_hp`, `created_at`, `updated_at`, `user_id`, `foto`) VALUES
(1, NULL, NULL, '2026-10-18 21:27:57', '2026-10-18 21:27:57', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_costumer`
--

CREATE TABLE `user_costumer` (
  `id` int(11) NOT NULL,
  `alamat` text DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama_umkm` varchar(150) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_costumer`
--

INSERT INTO `user_costumer` (`id`, `alamat`, `no_hp`, `created_at`, `updated_at`, `user_id`, `nama_umkm`, `foto`) VALUES
(2, '-', '082293658120', '2026-10-28 23:52:55', '2026-11-02 06:51:43', 4, 'Butik', '/uploads/profil/u4-1793419110971.jpg'),
(3, NULL, NULL, '2026-11-04 05:58:41', '2026-11-04 05:58:41', 3, NULL, NULL),
(4, NULL, NULL, '2026-11-05 12:24:55', '2026-11-05 12:24:55', 5, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `artikel_komentar`
--
ALTER TABLE `artikel_komentar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `artikel_reaksi`
--
ALTER TABLE `artikel_reaksi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `artikel_reaksi_artikel_id_user_id_jenis` (`artikel_id`,`user_id`,`jenis`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `category_product`
--
ALTER TABLE `category_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kebijakan_bagian`
--
ALTER TABLE `kebijakan_bagian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kebijakan_butir`
--
ALTER TABLE `kebijakan_butir`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bagian_id` (`bagian_id`);

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media_file`
--
ALTER TABLE `media_file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengaturan`
--
ALTER TABLE `pengaturan`
  ADD PRIMARY KEY (`kunci`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `pesanan_item`
--
ALTER TABLE `pesanan_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_media`
--
ALTER TABLE `product_media`
  ADD PRIMARY KEY (`product_id`,`media_file_id`),
  ADD KEY `media_file_id` (`media_file_id`);

--
-- Indexes for table `tentang_item`
--
ALTER TABLE `tentang_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tentang_teks`
--
ALTER TABLE `tentang_teks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kunci` (`kunci`);

--
-- Indexes for table `user_admin`
--
ALTER TABLE `user_admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `user_costumer`
--
ALTER TABLE `user_costumer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `artikel_komentar`
--
ALTER TABLE `artikel_komentar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `artikel_reaksi`
--
ALTER TABLE `artikel_reaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category_product`
--
ALTER TABLE `category_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `kebijakan_bagian`
--
ALTER TABLE `kebijakan_bagian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kebijakan_butir`
--
ALTER TABLE `kebijakan_butir`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `media_file`
--
ALTER TABLE `media_file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pesanan_item`
--
ALTER TABLE `pesanan_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tentang_item`
--
ALTER TABLE `tentang_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tentang_teks`
--
ALTER TABLE `tentang_teks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_admin`
--
ALTER TABLE `user_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_costumer`
--
ALTER TABLE `user_costumer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kebijakan_butir`
--
ALTER TABLE `kebijakan_butir`
  ADD CONSTRAINT `kebijakan_butir_ibfk_1` FOREIGN KEY (`bagian_id`) REFERENCES `kebijakan_bagian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_media`
--
ALTER TABLE `product_media`
  ADD CONSTRAINT `product_media_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_media_ibfk_2` FOREIGN KEY (`media_file_id`) REFERENCES `media_file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_admin`
--
ALTER TABLE `user_admin`
  ADD CONSTRAINT `user_admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_costumer`
--
ALTER TABLE `user_costumer`
  ADD CONSTRAINT `user_costumer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
