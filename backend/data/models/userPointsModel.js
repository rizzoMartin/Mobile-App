const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserPoints = sequelize.define('user_points', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        primaryKey: true,  // Asegúrate de establecerlo como parte de la clave primaria
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'language_has_topic',
        key: 'language_id',
      },
      primaryKey: true,  // Asegúrate de establecerlo como parte de la clave primaria
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'language_has_topic',
        key: 'topic_id',
      },
      primaryKey: true,  // También parte de la clave primaria
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    tableName: 'user_points',
    timestamps: false,
});

module.exports = UserPoints;