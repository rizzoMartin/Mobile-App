const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Topic = sequelize.define('topic', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  topic: {
    type: DataTypes.STRING(45),
    allowNull: false,
  }
}, {
  tableName: 'topic',
  timestamps: false
});

module.exports = Topic;