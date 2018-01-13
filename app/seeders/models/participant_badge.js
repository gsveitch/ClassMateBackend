'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant_Badge = sequelize.define('Participant_Badge', {
    message: DataTypes.STRING,
    dateEarned: DataTypes.DATE
  });
  Participant_Badge.associate = (models) => {
    Participant_Badge.belongsTo(models.Badge, {
      foreignKey: 'id_badge',
    });
    Participant_Badge.belongsTo(models.Participant, {
      foreignKey: 'id_participant'
    });
  };
  return Participant_Badge;
};