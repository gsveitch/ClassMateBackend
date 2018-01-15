'use strict';
module.exports = (sequelize, DataTypes) => {
  var Participant_Type = sequelize.define('Participant_Type', {
    label: DataTypes.ENUM('student', 'teacher')
  });
  return Participant_Type;
};