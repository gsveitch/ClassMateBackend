'use strict';
module.exports = (sequelize, DataTypes) => {
  var Homework = sequelize.define('Homework', {
    photoUrl: DataTypes.STRING,
    id_assignment: DataTypes.INTEGER,
    id_participant: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Homework;
};