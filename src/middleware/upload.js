const multer = require('multer');


// File ditahan di memori; disimpan ke database oleh route setelah isian lolos validasi
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // maks 2 MB
  fileFilter: (req, file, cb) => {
    if (!/^image\/(jpeg|png|webp)$/.test(file.mimetype)) {
      req.uploadError = 'File harus berupa gambar JPG, PNG, atau WEBP.';
      return cb(null, false);
    }
    cb(null, true);
  },
}).fields([
  { name: 'gambarFile', maxCount: 1 },
  { name: 'penulisFotoFile', maxCount: 1 },
]);


module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    req.body = req.body || {};
    if (err) {
      req.uploadError = err.code === 'LIMIT_FILE_SIZE'
        ? 'Ukuran gambar maksimal 2 MB.'
        : 'Upload gagal: ' + err.message;
      return next();
    }
    const b = req.body;


    // Tanpa file baru: hapus atau pertahankan yang lama.
    // Kalau ada file baru, alamatnya diisi route (terapkanUpload) setelah validasi lolos.
    b.gambar = b.hapusGambar ? '' : (b.gambarLama || '');
    b.penulisFoto = b.hapusPenulisFoto ? '' : (b.penulisFotoLama || '');


    next();
  });
};
