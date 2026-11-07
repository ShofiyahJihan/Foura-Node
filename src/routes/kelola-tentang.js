const router = require('express').Router();
const multer = require('multer');
const {
  ambilTentang, simpanTeks, simpanGambarTeks, tambahItem, ubahItem, hapusItem, ambilGambar,
} = require('../services/tentang');

const MAKS_MB = 2;
const DIIZINKAN = ['image/jpeg', 'image/png', 'image/webp'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAKS_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!DIIZINKAN.includes(file.mimetype)) {
      req.errUpload = 'Gambar harus berupa JPG, PNG, atau WEBP.';
      return cb(null, false);
    }
    cb(null, true);
  },
});
const unggah = (fields) => (req, res, next) => upload.fields(fields)(req, res, (err) => {
  if (err) req.errUpload = err.code === 'LIMIT_FILE_SIZE'
    ? `Ukuran gambar maksimal ${MAKS_MB} MB.`
    : 'Upload gagal. Coba lagi.';
  next();
});
const balikError = (res, pesan) => res.redirect('/kelola/tentang?err=' + encodeURIComponent(pesan));

// Menampilkan gambar dari database (publik, supaya tampil di halaman Tentang Kami)
router.get('/gambar/:kunci', async (req, res, next) => {
  try {
    const g = await ambilGambar(req.params.kunci);
    if (!g) return res.sendStatus(404);
    res.set('Cache-Control', 'public, max-age=86400');
    res.type(g.mime).send(g.data);
  } catch (e) { next(e); }
});

// semua route di bawah ini hanya admin
router.use((req, res, next) => (res.locals.role === 'admin' ? next() : res.redirect('/masuk')));

router.get('/', async (req, res, next) => {
  try {
    const T = await ambilTentang();
    res.render('kelola/tentang', {
      title: 'Kelola Tentang Kami', T, ok: req.query.ok === '1', err: String(req.query.err || ''),
    });
  } catch (e) { next(e); }
});

const fieldTeks = unggah([
  { name: 'hero_gambar_file', maxCount: 1 },
  { name: 'cerita_gambar_file', maxCount: 1 },
  { name: 'nilai_gambar_file', maxCount: 1 },
]);
router.post('/teks', fieldTeks, async (req, res, next) => {
  try {
    if (req.errUpload) return balikError(res, req.errUpload);
    await simpanTeks(req.body);
    await simpanGambarTeks(req.files, req.body);
    res.redirect('/kelola/tentang?ok=1');
  } catch (e) { next(e); }
});

const fieldFoto = unggah([{ name: 'foto_file', maxCount: 1 }]);
const ambilFoto = (req) => (req.files && req.files.foto_file && req.files.foto_file[0]) || null;

router.post('/item/tambah/:jenis', fieldFoto, async (req, res, next) => {
  try {
    if (req.errUpload) return balikError(res, req.errUpload);
    await tambahItem(req.params.jenis, req.body, ambilFoto(req));
    res.redirect('/kelola/tentang?ok=1');
  } catch (e) { next(e); }
});

router.post('/item/:id', fieldFoto, async (req, res, next) => {
  try {
    if (req.errUpload) return balikError(res, req.errUpload);
    await ubahItem(req.params.id, req.body, ambilFoto(req));
    res.redirect('/kelola/tentang?ok=1');
  } catch (e) { next(e); }
});

router.post('/item/:id/hapus', async (req, res, next) => {
  try { await hapusItem(req.params.id); res.redirect('/kelola/tentang?ok=1'); } catch (e) { next(e); }
});

module.exports = router;