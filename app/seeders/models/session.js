'use strict';
module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define('Session', {
    description: DataTypes.STRING,
    calenderID: DataTypes.STRING,
    joinCode: DataTypes.STRING
  });
  
  return Session;
};