const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const LanguageHasTopic = sequelize.define('language_has_topic', {
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'language',
        key: 'id',
      },
      primaryKey: true,  // Asegúrate de establecerlo como parte de la clave primaria
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'topic',
        key: 'id',
      },
      primaryKey: true,  // También parte de la clave primaria
    }
}, {
    tableName: 'language_has_topic',
    timestamps: false,
});

module.exports = LanguageHasTopic;