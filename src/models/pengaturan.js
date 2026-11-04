const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Satu baris = satu pengaturan situs (kunci + nilai)
const Pengaturan = sequelize.define('Pengaturan', {
  kunci: { type: DataTypes.STRING(100), primaryKey: true },
  nilai: { type: DataTypes.TEXT, allowNull: true },
}, { tableName: 'pengaturan' });

module.exports = { Pengaturan };