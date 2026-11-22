// Simpan, tampilkan, dan hapus gambar yang disimpan di database.
// Di kolom gambar (image, foto, gambar, file) yang tersimpan hanyalah alamatnya, mis. "/media/12".
// Alamat lama ("/uploads/..." atau "product_images/...") tetap bisa dibaca dan ditampilkan.
const fs = require('fs');
const path = require('path');
const { Gambar } = require('../models/gambar');

const UPLOAD_ROOT = path.join(__dirname, '..', '..', 'public', 'uploads');
const POLA_MEDIA = /^\/media\/(\d+)$/;

// file = objek dari multer (memoryStorage): { buffer, mimetype }
async function simpanGambar(file) {
  const g = await Gambar.create({ mime: file.mimetype, data: file.buffer });
  return '/media/' + g.id;
}

// Alamat gambar untuk <img>: "/media/12" dan "/uploads/..." dipakai apa adanya,
// alamat lama tanpa awalan ("product_images/x.jpg") diberi awalan "/uploads/".
function fotoUrl(rel) {
  if (!rel) return '';
  return /^(https?:)?\//i.test(rel) ? rel : '/uploads/' + rel;
}

// Hapus gambar: baris di database, atau file lama di disk (hanya di dalam public/uploads).
async function hapusGambar(rel) {
  if (!rel) return;
  const m = POLA_MEDIA.exec(rel);
  if (m) { await Gambar.destroy({ where: { id: Number(m[1]) } }); return; }
  const relatif = String(rel).replace(/^\/?uploads\//, '').replace(/^\/+/, '');
  const penuh = path.join(UPLOAD_ROOT, relatif);
  if (penuh.startsWith(UPLOAD_ROOT + path.sep)) fs.unlink(penuh, () => {});
}

module.exports = { simpanGambar, hapusGambar, fotoUrl, UPLOAD_ROOT };
