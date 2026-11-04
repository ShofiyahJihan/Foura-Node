-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2026 at 07:44 AM
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
(4, 'shofiyah', '$2a$10$2wqHwlHO0q2zSLOkr0T8leVdKYO68czHGSev0ByX5t99ghuo2Ry.W', 'Shofiyah Jihan', 'Aulia', 'shofiyahjihanauliaanwar@gmail.com', '2026-10-28 23:52:55', '2026-11-02 06:51:43');

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
(15, 4, 1, 1, '2026-11-04 03:56:47', '2026-11-04 03:56:47');

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
('kontak_wa', '0882-4580-4687', '2026-11-04 05:02:32', '2026-11-04 05:02:32');

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
(1, 'Paket Basic', 'Cocok untuk bisnis yang baru memulai.', 500000.00, 'product_images/1426e4704cd734a8486ada1f.jpg', '2026-10-18 21:27:57', '2026-11-04 06:30:10', 1),
(2, 'Paket Pro', 'Untuk bisnis yang ingin lebih berkembang.', 1100000.00, 'product_images/737143b3dae35f9d1408ec63.jpg', '2026-10-18 21:27:57', '2026-11-04 06:30:20', 1),
(3, 'Paket Premium', 'Untuk brand yang ingin hasil maksimal.', 2000000.00, 'product_images/46945e7cc22ae5dfa749b045.jpg', '2026-10-18 21:27:57', '2026-11-04 06:30:29', 1),
(14, 'Konten Feed Instagram', 'Desain feed Instagram yang rapi dan sesuai karakter brand.', 35000.00, 'product_images/0e81b3ee556980f6db0ab6de.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 2),
(15, 'Konten Video TikTok', 'Video pendek untuk meningkatkan engagement.', 45000.00, 'product_images/185fbef42347d41e45eeda91.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 2),
(16, 'Sesi Foto Produk Profesional', 'Foto produk berkualitas tinggi dan estetik.', 350000.00, 'product_images/9eedf61f7a336580a1403cab.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 2),
(17, 'Video Promosi Produk', 'Video promosi untuk menampilkan produk secara menarik.', 150000.00, 'product_images/9365cd96ac3e9c465a2b8bf9.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 2),
(18, 'Desain Konten Promo Musiman', 'Desain promosi untuk momen spesial.', 200000.00, 'product_images/6b688d34874fe9f0b417db31.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 2),
(19, 'Kelola Instagram', 'Pengelolaan akun Instagram secara rutin.', 130000.00, 'product_images/c9b501f8af729061e6832e7a.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 3),
(20, 'Kelola TikTok', 'Pengelolaan akun TikTok secara rutin.', 130000.00, 'product_images/45f5f151295c810757bbfe13.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 3),
(21, 'Jadwal Posting Instagram', 'Penjadwalan posting Instagram agar konsisten.', 45000.00, 'product_images/2b1e554d650cbd586cc24f74.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 3),
(22, 'Jadwal Posting TikTok', 'Penjadwalan posting TikTok agar konsisten.', 45000.00, 'product_images/96b0a2f07aad1b8579ff62cb.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 3),
(23, 'Setup Awal Akun', 'Penyiapan akun media sosial dari awal.', 200000.00, 'product_images/4ab5b378750c634a08c7cf67.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 3),
(24, 'Riset & Strategi Konten Bulanan', 'Riset tren dan rencana konten untuk satu bulan.', 150000.00, 'product_images/5215b7ce0feb5cb827c4efff.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 3),
(25, 'Laporan Performa Sederhana', 'Ringkasan performa akun media sosial.', 75000.00, 'product_images/dbcae3476334c01172711ebd.jpg', '2026-10-18 21:28:12', '2026-11-04 06:28:32', 4),
(26, 'Laporan Performa Detail', 'Analisis performa akun yang lebih mendalam.', 175000.00, 'product_images/f7050540a87c0ed8a64c3cee.jpg', '2026-10-18 21:28:12', '2026-11-04 06:29:12', 4),
(27, 'Sesi Konsultasi Strategi', 'Diskusi strategi konten bersama tim kami.', 100000.00, 'product_images/ed88427327eb5847de439c9b.jpg', '2026-10-18 21:28:12', '2026-11-04 06:29:29', 4),
(28, 'Paket Konsultasi Rutin', 'Konsultasi berkala untuk menjaga arah strategi.', 180000.00, 'product_images/fecbc644ad6a890b4b6bfa13.jpg', '2026-10-18 21:28:12', '2026-11-04 06:29:54', 4);

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
(3, NULL, NULL, '2026-11-04 05:58:41', '2026-11-04 05:58:41', 3, NULL, NULL);

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category_product`
--
ALTER TABLE `category_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
-- AUTO_INCREMENT for table `user_admin`
--
ALTER TABLE `user_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_costumer`
--
ALTER TABLE `user_costumer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
