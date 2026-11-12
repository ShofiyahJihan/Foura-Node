const express = require('express');
const router = express.Router();
const K = require('../services/kebijakan');

const BASE = '/kelola/kebijakan';
const pesanQuery = (req) => ({
  ok: req.query.ok === '1',
  err: String(req.query.err || ''),
});

// Hanya admin
router.use((req, res, next) =>
  res.locals.role === 'admin' ? next() : res.redirect('/masuk'));

// Daftar semua halaman dan bagian
router.get('/', async (req, res, next) => {
  try {
    const semua = await K.ambilSemua();
    res.render('kelola/kebijakan', { title: 'Kelola Kebijakan', semua, HALAMAN: K.HALAMAN, ...pesanQuery(req) });
  } catch (e) { next(e); }
});

// Form tambah bagian
router.get('/bagian/baru', (req, res, next) => {
  const halaman = String(req.query.halaman || '');
  if (!K.HALAMAN[halaman]) return next();
  res.render('kelola/kebijakan-bagian', {
    title: 'Tambah Bagian', bagian: null, halaman, HALAMAN: K.HALAMAN, ...pesanQuery(req),
  });
});

router.post('/bagian/tambah', async (req, res, next) => {
  try {
    await K.tambahBagian(String(req.body.halaman || ''), req.body);
    res.redirect(BASE + '?ok=1');
  } catch (e) { next(e); }
});

// Form ubah bagian (berisi daftar butir)
router.get('/bagian/:id/edit', async (req, res, next) => {
  try {
    const bagian = await K.ambilBagian(req.params.id);
    if (!bagian) return next();
    res.render('kelola/kebijakan-bagian', {
      title: 'Ubah Bagian', bagian, halaman: bagian.halaman, HALAMAN: K.HALAMAN, ...pesanQuery(req),
    });
  } catch (e) { next(e); }
});

router.post('/bagian/:id/hapus', async (req, res, next) => {
  try {
    await K.hapusBagian(req.params.id);
    res.redirect(BASE + '?ok=1');
  } catch (e) { next(e); }
});

router.post('/bagian/:id/butir', async (req, res, next) => {
  try {
    await K.tambahButir(req.params.id, req.body);
    res.redirect(BASE + '/bagian/' + req.params.id + '/edit?ok=1');
  } catch (e) { next(e); }
});

router.get('/bagian/:id/butir/baru', async (req, res, next) => {
  try {
    const bagian = await K.ambilBagian(req.params.id);
    if (!bagian) return next();
    res.render('kelola/kebijakan-butir', {
      title: 'Tambah Butir', bagian, butir: null, ...pesanQuery(req),
    });
  } catch (e) { next(e); }
});

router.post('/bagian/:id', async (req, res, next) => {
  try {
    await K.ubahBagian(req.params.id, req.body);
    res.redirect(BASE + '/bagian/' + req.params.id + '/edit?ok=1');
  } catch (e) { next(e); }
});

router.get('/butir/:id/edit', async (req, res, next) => {
  try {
    const butir = await K.ambilButir(req.params.id);
    if (!butir) return next();
    const bagian = await K.ambilBagian(butir.bagian_id);
    res.render('kelola/kebijakan-butir', {
      title: 'Ubah Butir', bagian, butir, ...pesanQuery(req),
    });
  } catch (e) { next(e); }
});

router.post('/butir/:id/hapus', async (req, res, next) => {
  try {
    const butir = await K.ambilButir(req.params.id);
    if (!butir) return next();
    await K.hapusButir(butir.id);
    res.redirect(BASE + '/bagian/' + butir.bagian_id + '/edit?ok=1');
  } catch (e) { next(e); }
});

router.post('/butir/:id', async (req, res, next) => {
  try {
    const butir = await K.ambilButir(req.params.id);
    if (!butir) return next();
    await K.ubahButir(butir.id, req.body);
    res.redirect(BASE + '/bagian/' + butir.bagian_id + '/edit?ok=1');
  } catch (e) { next(e); }
});

module.exports = router;