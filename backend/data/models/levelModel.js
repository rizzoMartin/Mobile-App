const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Level = sequelize.define('level', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  solution: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  word: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  sentence: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'language_has_topic',
      key: 'language_id',
    },
    primaryKey: true,
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'language_has_topic',
      key: 'topic_id',
    },
    primaryKey: true,
  }
}, {
  tableName: 'level',
  timestamps: false,
});

module.exports = Level;
