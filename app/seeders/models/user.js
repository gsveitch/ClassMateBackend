'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    nameFirst: DataTypes.STRING,
    nameLast: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    gradeLevel: DataTypes.INTEGER,
    email: DataTypes.STRING,
    photoUrl: DataTypes.STRING
  });

  User.associate = (models) => {
    User.belongsTo(models.EmergencyContact, {
      foreignKey: 'id_emergencyContact',
    });
  };

  return User;
};