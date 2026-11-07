const express = require('express');
const crypto = require('crypto');
const multer = require('multer');
const midtransClient = require('midtrans-client');
const { requireLogin } = require('../middleware/auth');
const { Product, CategoryProduct, UserCostumer } = require('../models');
const { CheckoutKeranjang, CheckoutPesanan, CheckoutPesananItem, siapkan } = require('../models/pembayaran');
const sequelize = require('../db');
const cfg = require('../config/pembayaran');
const { ProdukInfo } = require('../services/produk-info');

const router = express.Router();

const METODE = cfg.metode;
const EKSTENSI = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };

/* ---------- Midtrans ---------- */
const produksi = process.env.MIDTRANS_IS_PRODUCTION === 'true';
const snap = new midtransClient.Snap({
  isProduction: produksi,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
const SNAP_JS = produksi
  ? 'https://app.midtrans.com/snap/snap.js'
  : 'https://app.sandbox.midtrans.com/snap/snap.js';

// Terjemahkan status Midtrans ke status di website
function statusDariMidtrans(s) {
  const t = s.transaction_status, f = s.fraud_status;
  if (t === 'settlement' || (t === 'capture' && f !== 'challenge')) return 'lunas';
  if (['deny', 'cancel', 'expire', 'failure'].includes(t)) return 'gagal';
  return 'pending';
}
async function terapkan(pesanan, s) {
  const hasil = statusDariMidtrans(s);
  if (hasil === 'lunas') await pesanan.update({ status_bayar: 'lunas' });
  else if (hasil === 'gagal' && pesanan.status_bayar !== 'lunas') {
    // kosongkan token supaya pembeli bisa mencoba bayar lagi
    await pesanan.update({ snap_token: null, midtrans_order_id: null });
  }
}

/* ---------- upload bukti bayar ----------
   Bukti disimpan di DATABASE (bukan di folder), jadi aman dipakai di Vercel
   yang foldernya tidak bisa ditulisi. */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: cfg.batasMB * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(EKSTENSI[file.mimetype] ? null : new Error('FORMAT'), !!EKSTENSI[file.mimetype]),
});
const unggah = (req, res, next) => upload.single('bukti')(req, res, (err) => {
  if (err) req.errUpload = err.code === 'LIMIT_FILE_SIZE'
    ? `Ukuran file maksimal ${cfg.batasMB} MB.`
    : 'Bukti bayar harus berupa gambar JPG, PNG, atau WEBP.';
  next();
});
// Kolom bukti yang diisi dari file unggahan (kosong kalau tidak ada file)
const kolomBukti = (file, kode) => file
  ? { bukti_bayar: '/pembayaran/bukti/' + encodeURIComponent(kode), bukti_data: file.buffer.toString('base64'), bukti_mime: file.mimetype }
  : { bukti_bayar: null, bukti_data: null, bukti_mime: null };

/* ---------- bantuan ---------- */
// Ubah nilai "pilih" (satu nilai atau banyak) jadi daftar id angka. Kosong = semua item.
const idDipilih = (v) => [].concat(v ?? []).map(Number).filter((n) => Number.isInteger(n) && n > 0);

async function muatKeranjang(userId, opsi = {}, ids = []) {
  const where = { user_id: userId };
  if (ids.length) where.id = ids;
  const baris = await CheckoutKeranjang.findAll({ where, order: [['id', 'ASC']], ...opsi });
  const produk = baris.length
    ? await Product.findAll({ where: { id: baris.map((b) => b.product_id) }, include: [{ model: CategoryProduct, as: 'category' }], ...opsi })
    : [];
  const peta = new Map(produk.map((p) => [p.id, p]));
  const items = [];
  for (const b of baris) {
    const p = peta.get(b.product_id);
    if (!p) continue;
    // sama seperti halaman keranjang: ambil info lewat findOne
    const info = await ProdukInfo.findOne({ where: { productId: p.id } });
    const jumlah = Math.max(1, Number(b.jumlah) || 1);
    const harga = Math.round(Number(p.price));
    items.push({
      rid: b.id, produk: p, nama: p.name, kategori: p.category ? p.category.name_kategori : '',
      gambar: (info && info.gambar) || p.image || '',
      satuan: (info && info.satuan) || '',
      fitur: (info && info.fitur) || null,
      jumlah, harga, subtotal: harga * jumlah,
    });
  }
  return { items, total: items.reduce((s, i) => s + i.subtotal, 0), jumlahBaris: baris.length };
}

const hitungKeranjang = async (userId) => (await CheckoutKeranjang.sum('jumlah', { where: { user_id: userId } })) || 0;

// Nilai "-" (isian kosong bawaan di profil) dianggap kosong
const bersih = (v) => { v = String(v ?? '').trim(); return v === '-' ? '' : v; };

async function ambilProfil(user) {
  try {
    const p = await UserCostumer.findOne({ where: { user_id: user.id } });
    return { no_hp: bersih(p && p.no_hp), nama_umkm: bersih(p && p.nama_umkm), alamat: bersih(p && p.alamat) };
  } catch (e) { return { no_hp: '', nama_umkm: '', alamat: '' }; }
}

async function buatKode() {
  const t = new Date();
  const tgl = String(t.getFullYear()).slice(2) + String(t.getMonth() + 1).padStart(2, '0') + String(t.getDate()).padStart(2, '0');
  for (let i = 0; i < 10; i++) {
    const kode = `FC-${tgl}-${crypto.randomInt(1000, 10000)}`;
    if (!(await CheckoutPesanan.findOne({ where: { kode } }))) return kode;
  }
  return `FC-${tgl}-${Date.now()}`;
}

async function tampilkanForm(req, res, { status = 200, errors = null, nilai = {} } = {}) {
  const ids = idDipilih(nilai.pilih ?? req.query.pilih);
  const k = await muatKeranjang(req.user.id, {}, ids);
  if (!k.items.length) {
    req.flash('error', 'Pilih minimal satu item di keranjang.');
    return res.redirect('/keranjang');
  }
  const profil = await ambilProfil(req.user);
  const isi = {
    nama_depan: nilai.nama_depan ?? bersih(req.user.first_name),
    nama_belakang: nilai.nama_belakang ?? bersih(req.user.last_name),
    nama_umkm: nilai.nama_umkm ?? profil.nama_umkm,
    email: nilai.email ?? bersih(req.user.email),
    no_hp: nilai.no_hp ?? profil.no_hp,
    alamat: nilai.alamat ?? profil.alamat,
    catatan: nilai.catatan ?? String(req.query.catatan || ''),
    metode: nilai.metode || 'qris',
  };
  res.status(status).render('pembayaran', {
    title: 'Pembayaran', items: k.items, total: k.total, isi, errors, cfg, METODE,
    jumlahKeranjang: await hitungKeranjang(req.user.id),
  });
}

/* ---------- GET /pembayaran : halaman bayar ---------- */
router.get('/', requireLogin, async (req, res, next) => {
  try { await siapkan(); await tampilkanForm(req, res); } catch (e) { next(e); }
});

/* ---------- POST /pembayaran : buat pesanan (hanya item yang dipilih) ---------- */
router.post('/', requireLogin, unggah, async (req, res, next) => {
  try {
    await siapkan();
    const b = req.body;
    const ids = idDipilih(b.pilih);
    const nama_depan = bersih(b.nama_depan).slice(0, 100);
    const nama_belakang = bersih(b.nama_belakang).slice(0, 100);
    const nama_umkm = bersih(b.nama_umkm).slice(0, 150);
    const email = bersih(b.email).slice(0, 255);
    const alamat = bersih(b.alamat).slice(0, 500);
    const hp = String(b.no_hp || '').replace(/[\s-]/g, '');
    const metode = 'midtrans';
    const catatan = String(b.catatan || '').trim().slice(0, 1000);
    const nama = [nama_depan, nama_belakang].filter(Boolean).join(' ');

    const errors = [];
    if (!nama_depan) errors.push('Nama depan wajib diisi.');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Email tidak valid.');
    if (!/^(\+62|62|0)8\d{7,12}$/.test(hp)) errors.push('Nomor WhatsApp tidak valid. Contoh: 081234567890.');
    if (req.errUpload) errors.push(req.errUpload);
    if (errors.length) {
      return tampilkanForm(req, res, {
        status: 400, errors,
        nilai: { nama_depan, nama_belakang, nama_umkm, email, alamat, no_hp: String(b.no_hp || ''), catatan, metode, pilih: ids },
      });
    }

    const kode = await buatKode();
    const hasil = await sequelize.transaction(async (t) => {
      const k = await muatKeranjang(req.user.id, { transaction: t }, ids);
      if (!k.items.length) return null;
      const pesanan = await CheckoutPesanan.create({
        kode, user_id: req.user.id, nama_pelanggan: nama, no_hp: hp, nama_umkm: nama_umkm || null,
        email: email || null, alamat: alamat || null, total: k.total,
        status: 'menunggu', tahap: 0, catatan: catatan || null, metode_bayar: metode,
        ...kolomBukti(req.file, kode), status_bayar: req.file ? 'menunggu_verifikasi' : 'belum_bayar',
      }, { transaction: t });
      await CheckoutPesananItem.bulkCreate(k.items.map((i) => ({
        pesanan_id: pesanan.id, product_id: i.produk.id, nama: i.nama, kategori: i.kategori,
        harga: i.harga, satuan: i.satuan, jumlah: i.jumlah, gambar: i.gambar, fitur: i.fitur,
      })), { transaction: t });
      // hapus dari keranjang hanya item yang dipesan; sisanya tetap ada
      await CheckoutKeranjang.destroy({
        where: { user_id: req.user.id, id: k.items.map((i) => i.rid) }, transaction: t,
      });
      return pesanan;
    });

    if (!hasil) {
      req.flash('error', 'Pilih minimal satu item di keranjang.');
      return res.redirect('/keranjang');
    }
    req.flash('ok', 'Pesanan dibuat. Selesaikan pembayaran untuk memprosesnya.');
    res.redirect('/pembayaran/selesai/' + encodeURIComponent(kode));
  } catch (e) { next(e); }
});

/* ---------- halaman setelah memesan ---------- */
async function ambilPesanan(req) {
  return CheckoutPesanan.findOne({
    where: { kode: req.params.kode, user_id: req.user.id },
    attributes: { exclude: ['bukti_data'] },
    include: [{ model: CheckoutPesananItem, as: 'items' }],
  });
}

router.get('/selesai/:kode', requireLogin, async (req, res, next) => {
  try {
    await siapkan();
    const pesanan = await ambilPesanan(req);
    if (!pesanan) return res.status(404).render('error', { title: 'Tidak ditemukan', pesan: 'Pesanan tidak ditemukan.' });
    res.render('pembayaran-selesai', {
      title: 'Pesanan ' + pesanan.kode, pesanan, cfg, METODE,
      snapUrl: SNAP_JS, clientKey: process.env.MIDTRANS_CLIENT_KEY,
      jumlahKeranjang: await hitungKeranjang(req.user.id),
    });
  } catch (e) { next(e); }
});

router.post('/selesai/:kode/bukti', requireLogin, unggah, async (req, res, next) => {
  try {
    await siapkan();
    const pesanan = await ambilPesanan(req);
    const balik = '/pembayaran/selesai/' + encodeURIComponent(req.params.kode);
    if (!pesanan) return res.status(404).render('error', { title: 'Tidak ditemukan', pesan: 'Pesanan tidak ditemukan.' });
    if (pesanan.status_bayar === 'lunas') { req.flash('error', 'Pesanan ini sudah lunas.'); return res.redirect(balik); }
    if (req.errUpload || !req.file) {
      req.flash('error', req.errUpload || 'Pilih file bukti bayar dulu.');
      return res.redirect(balik);
    }
    await pesanan.update({ ...kolomBukti(req.file, pesanan.kode), status_bayar: 'menunggu_verifikasi' });
    req.flash('ok', 'Bukti bayar terkirim. Tim kami akan memeriksanya.');
    res.redirect(balik);
  } catch (e) { next(e); }
});

/* ---------- tampilkan gambar bukti (pemilik pesanan atau admin) ---------- */
router.get('/bukti/:kode', requireLogin, async (req, res, next) => {
  try {
    await siapkan();
    const pesanan = await CheckoutPesanan.findOne({ where: { kode: req.params.kode } });
    const boleh = pesanan && (pesanan.user_id === req.user.id || req.role === 'admin');
    if (!boleh || !pesanan.bukti_data) return res.status(404).render('error', { title: 'Tidak ditemukan', pesan: 'Bukti bayar tidak ditemukan.' });
    res.set('Cache-Control', 'private, no-store');
    res.type(pesanan.bukti_mime || 'image/jpeg').send(Buffer.from(pesanan.bukti_data, 'base64'));
  } catch (e) { next(e); }
});

/* ---------- Midtrans: buat token pembayaran ---------- */
router.post('/selesai/:kode/snap', requireLogin, async (req, res) => {
  try {
    await siapkan();
    const pesanan = await ambilPesanan(req);
    if (!pesanan) return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
    if (pesanan.status_bayar === 'lunas') return res.status(400).json({ error: 'Pesanan sudah lunas.' });
    if (pesanan.snap_token) return res.json({ token: pesanan.snap_token });

    const orderId = `${pesanan.kode}-${Date.now()}`;
    const trx = await snap.createTransaction({
      transaction_details: { order_id: orderId, gross_amount: pesanan.total },
      item_details: pesanan.items.map((i) => ({
        id: String(i.product_id || i.id), price: i.harga, quantity: i.jumlah, name: String(i.nama).slice(0, 50),
      })),
      customer_details: {
        first_name: pesanan.nama_pelanggan, phone: pesanan.no_hp, email: pesanan.email || undefined,
      },
    });
    await pesanan.update({ snap_token: trx.token, midtrans_order_id: orderId });
    res.json({ token: trx.token });
  } catch (e) {
    console.error('Midtrans:', e.message);
    res.status(500).json({ error: 'Gagal membuat pembayaran. Coba lagi.' });
  }
});

/* ---------- Midtrans: cek status (dipanggil setelah popup ditutup) ---------- */
router.post('/selesai/:kode/cek', requireLogin, async (req, res) => {
  try {
    await siapkan();
    const pesanan = await ambilPesanan(req);
    if (!pesanan || !pesanan.midtrans_order_id) return res.json({ ok: false });
    const s = await snap.transaction.status(pesanan.midtrans_order_id);
    await terapkan(pesanan, s);
    res.json({ ok: true, status: s.transaction_status });
  } catch (e) { res.json({ ok: false }); }
});

/* ---------- Midtrans: webhook (tanpa login) ---------- */
router.post('/midtrans/notifikasi', async (req, res) => {
  try {
    await siapkan();
    // notification() menanyakan balik ke Midtrans, jadi notifikasi palsu tidak bisa lolos
    const s = await snap.transaction.notification(req.body);
    const pesanan = await CheckoutPesanan.findOne({
      where: { midtrans_order_id: s.order_id }, attributes: { exclude: ['bukti_data'] },
    });
    if (pesanan) await terapkan(pesanan, s);
    res.sendStatus(200);
  } catch (e) { console.error('Webhook:', e.message); res.sendStatus(500); }
});

module.exports = router;