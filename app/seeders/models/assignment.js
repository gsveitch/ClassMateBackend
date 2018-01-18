'use strict';
module.exports = (sequelize, DataTypes) => {
  var Assignment = sequelize.define('Assignment', {
    title: DataTypes.STRING,
    dueDate: DataTypes.STRING,
    id_session: DataTypes.INTEGER,
  });
  return Assignment;
};