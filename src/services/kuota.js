const { Op } = require('sequelize');
const { Pesanan, PesananItem } = require('./pesanan');

// Kuota per bulan. Ubah angkanya kalau suatu saat mau lebih dari 1.
const KUOTA = { basic: 1, pro: 1, premium: 1 };
const JAM_TAHAN = 24; // pesanan belum bayar menahan slot selama ini

const NAMA = { basic: 'Paket Basic', pro: 'Paket Pro', premium: 'Paket Premium' };

// "Paket Pro" / "Pro" -> "pro"
const jenisPaket = (nama) => String(nama || '').toLowerCase().replace(/^paket\s+/, '').trim();

// Jumlah slot terpakai bulan ini untuk tiap paket
async function terpakaiBulanIni() {
  const sekarang = new Date();
  const awal = new Date(sekarang.getFullYear(), sekarang.getMonth(), 1);
  const akhir = new Date(sekarang.getFullYear(), sekarang.getMonth() + 1, 1);
  const batas = new Date(sekarang.getTime() - JAM_TAHAN * 3600 * 1000);

  const semua = await Pesanan.findAll({
    where: { createdAt: { [Op.gte]: awal, [Op.lt]: akhir } },
    attributes: ['id', 'status_bayar', 'createdAt'],
  });
  const aktif = semua.filter((p) =>
    p.status_bayar === 'lunas' || p.status_bayar === 'menunggu_verifikasi' || new Date(p.createdAt) >= batas);

  const hasil = { basic: 0, pro: 0, premium: 0 };
  if (!aktif.length) return hasil;

  const items = await PesananItem.findAll({
    where: { pesananId: { [Op.in]: aktif.map((p) => p.id) }, kategori: 'Paket Bundling' },
    attributes: ['pesananId', 'nama'],
  });
  const dihitung = new Set();
  for (const i of items) {
    const j = jenisPaket(i.nama);
    const kunci = j + ':' + i.pesananId;
    if (hasil[j] === undefined || dihitung.has(kunci)) continue;
    dihitung.add(kunci);
    hasil[j] += 1;
  }
  return hasil;
}

// Status kuota semua paket (untuk ditampilkan di katalog)
async function statusKuota() {
  const pakai = await terpakaiBulanIni();
  const out = {};
  for (const j of Object.keys(KUOTA)) {
    out[j] = { kuota: KUOTA[j], terpakai: pakai[j], sisa: Math.max(0, KUOTA[j] - pakai[j]), penuh: pakai[j] >= KUOTA[j] };
  }
  return out;
}

// Dipakai saat tambah keranjang & checkout. Kembalikan pesan error, atau null kalau aman.
async function cekKuota(items) {
  const paket = items.filter((i) => i.kategori === 'Paket Bundling');
  if (!paket.length) return null;
  const status = await statusKuota();
  for (const i of paket) {
    const j = jenisPaket(i.nama);
    if (!status[j]) continue;
    if (Number(i.jumlah) > 1) return `${NAMA[j]} hanya bisa dipesan 1 kali per bulan.`;
    if (status[j].penuh) return `Kuota ${NAMA[j]} bulan ini sudah penuh. Silakan pilih paket lain atau coba lagi bulan depan.`;
  }
  return null;
}

module.exports = { KUOTA, jenisPaket, statusKuota, cekKuota };