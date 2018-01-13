'use strict';
module.exports = (sequelize, DataTypes) => {
  const Homework = sequelize.define('Homework', {}, {
  });
  
  Homework.associate = (models) => {
    Homework.belongsTo(models.Assignment, {
      foreignKey: 'id_assignment',
    });
    Homework.belongsTo(models.Participant, {
      foreignKey: 'id_participant',
    });
  };

  return Homework;
};