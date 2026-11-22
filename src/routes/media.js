// Menampilkan gambar yang disimpan di database: GET /media/:id
const router = require('express').Router();
const { Gambar } = require('../models/gambar');

router.get('/:id(\\d+)', async (req, res, next) => {
  try {
    const g = await Gambar.findByPk(req.params.id);
    if (!g) return res.sendStatus(404);
    // Isi gambar tidak pernah berubah untuk id yang sama, jadi boleh disimpan lama di browser
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.type(g.mime).send(g.data);
  } catch (e) { next(e); }
});

module.exports = router;
