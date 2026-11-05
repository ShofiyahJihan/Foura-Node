// Model artikel + reaksi (suka / simpan) + komentar
const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Artikel = sequelize.define('Artikel', {
  judul:       { type: DataTypes.STRING(200), allowNull: false },
  slug:        { type: DataTypes.STRING(220), allowNull: false, unique: true },
  ringkasan:   { type: DataTypes.STRING(400), allowNull: true },
  isi:         { type: DataTypes.TEXT('long'), allowNull: false },
  kategori:    { type: DataTypes.STRING(80), allowNull: true },
  gambar:      { type: DataTypes.STRING(500), allowNull: true },
  penulis:     { type: DataTypes.STRING(100), allowNull: true, defaultValue: 'Tim Foura Creative' },
  penulisFoto: { type: DataTypes.STRING(500), allowNull: true },
  terbit:      { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'artikel' });


const ArtikelReaksi = sequelize.define('ArtikelReaksi', {
  artikelId: { type: DataTypes.INTEGER, allowNull: false, field: 'artikel_id' },
  userId:    { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
  jenis:     { type: DataTypes.ENUM('suka', 'simpan'), allowNull: false },
}, {
  tableName: 'artikel_reaksi',
  indexes: [{ unique: true, fields: ['artikel_id', 'user_id', 'jenis'] }],
});


const ArtikelKomentar = sequelize.define('ArtikelKomentar', {
  artikelId: { type: DataTypes.INTEGER, allowNull: false, field: 'artikel_id' },
  userId:    { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
  nama:      { type: DataTypes.STRING(100), allowNull: false },
  isi:       { type: DataTypes.TEXT, allowNull: false },
}, { tableName: 'artikel_komentar' });


module.exports = { Artikel, ArtikelReaksi, ArtikelKomentar };

