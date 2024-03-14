const sequelize = require('./db');
require('./models/userModel');
require('./models/languageModel');

const initDatabase = () => {
  return sequelize.sync().then(() => {
    console.log('Tablas sincronizadas');
  }).catch(error => {
    console.error('Error al sincronizar las tablas:', error);
  });
};

module.exports = initDatabase;