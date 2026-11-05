// Menyamakan database dengan model di kode, setiap server atau seed dijalankan:
//   1. Tabel baru yang belum ada  -> dibuat otomatis
//   2. Kolom baru di model        -> ditambahkan otomatis ke tabel yang sudah ada
// Tidak pernah menghapus atau mengubah tabel, kolom, maupun data yang sudah ada.


async function sinkronDb(sequelize) {
  await sequelize.sync();


  const qi = sequelize.getQueryInterface();


  for (const model of Object.values(sequelize.models)) {
    const tabel = model.getTableName();


    let kolomAda;
    try {
      kolomAda = await qi.describeTable(tabel);
    } catch (e) {
      continue;
    }


    for (const [nama, atribut] of Object.entries(model.rawAttributes)) {
      const kolom = atribut.field || nama;
      if (kolomAda[kolom]) continue;


      // Kolom baru boleh kosong (NULL) supaya baris lama tetap aman
      await qi.addColumn(tabel, kolom, {
        type: atribut.type,
        allowNull: true,
        defaultValue: atribut.defaultValue,
      });
      console.log(`[DB] kolom baru ditambahkan: ${tabel}.${kolom}`);
    }
  }
}


module.exports = sinkronDb;

