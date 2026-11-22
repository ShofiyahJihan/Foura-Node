const { removeFile } = require('./files');

// Hapus produk beserta semua gambarnya
async function hapusProduk(produk) {
  const media = await produk.getGambar_tambahan();
  for (const m of media) { await removeFile(m.file); await m.destroy(); }
  await removeFile(produk.image);
  await produk.destroy();
}

module.exports = { hapusProduk };
