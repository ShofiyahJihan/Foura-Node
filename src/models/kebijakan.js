const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const KebijakanBagian = sequelize.define('KebijakanBagian', {
  halaman: { type: DataTypes.STRING(40), allowNull: false },
  judul:   { type: DataTypes.STRING(150), allowNull: false },
  anchor:  { type: DataTypes.STRING(60), allowNull: true },
  urutan:  { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'kebijakan_bagian' });

const KebijakanButir = sequelize.define('KebijakanButir', {
  judul:  { type: DataTypes.STRING(150), allowNull: false },
  isi:    { type: DataTypes.TEXT, allowNull: false },
  urutan: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'kebijakan_butir' });

KebijakanBagian.hasMany(KebijakanButir, { as: 'butir', foreignKey: 'bagian_id', onDelete: 'CASCADE' });
KebijakanButir.belongsTo(KebijakanBagian, { foreignKey: 'bagian_id' });

module.exports = { KebijakanBagian, KebijakanButir };