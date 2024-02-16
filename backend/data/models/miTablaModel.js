const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const MiTabla = sequelize.define('MiTabla', {
  // Model attributes are defined here
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    // allowNull defaults to true
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  // Other model options go here
  tableName: 'mi_tabla',
  timestamps: false, // Para desactivar los timestamps automáticos si no los necesitas
});

module.exports = MiTabla;
