const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// jenis: 'keunggulan' | 'tim' | 'nilai'
const TentangItem = sequelize.define('TentangItem', {
  jenis:  { type: DataTypes.STRING(20), allowNull: false },
  judul:  { type: DataTypes.STRING(150), allowNull: false },
  teks:   { type: DataTypes.TEXT, allowNull: true },
  ikon:   { type: DataTypes.STRING(20), allowNull: true },
  foto:   { type: DataTypes.STRING(255), allowNull: true },
  urutan: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'tentang_item' });

// teks & gambar lepas (judul hero, paragraf, CTA, dll.)
const TentangTeks = sequelize.define('TentangTeks', {
  kunci: { type: DataTypes.STRING(60), allowNull: false, unique: true },
  nilai: { type: DataTypes.TEXT, allowNull: true },
}, { tableName: 'tentang_teks' });

// file gambar hasil unggahan (disimpan di database)
const TentangGambar = sequelize.define('TentangGambar', {
  kunci: { type: DataTypes.STRING(60), allowNull: false, unique: true },
  mime:  { type: DataTypes.STRING(30), allowNull: false },
  data:  { type: DataTypes.BLOB('long'), allowNull: false },
}, { tableName: 'tentang_gambar' });

module.exports = { TentangItem, TentangTeks, TentangGambar };