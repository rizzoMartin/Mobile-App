const sequelize = require('./db');
const setupAssociations = require('./models/associateModels');
require('./models/userModel');
require('./models/languageModel');
require('./models/topicModel');
require('./models/levelModel');
require('./models/languageHasTopicModel');
require('./models/userPointsModel');

const initDatabase = () => {
  setupAssociations();
  return sequelize.sync().then(() => {
    console.log('Tablas sincronizadas');
  }).catch(error => {
    console.error('Error al sincronizar las tablas:', error);
  });
};

module.exports = initDatabase;