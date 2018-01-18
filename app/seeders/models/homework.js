'use strict';
module.exports = (sequelize, DataTypes) => {
  var Homework = sequelize.define('Homework', {
    photoUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Homework.belongsTo(models.Assignment, {
          foreignKey: 'id_homework',
        });
      }
    }
  });
  return Homework;
};