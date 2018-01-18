'use strict';
module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define('Session', {
    description: DataTypes.STRING,
    calenderID: DataTypes.STRING,
    joinCode: DataTypes.STRING
  });
  // Session.associate = (models) => {
  //   Session.belongsTo(models.Participant, {
  //     foreignKey: 'id_session',
  //   });
  // };
  return Session;
};