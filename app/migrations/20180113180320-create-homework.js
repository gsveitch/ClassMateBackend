'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Homework', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_assignment: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Assignments',
          key: 'id',
        },
      },
      id_participant: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Participants',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Homework');
  }
};