const { TentangItem, TentangTeks, TentangGambar } = require('../models/tentang');

const DEFAULT_TEKS = {
  hero_judul:    'Kami adalah partner kreatif untuk UMKM fashion di Makassar.',
  hero_teks:     'Foura Creative hadir untuk membantu brand fashion lokal tumbuh melalui strategi media sosial yang tepat, konten yang berkualitas, dan pendekatan yang kreatif serta berkelanjutan.',
  hero_gambar:   '/images/tentang/hero.jpg',
  cerita_judul:  'Berawal dari kecintaan pada fashion dan dunia digital.',
  cerita_1:      'Foura Creative didirikan di Makassar oleh sekelompok anak muda yang percaya bahwa setiap brand, sekecil apa pun, layak tampil menarik dan profesional di media sosial.',
  cerita_2:      'Kami melihat banyak UMKM fashion di Makassar yang punya produk luar biasa, tapi masih kesulitan mengelola media sosial dan membangun citra brand yang kuat. Dari situlah Foura Creative lahir.',
  cerita_tombol: 'Lihat Layanan →',
  cerita_gambar: '/images/tentang/cerita.jpg',
  tim_judul:     'Di balik setiap konten hebat, ada tim yang luar biasa.',
  tim_teks:      'Foura Creative terdiri dari individu-individu berbakat yang berkolaborasi untuk membuat konten terbaik bagi brand kamu.',
  nilai_judul:   'Nilai yang selalu kami pegang.',
  nilai_gambar:  '/images/tentang/nilai.jpg',
  cta_eyebrow:   'SIAP MEMBANGUN BRAND KAMU?',
  cta_judul:     'Yuk, mulai perjalanan kreatif bersama Foura Creative.',
  cta_tombol:    'Hubungi Kami →',
};

const DEFAULT = {
  keunggulan: [
    { ikon: 'bulb',  judul: 'Kreatif & Strategis', teks: 'Setiap konten dirancang dengan strategi yang matang, bukan sekadar tampil.' },
    { ikon: 'users', judul: 'Tim Profesional',     teks: 'Dikerjakan oleh tim yang paham media sosial dan dunia fashion.' },
    { ikon: 'chart', judul: 'Fokus pada Hasil',    teks: 'Kami tidak hanya membuat konten, tapi juga memantau performa dan terus memperbaiki.' },
    { ikon: 'heart', judul: 'Tumbuh Bersama',      teks: 'Kami ingin brand kamu tumbuh panjang dan berkelanjutan bersama kami.' },
  ],
  tim: [
    { judul: 'Mutiah Anwar',               teks: 'Strategist',      foto: '/images/tim/mutiah.jpg' },
    { judul: 'Nadyah Fakhiriyah Izzah FS', teks: 'Analyst',         foto: '/images/tim/nadyah.jpg' },
    { judul: 'Shofiyah Jihan Aulia Anwar', teks: 'CEO',             foto: '/images/tim/shofiyah.jpg' },
    { judul: 'Siti Nadhifa Fadhilah',      teks: 'Content Creator', foto: '/images/tim/nadhifa.jpg' },
  ],
  nilai: [
    { judul: 'Kreativitas Tanpa Batas',   teks: 'Kami selalu mencari ide segar yang relevan dengan brand kamu.' },
    { judul: 'Integritas',                teks: 'Kerja jujur, transparan, dan bisa dipercaya.' },
    { judul: 'Kolaborasi',                teks: 'Kami bekerja bersama klien, bukan hanya untuk klien.' },
    { judul: 'Pertumbuhan Berkelanjutan', teks: 'Fokus pada hasil jangka panjang, bukan tren sesaat.' },
  ],
};

// Kunci teks yang berisi gambar (bisa diunggah dari admin)
const KUNCI_GAMBAR = ['hero_gambar', 'cerita_gambar', 'nilai_gambar'];

let siap = null;
function siapkan() {
  if (!siap) {
    siap = (async () => {
      await TentangItem.sync();
      await TentangTeks.sync();
      await TentangGambar.sync();
      if (await TentangItem.count() === 0) {
        for (const [jenis, daftar] of Object.entries(DEFAULT)) {
          for (let i = 0; i < daftar.length; i++) {
            await TentangItem.create({ jenis, urutan: i + 1, ...daftar[i] });
          }
        }
      }
      // isi kunci teks yang belum ada (tidak menimpa hasil edit)
      for (const [kunci, nilai] of Object.entries(DEFAULT_TEKS)) {
        await TentangTeks.findOrCreate({ where: { kunci }, defaults: { nilai } });
      }
    })().catch(e => { siap = null; throw e; });
  }
  return siap;
}

/* ---------- gambar di database ---------- */
// Alamat gambar; ?v= supaya browser memuat ulang saat gambar diganti
const urlGambar = kunci => `/kelola/tentang/gambar/${encodeURIComponent(kunci)}?v=${Date.now()}`;

async function simpanGambar(kunci, file) {
  const ada = await TentangGambar.findOne({ where: { kunci } });
  if (ada) await ada.update({ mime: file.mimetype, data: file.buffer });
  else await TentangGambar.create({ kunci, mime: file.mimetype, data: file.buffer });
}
async function ambilGambar(kunci) {
  await siapkan();
  return TentangGambar.findOne({ where: { kunci } });
}

// { keunggulan: [...], tim: [...], nilai: [...], teks: { hero_judul: '...', ... } }
async function ambilTentang() {
  await siapkan();
  const semua = await TentangItem.findAll({ order: [['urutan', 'ASC'], ['id', 'ASC']], raw: true });
  const hasil = { keunggulan: [], tim: [], nilai: [], teks: { ...DEFAULT_TEKS } };
  semua.forEach(r => { if (hasil[r.jenis]) hasil[r.jenis].push(r); });
  const teks = await TentangTeks.findAll({ raw: true });
  teks.forEach(r => { hasil.teks[r.kunci] = r.nilai || ''; });
  return hasil;
}

async function simpanTeks(body) {
  await siapkan();
  for (const kunci of Object.keys(DEFAULT_TEKS)) {
    if (KUNCI_GAMBAR.includes(kunci)) continue; // gambar diurus terpisah
    if (typeof body[kunci] === 'string') {
      await TentangTeks.update({ nilai: body[kunci].trim() }, { where: { kunci } });
    }
  }
}

// Gambar hero / cerita / nilai: file baru disimpan, atau dikembalikan ke bawaan kalau dihapus
async function simpanGambarTeks(files, body) {
  await siapkan();
  for (const k of KUNCI_GAMBAR) {
    const file = files && files[k + '_file'] && files[k + '_file'][0];
    if (file) {
      await simpanGambar('teks-' + k, file);
      await TentangTeks.update({ nilai: urlGambar('teks-' + k) }, { where: { kunci: k } });
    } else if (body['hapus_' + k]) {
      await TentangGambar.destroy({ where: { kunci: 'teks-' + k } });
      await TentangTeks.update({ nilai: DEFAULT_TEKS[k] }, { where: { kunci: k } });
    }
  }
}

const JENIS = ['keunggulan', 'tim', 'nilai'];
const ambilField = b => ({
  judul:  String(b.judul || '').trim().slice(0, 150),
  teks:   String(b.teks || '').trim(),
  ikon:   String(b.ikon || '').trim().slice(0, 20) || null,
  foto:   String(b.foto || '').trim().slice(0, 255) || null,
  urutan: parseInt(b.urutan, 10) || 0,
});

async function tambahItem(jenis, b, file = null) {
  await siapkan();
  if (!JENIS.includes(jenis)) return;
  const f = ambilField(b);
  if (!f.judul) return;
  const item = await TentangItem.create({ jenis, ...f });
  if (file) {
    const kunci = 'item-' + item.id;
    await simpanGambar(kunci, file);
    await item.update({ foto: urlGambar(kunci) });
  }
}

async function ubahItem(id, b, file = null) {
  await siapkan();
  const f = ambilField(b);
  if (!f.judul) return;
  const item = await TentangItem.findByPk(id);
  if (!item) return;
  const kunci = 'item-' + id;
  if (file) {
    await simpanGambar(kunci, file);
    f.foto = urlGambar(kunci);
  } else if (b.hapus_foto) {
    await TentangGambar.destroy({ where: { kunci } });
    f.foto = null;
  }
  await item.update(f);
}

async function hapusItem(id) {
  await siapkan();
  await TentangGambar.destroy({ where: { kunci: 'item-' + id } });
  await TentangItem.destroy({ where: { id } });
}

module.exports = {
  DEFAULT, DEFAULT_TEKS, siapkan, ambilTentang, simpanTeks, simpanGambarTeks,
  tambahItem, ubahItem, hapusItem, ambilGambar,
};