const multer = require('multer');
const { simpanGambar, hapusGambar } = require('./gambar-db');

const ALLOWED = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' };

// File ditahan di memori dulu; baru disimpan ke database setelah data form lolos validasi
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 6 },
  fileFilter: (req, file, cb) =>
    ALLOWED[file.mimetype] ? cb(null, true) : cb(new Error('Format gambar harus JPG, PNG, WEBP, atau GIF.')),
});

// Simpan satu file ke database, hasilnya alamat gambar yang disimpan di kolom, mis. "/media/12"
const relPath = (file) => simpanGambar(file);

// Hapus gambar (dari database, atau file lama di disk). Kegagalan di sini tidak boleh menggagalkan permintaan.
const removeFile = (rel) => hapusGambar(rel).catch((e) => console.error('Gagal menghapus gambar:', e.message));

// Jalankan multer dan ubah error upload jadi pesan biasa (req.uploadError)
function handleUpload(fields) {
  const mw = uploader.fields(fields);
  return (req, res, next) => mw(req, res, (err) => {
    if (err) req.uploadError = err.code === 'LIMIT_FILE_SIZE' ? 'Ukuran gambar maksimal 2 MB.' : err.message;
    next();
  });
}

module.exports = { handleUpload, relPath, removeFile };
