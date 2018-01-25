'use strict';
module.exports = (sequelize, DataTypes) => {
  var FunStuff = sequelize.define('FunStuff', {
    link: DataTypes.STRING,
    type: DataTypes.STRING,
    id_session: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FunStuff;
};