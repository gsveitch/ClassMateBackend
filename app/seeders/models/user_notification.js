'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_notification = sequelize.define('user_notification', {
    pushToken: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_notification;
};