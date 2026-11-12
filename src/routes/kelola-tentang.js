const express = require('express');
const multer = require('multer');

const router = express.Router();

const {
  ambilTentang,
  simpanTeks,
  simpanGambarTeks,
  tambahItem,
  ubahItem,
  hapusItem,
  ambilGambar,
  JUDUL_BAGIAN,
  ambilItem,
  resetTeks,
  hapusBagian,
} = require('../services/tentang');

// Pengaturan upload gambar
const MAKS_MB = 2;
const DIIZINKAN = ['image/jpeg', 'image/png', 'image/webp'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAKS_MB * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!DIIZINKAN.includes(file.mimetype)) {
      req.errUpload = 'Gambar harus berupa JPG, PNG, atau WEBP.';
      return cb(null, false);
    }
    cb(null, true);
  },
});

// Middleware upload
const unggah = (fields) => (req, res, next) => {
  upload.fields(fields)(req, res, (err) => {
    if (err) {
      req.errUpload = err.code === 'LIMIT_FILE_SIZE'
        ? `Ukuran gambar maksimal ${MAKS_MB} MB.`
        : 'Upload gagal. Coba lagi.';
    }
    next();
  });
};

// Fungsi bantuan
const balikError = (res, pesan, ke = '/kelola/tentang') =>
  res.redirect(ke + '?err=' + encodeURIComponent(pesan));

const jenisValid = (j) =>
  Object.prototype.hasOwnProperty.call(JUDUL_BAGIAN, j);

const pesanQuery = (req) => ({
  ok: req.query.ok === '1',
  err: String(req.query.err || ''),
});

// Menampilkan gambar dari database
router.get('/gambar/:kunci', async (req, res, next) => {
  try {
    const g = await ambilGambar(req.params.kunci);

    if (!g) return res.sendStatus(404);

    res.set('Cache-Control', 'public, max-age=86400');
    res.type(g.mime).send(g.data);
  } catch (e) {
    next(e);
  }
});

// Semua route di bawah ini hanya untuk admin
router.use((req, res, next) => {
  return res.locals.role === 'admin'
    ? next()
    : res.redirect('/masuk');
});

// Daftar bagian
router.get('/', async (req, res, next) => {
  try {
    const T = await ambilTentang();

    res.render('kelola/tentang', {
      title: 'Kelola Tentang Kami',
      T,
      ...pesanQuery(req),
    });
  } catch (e) {
    next(e);
  }
});

// Edit teks dan gambar halaman
router.get('/teks/edit', async (req, res, next) => {
  try {
    const T = await ambilTentang();

    res.render('kelola/tentang-teks', {
      title: 'Ubah Teks & Gambar',
      T,
      ...pesanQuery(req),
    });
  } catch (e) {
    next(e);
  }
});

// Field upload teks
const fieldTeks = unggah([
  { name: 'hero_gambar_file', maxCount: 1 },
  { name: 'cerita_gambar_file', maxCount: 1 },
  { name: 'nilai_gambar_file', maxCount: 1 },
]);

router.post('/teks', fieldTeks, async (req, res, next) => {
  try {
    if (req.errUpload) {
      return balikError(
        res,
        req.errUpload,
        '/kelola/tentang/teks/edit'
      );
    }

    await simpanTeks(req.body);
    await simpanGambarTeks(req.files, req.body);

    res.redirect('/kelola/tentang?ok=1');
  } catch (e) {
    next(e);
  }
});

// Reset teks
router.post('/teks/reset', async (req, res, next) => {
  try {
    await resetTeks();
    res.redirect('/kelola/tentang?ok=1');
  } catch (e) {
    next(e);
  }
});

// Daftar item per bagian
router.get('/bagian/:jenis', async (req, res, next) => {
  try {
    const { jenis } = req.params;

    if (!jenisValid(jenis)) return next();

    const T = await ambilTentang();

    res.render('kelola/tentang-bagian', {
      title: 'Ubah ' + JUDUL_BAGIAN[jenis],
      T,
      jenis,
      nama: JUDUL_BAGIAN[jenis],
      daftar: T[jenis],
      ...pesanQuery(req),
    });
  } catch (e) {
    next(e);
  }
});

// Hapus bagian
router.post('/bagian/:jenis/hapus', async (req, res, next) => {
  try {
    if (!jenisValid(req.params.jenis)) return next();

    await hapusBagian(req.params.jenis);

    res.redirect('/kelola/tentang?ok=1');
  } catch (e) {
    next(e);
  }
});

// Form tambah item
router.get('/bagian/:jenis/baru', async (req, res, next) => {
  try {
    const { jenis } = req.params;

    if (!jenisValid(jenis)) return next();

    const T = await ambilTentang();

    res.render('kelola/tentang-item', {
      title: 'Tambah ' + JUDUL_BAGIAN[jenis],
      T,
      jenis,
      nama: JUDUL_BAGIAN[jenis],
      item: null,
      it: null,
      urutanBaru: T[jenis].length + 1,
      ...pesanQuery(req),
    });
  } catch (e) {
    next(e);
  }
});

// Form edit item
router.get('/item/:id/edit', async (req, res, next) => {
  try {
    const item = await ambilItem(req.params.id);

    if (!item) return next();

    const T = await ambilTentang();

    res.render('kelola/tentang-item', {
      title: 'Ubah ' + JUDUL_BAGIAN[item.jenis],
      T,
      jenis: item.jenis,
      nama: JUDUL_BAGIAN[item.jenis],
      item,
      it: item,
      urutanBaru: item.urutan,
      ...pesanQuery(req),
    });
  } catch (e) {
    next(e);
  }
});

// Upload foto item
const fieldFoto = unggah([
  { name: 'foto_file', maxCount: 1 },
]);

const ambilFoto = (req) =>
  (req.files && req.files.foto_file && req.files.foto_file[0]) || null;

// Tambah item
router.post('/item/tambah/:jenis', fieldFoto, async (req, res, next) => {
  try {
    const { jenis } = req.params;

    if (!jenisValid(jenis)) return next();

    const balik = '/kelola/tentang/bagian/' + jenis;

    if (req.errUpload) {
      return balikError(res, req.errUpload, balik + '/baru');
    }

    await tambahItem(jenis, req.body, ambilFoto(req));

    res.redirect(balik + '?ok=1');
  } catch (e) {
    next(e);
  }
});

// Ubah item
router.post('/item/:id', fieldFoto, async (req, res, next) => {
  try {
    const item = await ambilItem(req.params.id);

    if (!item) return next();

    const balik = '/kelola/tentang/bagian/' + item.jenis;

    if (req.errUpload) {
      return balikError(
        res,
        req.errUpload,
        '/kelola/tentang/item/' + item.id + '/edit'
      );
    }

    await ubahItem(item.id, req.body, ambilFoto(req));

    res.redirect(balik + '?ok=1');
  } catch (e) {
    next(e);
  }
});

// Hapus item
router.post('/item/:id/hapus', async (req, res, next) => {
  try {
    const item = await ambilItem(req.params.id);

    if (!item) return next();

    await hapusItem(item.id);

    res.redirect(
      '/kelola/tentang/bagian/' + item.jenis + '?ok=1'
    );
  } catch (e) {
    next(e);
  }
});

module.exports = router;