// robots.txt dan sitemap.xml untuk mesin pencari
const express = require('express');
const { Artikel, Product } = require('../models');
const router = express.Router();

const basis = (req) => (process.env.BASE_URL || (req.protocol + '://' + req.get('host'))).replace(/\/+$/, '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

router.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(
    'User-agent: *\n' +
    'Disallow: /kelola\n' +
    'Disallow: /dashboard\n' +
    'Disallow: /profil\n' +
    'Disallow: /keranjang\n' +
    'Disallow: /pembayaran\n' +
    'Disallow: /riwayat\n' +
    `Sitemap: ${basis(req)}/sitemap.xml\n`
  );
});

router.get('/sitemap.xml', async (req, res, next) => {
  try {
    const b = basis(req);
    const url = ['/', '/katalog', '/artikel', '/tentang', '/kontak', '/syarat-ketentuan', '/kebijakan-privasi'];
    const produk = await Product.findAll({ attributes: ['id'] });
    produk.forEach((p) => url.push('/produk/' + p.id));
    const artikel = await Artikel.findAll({ where: { terbit: true }, attributes: ['slug'] });
    artikel.forEach((a) => url.push('/artikel/' + encodeURIComponent(a.slug)));
    res.type('application/xml').send(
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      url.map((u) => `  <url><loc>${esc(b + u)}</loc></url>`).join('\n') + '\n</urlset>\n'
    );
  } catch (e) { next(e); }
});

module.exports = router;
