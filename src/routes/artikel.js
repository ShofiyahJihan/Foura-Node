// Fitur Artikel: baca, cari, filter, suka, simpan, komentar (pengunjung) + kelola (admin)
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { Op, fn, col, where: sqlWhere } = require('sequelize');
const { Artikel, ArtikelReaksi, ArtikelKomentar } = require('../models');
const { requireRole } = require('../middleware/auth');
const uploadArtikel = require('../middleware/upload');


const adminOnly = requireRole('admin');
const LOGIN_URL = '/masuk'; // GANTI kalau alamat halaman login kamu berbeda


/* ---------- Fungsi bantu ---------- */
const tanggal = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
const menitBaca = (teks) => Math.max(1, Math.round(String(teks).split(/\s+/).filter(Boolean).length / 200));
const gambarValid = (g) => !g || /^(https?:\/\/|\/)/i.test(g);
const idUser = (res) => (res.locals.user && res.locals.user.id) || null;


// Hapus file upload dari disk (hanya yang ada di /uploads/artikel/)
const FOLDER_UPLOAD = path.join(__dirname, '..', '..', 'public', 'uploads', 'artikel');
function hapusBerkas(url) {
  if (!url || !String(url).startsWith('/uploads/artikel/')) return;
  const p = path.join(__dirname, '..', '..', 'public', url);
  if (!p.startsWith(FOLDER_UPLOAD + path.sep)) return;
  fs.unlink(p, () => {});
}


// Kalau validasi gagal, buang file yang barusan terupload
function buangUploadBaru(req) {
  const f = req.files || {};
  Object.values(f).flat().forEach((x) => fs.unlink(x.path, () => {}));
}


// Cari per kata: tiap kata harus ada di judul, ringkasan, atau isi. Huruf besar/kecil tidak berpengaruh.
function kondisiCari(q) {
  const kata = q.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 6);
  return kata.map((k) => {
    const pola = `%${k.replace(/[\\%_]/g, '\\$&')}%`;
    return {
      [Op.or]: ['judul', 'ringkasan', 'isi'].map((f) => sqlWhere(fn('LOWER', col(f)), { [Op.like]: pola })),
    };
  });
}


function buatSlug(judul) {
  return String(judul).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'artikel';
}


async function slugUnik(judul, idSendiri = null) {
  const dasar = buatSlug(judul);
  let slug = dasar;
  for (let i = 2; ; i++) {
    const ada = await Artikel.findOne({ where: { slug } });
    if (!ada || ada.id === idSendiri) return slug;
    slug = `${dasar}-${i}`;
  }
}


// Aturan menulis: tiap baris (Enter) menjadi satu paragraf sendiri,
// "## " untuk subjudul, "- " untuk daftar poin.
function bagian(isi) {
  const hasil = [];
  const baris = String(isi).split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  let i = 0;
  while (i < baris.length) {
    if (baris[i].startsWith('## ')) {
      hasil.push({ tipe: 'h2', teks: baris[i].slice(3).trim() });
      i++;
    } else if (baris[i].startsWith('- ')) {
      const item = [];
      while (i < baris.length && baris[i].startsWith('- ')) { item.push(baris[i].slice(2).trim()); i++; }
      hasil.push({ tipe: 'ul', item });
    } else {
      hasil.push({ tipe: 'p', teks: baris[i] });
      i++;
    }
  }
  return hasil;
}


const kartu = (a) => ({
  id: a.id, judul: a.judul, slug: a.slug, kategori: a.kategori, gambar: a.gambar,
  ringkasan: a.ringkasan || String(a.isi).replace(/\s+/g, ' ').slice(0, 140) + '…',
  tanggal: tanggal(a.createdAt), menit: menitBaca(a.isi),
  penulis: a.penulis, penulisFoto: a.penulisFoto,
});


// Tambahkan jumlah suka, simpan, komentar, dan status milik user yang sedang login
async function lengkapi(daftar, uid) {
  if (!daftar.length) return [];
  const ids = daftar.map((a) => a.id);
  const [reaksi, komen] = await Promise.all([
    ArtikelReaksi.findAll({ where: { artikelId: ids } }),
    ArtikelKomentar.findAll({ where: { artikelId: ids }, attributes: ['artikelId'] }),
  ]);
  return daftar.map((a) => {
    const r = reaksi.filter((x) => x.artikelId === a.id);
    const hitung = (j) => r.filter((x) => x.jenis === j).length;
    const milik = (j) => !!uid && r.some((x) => x.jenis === j && x.userId === uid);
    return {
      ...kartu(a),
      suka: hitung('suka'), simpan: hitung('simpan'),
      komentar: komen.filter((x) => x.artikelId === a.id).length,
      sukaAktif: milik('suka'), simpanAktif: milik('simpan'),
    };
  });
}


/* ---------- Form admin: nilai awal, validasi, dan pengambilan data ---------- */
const formKosong = { judul: '', kategori: '', ringkasan: '', gambar: '', penulis: '', penulisFoto: '', isi: '', terbit: true };


function validasi(req) {
  const b = req.body || {};
  if (req.uploadError) return req.uploadError;
  const judul = (b.judul || '').trim();
  const isi = (b.isi || '').trim();
  if (!judul) return 'Judul wajib diisi.';
  if (judul.length > 200) return 'Judul maksimal 200 karakter.';
  if (!isi) return 'Isi artikel wajib diisi.';
  if ((b.ringkasan || '').length > 300) return 'Ringkasan maksimal 300 karakter.';
  if (!gambarValid((b.gambar || '').trim())) return 'Alamat gambar harus diawali http://, https://, atau /.';
  if (!gambarValid((b.penulisFoto || '').trim())) return 'Alamat foto penulis harus diawali http://, https://, atau /.';
  return null;
}


// Menerima objek body (b), BUKAN req. Panggil: dariForm(req.body) dari dalam handler route.
const dariForm = (b) => ({
  judul: (b.judul || '').trim(),
  kategori: (b.kategori || '').trim().slice(0, 60) || null,
  ringkasan: (b.ringkasan || '').trim() || null,
  gambar: (b.gambar || '').trim() || null,
  penulis: (b.penulis || '').trim().slice(0, 100) || null,
  penulisFoto: (b.penulisFoto || '').trim() || null,
  isi: (b.isi || '').trim(),
  terbit: b.terbit === 'on',
});


/* ================= Pengunjung ================= */
router.get('/artikel', async (req, res, next) => {
  try {
    const uid = idUser(res);
    const q = String(req.query.q || '').trim().slice(0, 80);
    const kat = String(req.query.kategori || '').trim().slice(0, 60);
    const simpanan = req.query.simpanan === '1' && !!uid;


    const where = { terbit: true };
    if (kat) where.kategori = kat;
    if (q) where[Op.and] = kondisiCari(q);
    if (simpanan) {
      const s = await ArtikelReaksi.findAll({ where: { userId: uid, jenis: 'simpan' } });
      where.id = s.map((x) => x.artikelId);
    }


    const semua = await Artikel.findAll({ where, order: [['createdAt', 'DESC']] });
    const baris = await Artikel.findAll({ where: { terbit: true }, attributes: ['kategori'], group: ['kategori'] });
    const daftarKategori = baris.map((r) => r.kategori).filter(Boolean).sort();


    res.render('artikel/index', {
      title: 'Artikel', artikel: await lengkapi(semua, uid), q, kat, daftarKategori, simpanan, login: !!uid,
    });
  } catch (e) { next(e); }
});


router.get('/artikel/:slug', async (req, res, next) => {
  try {
    const uid = idUser(res);
    const a = await Artikel.findOne({ where: { slug: req.params.slug } });
    if (!a || (!a.terbit && res.locals.role !== 'admin')) {
      return res.status(404).render('error', { title: 'Tidak ditemukan', pesan: 'Artikel yang kamu cari tidak ada.' });
    }
    const [lengkap] = await lengkapi([a], uid);
    const komentar = await ArtikelKomentar.findAll({ where: { artikelId: a.id }, order: [['createdAt', 'DESC']] });
    const lain = await Artikel.findAll({ where: { terbit: true, id: { [Op.ne]: a.id } }, order: [['createdAt', 'DESC']], limit: 3 });

    // Info pratinjau saat link dibagikan (Open Graph)
    const base = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const mutlak = (u) => (!u ? null : /^https?:\/\//i.test(u) ? u : base + u);

    res.render('artikel/detail', {
      title: a.judul,
      og: {
        tipe: 'article',
        judul: a.judul,
        deskripsi: lengkap.ringkasan,
        gambar: mutlak(a.gambar),
        url: base + '/artikel/' + a.slug,
      },
      a: { ...lengkap, isi: bagian(a.isi), terbit: a.terbit },
      komentar: komentar.map((k) => ({
        id: k.id, nama: k.nama, isi: k.isi, waktu: tanggal(k.createdAt),
        milikku: !!uid && (k.userId === uid || res.locals.role === 'admin'),
      })),
      lain: lain.map(kartu), login: !!uid,
    });
  } catch (e) { next(e); }
});


/* ---------- Suka & Simpan (dipanggil lewat JavaScript, balasan JSON) ---------- */
router.post('/artikel/:slug/reaksi/:jenis', async (req, res, next) => {
  try {
    const uid = idUser(res);
    if (!uid) return res.status(401).json({ login: LOGIN_URL });
    const jenis = req.params.jenis;
    if (!['suka', 'simpan'].includes(jenis)) return res.status(400).json({});
    const a = await Artikel.findOne({ where: { slug: req.params.slug } });
    if (!a) return res.status(404).json({});


    const ada = await ArtikelReaksi.findOne({ where: { artikelId: a.id, userId: uid, jenis } });
    if (ada) await ada.destroy(); else await ArtikelReaksi.create({ artikelId: a.id, userId: uid, jenis });
    const jumlah = await ArtikelReaksi.count({ where: { artikelId: a.id, jenis } });
    res.json({ aktif: !ada, jumlah });
  } catch (e) { next(e); }
});


/* ---------- Komentar ---------- */
router.post('/artikel/:slug/komentar', async (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user) return res.redirect(LOGIN_URL);
    const a = await Artikel.findOne({ where: { slug: req.params.slug } });
    if (!a) return next();
    const isi = String(req.body.isi || '').trim().slice(0, 1000);
    if (isi) {
      await ArtikelKomentar.create({ artikelId: a.id, userId: user.id, nama: user.first_name || user.username || 'Pengguna', isi });
      req.flash('ok', 'Komentar terkirim.');
    }
    res.redirect(`/artikel/${a.slug}#komentar`);
  } catch (e) { next(e); }
});


router.post('/artikel/:slug/komentar/:id/hapus', async (req, res, next) => {
  try {
    const uid = idUser(res);
    const k = await ArtikelKomentar.findByPk(req.params.id);
    if (k && uid && (k.userId === uid || res.locals.role === 'admin')) {
      await k.destroy();
      req.flash('ok', 'Komentar dihapus.');
    }
    res.redirect(`/artikel/${req.params.slug}#komentar`);
  } catch (e) { next(e); }
});


/* ================= Admin ================= */
router.get('/kelola/artikel', adminOnly, async (req, res, next) => {
  try {
    const daftar = await Artikel.findAll({ order: [['createdAt', 'DESC']] });
    res.render('kelola/artikel-list', { title: 'Kelola Artikel', daftar, tanggal });
  } catch (e) { next(e); }
});


router.get('/kelola/artikel/baru', adminOnly, (req, res) => {
  res.render('kelola/artikel-form', { title: 'Tulis Artikel', artikel: null, form: formKosong, error: null });
});


router.post('/kelola/artikel', adminOnly, uploadArtikel, async (req, res, next) => {
  try {
    const error = validasi(req);
    if (error) {
      buangUploadBaru(req);
      return res.status(400).render('kelola/artikel-form', {
        title: 'Tulis Artikel', artikel: null, form: { ...req.body, terbit: req.body.terbit === 'on' }, error,
      });
    }
    const data = dariForm(req.body);
    await Artikel.create({
      ...data,
      slug: await slugUnik(data.judul),
      penulis: data.penulis || res.locals.user.first_name || res.locals.user.username,
    });
    req.flash('ok', 'Artikel berhasil disimpan.');
    res.redirect('/kelola/artikel');
  } catch (e) { next(e); }
});


router.get('/kelola/artikel/:id/edit', adminOnly, async (req, res, next) => {
  try {
    const a = await Artikel.findByPk(req.params.id);
    if (!a) return next();
    res.render('kelola/artikel-form', { title: 'Ubah Artikel', artikel: a, form: a.get({ plain: true }), error: null });
  } catch (e) { next(e); }
});


router.post('/kelola/artikel/:id', adminOnly, uploadArtikel, async (req, res, next) => {
  try {
    const a = await Artikel.findByPk(req.params.id);
    if (!a) return next();
    const error = validasi(req);
    if (error) {
      buangUploadBaru(req);
      return res.status(400).render('kelola/artikel-form', {
        title: 'Ubah Artikel', artikel: a, form: { ...req.body, terbit: req.body.terbit === 'on' }, error,
      });
    }
    const lamaGambar = a.gambar;
    const lamaFoto = a.penulisFoto;
    const data = dariForm(req.body);
    await a.update(data);
    // Hapus file lama dari disk kalau sudah diganti atau dihapus
    if (lamaGambar && lamaGambar !== data.gambar) hapusBerkas(lamaGambar);
    if (lamaFoto && lamaFoto !== data.penulisFoto) hapusBerkas(lamaFoto);
    req.flash('ok', 'Artikel berhasil diperbarui.');
    res.redirect('/kelola/artikel');
  } catch (e) { next(e); }
});


router.post('/kelola/artikel/:id/hapus', adminOnly, async (req, res, next) => {
  try {
    const a = await Artikel.findByPk(req.params.id);
    await ArtikelReaksi.destroy({ where: { artikelId: req.params.id } });
    await ArtikelKomentar.destroy({ where: { artikelId: req.params.id } });
    await Artikel.destroy({ where: { id: req.params.id } });
    if (a) { hapusBerkas(a.gambar); hapusBerkas(a.penulisFoto); }
    req.flash('ok', 'Artikel dihapus.');
    res.redirect('/kelola/artikel');
  } catch (e) { next(e); }
});


module.exports = router;