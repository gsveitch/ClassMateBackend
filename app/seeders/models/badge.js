'use strict';
module.exports = (sequelize, DataTypes) => {
  var Badge = sequelize.define('Badge', {
    icon: DataTypes.STRING,
    description: DataTypes.STRING
  });
  
  return Badge;
};