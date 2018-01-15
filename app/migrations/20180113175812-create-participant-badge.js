'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Participant_Badges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      dateEarned: {
        type: Sequelize.DATE
      },
      id_badge: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Badges',
          key: 'id',
        },
      },
      id_participant: {
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
    return queryInterface.dropTable('Participant_Badges');
  }
};