const multer = require('multer');
const path = require('path');
const fs = require('fs');


const FOLDER = path.join(__dirname, '..', '..', 'public', 'uploads', 'artikel');
fs.mkdirSync(FOLDER, { recursive: true });


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, FOLDER),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
  },
});


const upload = multer({
  storage,
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
    const f = req.files || {};
    const b = req.body;


    // Prioritas: file baru > hapus > pertahankan yang lama
    b.gambar = f.gambarFile
      ? '/uploads/artikel/' + f.gambarFile[0].filename
      : (b.hapusGambar ? '' : (b.gambarLama || ''));


    b.penulisFoto = f.penulisFotoFile
      ? '/uploads/artikel/' + f.penulisFotoFile[0].filename
      : (b.hapusPenulisFoto ? '' : (b.penulisFotoLama || ''));


    next();
  });
};
