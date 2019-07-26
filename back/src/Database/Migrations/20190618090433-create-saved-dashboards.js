'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SavedDashboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: { 
          notNull: true
        }
      },
      description: {
        type: Sequelize.TEXT
      },
      timeout: {
        type: Sequelize.INTEGER
      },
      viewport: {
        type: Sequelize.STRING
      },
      delay: {
        type: Sequelize.INTEGER
      },
      availability: {
        type: Sequelize.STRING
      },
      watermark: {
        type: Sequelize.TEXT
      },
      watermarkPosition: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('SavedDashboards');
  }
};