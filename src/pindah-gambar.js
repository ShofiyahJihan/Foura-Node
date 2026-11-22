// Memindahkan foto lama (yang masih berupa file di public/uploads) ke database.
// Jalankan SEKALI di komputermu:  npm run pindah:gambar
// Aman diulang: alamat yang sudah "/media/..." dilewati, dan file lama tidak dihapus.
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { sequelize, Artikel, UserCostumer, UserAdmin, CategoryProduct, Product, MediaFile } = require('./models');
const { Gambar } = require('./models/gambar');
const { UPLOAD_ROOT } = require('./services/gambar-db');

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' };

// Kolom yang menyimpan alamat foto unggahan
const TARGET = [
  [Artikel, 'gambar'], [Artikel, 'penulisFoto'],
  [UserCostumer, 'foto'], [UserAdmin, 'foto'],
  [CategoryProduct, 'image'], [Product, 'image'], [MediaFile, 'file'],
];

// "/uploads/artikel/x.jpg" atau "product_images/x.jpg" -> lokasi file di disk (atau null kalau bukan file unggahan)
function lokasiFile(nilai) {
  if (!nilai || /^(https?:)?\/\//i.test(nilai) || nilai.startsWith('/media/') || nilai.startsWith('/images/')) return null;
  const rel = nilai.replace(/^\/?uploads\//, '').replace(/^\/+/, '');
  const penuh = path.join(UPLOAD_ROOT, rel);
  return penuh.startsWith(UPLOAD_ROOT + path.sep) ? penuh : null;
}

(async () => {
  await require('./services/sinkron-db')(sequelize);
  let pindah = 0, hilang = 0;
  for (const [Model, kolom] of TARGET) {
    for (const baris of await Model.findAll()) {
      const nilai = baris.get(kolom);
      const file = lokasiFile(nilai);
      if (!file) continue;
      const mime = MIME[path.extname(file).toLowerCase()];
      if (!mime || !fs.existsSync(file)) {
        console.log(`  LEWATI (file tidak ada): ${Model.name}#${baris.id}.${kolom} = ${nilai}`);
        hilang++;
        continue;
      }
      const g = await Gambar.create({ mime, data: fs.readFileSync(file) });
      await baris.update({ [kolom]: '/media/' + g.id });
      console.log(`  ${Model.name}#${baris.id}.${kolom}: ${nilai} -> /media/${g.id}`);
      pindah++;
    }
  }
  console.log(`Selesai. Dipindahkan: ${pindah}, dilewati karena file tidak ada: ${hilang}.`);
  await sequelize.close();
})().catch((e) => { console.error(e); process.exit(1); });
