const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  language: {
    type: DataTypes.STRING(45),
    allowNull: false,
    defaultValue: 'Spanish'
  }
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;