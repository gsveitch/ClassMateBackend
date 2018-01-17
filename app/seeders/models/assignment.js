'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    title: DataTypes.STRING,
    dueDate: DataTypes.STRING
  });
  Assignment.associate = (models) => {
    Assignment.belongsTo(models.Session, {
      foreignkey: 'id_session',
    });
  };
  return Assignment;
};