const { Sequelize } = require('sequelize');

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize('prueba', 'user', 'user', {
  host: 'database', // Nombre del servicio en docker-compose
  dialect: 'mysql',
  logging: false, // Puedes activar el logging si quieres ver las consultas SQL en la consola
});

module.exports = sequelize;