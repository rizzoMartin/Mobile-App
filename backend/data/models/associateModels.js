const Topic = require('./topicModel');
const Language = require('./languageModel');
const Level = require('./levelModel');
const LanguageHasTopic = require('./languageHasTopicModel');
const UserPoints = require('./userPointsModel');
const User = require('./userModel');

const setupAssociations = () => {
  // Asociación muchos a muchos entre Topic y Language con tabla intermedia
  Language.belongsToMany(Topic, {
    through: LanguageHasTopic, 
    foreignKey: 'language_id',  // Clave externa hacia Language
    otherKey: 'topic_id'  // Clave externa hacia Topic
  });

  Topic.belongsToMany(Language, {
    through: LanguageHasTopic, 
    foreignKey: 'topic_id',  // Clave externa hacia Topic
    otherKey: 'language_id'  // Clave externa hacia Language
  });

  // Relación uno a muchos entre LanguageHasTopic y Level
  LanguageHasTopic.hasMany(Level, {
    foreignKey: 'language_id',  // Apunta a la clave en 'LanguageHasTopic'
  });
  
  LanguageHasTopic.hasMany(Level, {
    foreignKey: 'topic_id',  // También apunta a la clave correcta
  });
  
  Level.belongsTo(LanguageHasTopic, {
    foreignKey: 'language_id',  // Debe coincidir con 'LanguageHasTopic'
  });
  
  Level.belongsTo(LanguageHasTopic, {
    foreignKey: 'topic_id',  // Clave que representa 'LanguageHasTopic'
  });

  LanguageHasTopic.belongsToMany(User, {
    through: UserPoints,
    foreignKey: 'language_id' // Clave externa hacia language
  });

  LanguageHasTopic.belongsToMany(User, {
    through: UserPoints,
    foreignKey: 'topic_id' // Clave externa hacia topic
  });

  User.belongsToMany(LanguageHasTopic, {
    through: UserPoints,
    foreignKey: 'user_id' // Clave externa hacia user
  });
};

module.exports = setupAssociations;

