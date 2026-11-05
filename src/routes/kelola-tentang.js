const router = require('express').Router();
const { ambilTentang, simpanTeks, tambahItem, ubahItem, hapusItem } = require('../services/tentang');

// hanya admin
router.use((req, res, next) => (res.locals.role === 'admin' ? next() : res.redirect('/masuk')));

router.get('/', async (req, res, next) => {
  try {
    const T = await ambilTentang();
    res.render('kelola/tentang', { title: 'Kelola Tentang Kami', T, ok: req.query.ok === '1' });
  } catch (e) { next(e); }
});

router.post('/teks', async (req, res, next) => {
  try { await simpanTeks(req.body); res.redirect('/kelola/tentang?ok=1'); } catch (e) { next(e); }
});

router.post('/item/tambah/:jenis', async (req, res, next) => {
  try { await tambahItem(req.params.jenis, req.body); res.redirect('/kelola/tentang?ok=1'); } catch (e) { next(e); }
});

router.post('/item/:id', async (req, res, next) => {
  try { await ubahItem(req.params.id, req.body); res.redirect('/kelola/tentang?ok=1'); } catch (e) { next(e); }
});

router.post('/item/:id/hapus', async (req, res, next) => {
  try { await hapusItem(req.params.id); res.redirect('/kelola/tentang?ok=1'); } catch (e) { next(e); }
});

module.exports = router;