const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Language = sequelize.define('language', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING(45),
    allowNull: false,
  }
}, {
  tableName: 'language',
  timestamps: false
});

module.exports = Language;