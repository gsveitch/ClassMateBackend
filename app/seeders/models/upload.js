'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define('Upload', {
    photoUrl: DataTypes.STRING
  });
  
  Upload.associate = (models) => {
    Upload.belongsTo(models.Homework, {
      foreignKey: 'id_homework'
    });
  };

  return Upload;
};