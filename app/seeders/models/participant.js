'use strict';
module.exports = (sequelize, DataTypes) => {
  var Participant = sequelize.define('Participant', {}, {
  });

  Participant.associate = (models) => {
    Participant.belongsTo(models.User, {
      foreignKey: 'id_user',
    });
    Participant.belongsTo(models.Session, {
      foreignKey: 'id_session',
    });
    Participant.belongsTo(models.Participant_Type, {
      foreignKey: 'id_participant_type'
    });
  };
  return Participant;
};