const Topic = require('./topicModel');
const Level = require('./levelModel');
const Language = require('./languageModel');

const setupAssociations = () => {
  Topic.hasMany(Level, { foreignKey: 'topic_id' });
  Level.belongsTo(Topic, { foreignKey: 'topic_id' });

  Language.hasMany(Level, { foreignKey: 'language_id' });
  Level.belongsTo(Language, { foreignKey: 'language_id' });
};

module.exports = setupAssociations;
