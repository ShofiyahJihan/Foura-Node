// Gambar hasil unggahan (foto produk, kategori, artikel, profil) disimpan di database,
// supaya tidak hilang saat server hosting dibuat ulang.
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Gambar = sequelize.define('Gambar', {
  mime: { type: DataTypes.STRING(30), allowNull: false },
  data: { type: DataTypes.BLOB('long'), allowNull: false },
}, { tableName: 'gambar_db', updatedAt: false });

module.exports = { Gambar };
