'use strict';
module.exports = (sequelize, DataTypes) => {
  var EmergencyContact = sequelize.define('EmergencyContact', {
    nameFirst: DataTypes.STRING,
    nameLast: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return EmergencyContact;
};