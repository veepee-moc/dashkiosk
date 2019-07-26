'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('History', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      refererUrl: {
        type: Sequelize.TEXT
      },
      originalUrl: {
        type: Sequelize.TEXT
      },
      originalMethod: {
        type: Sequelize.TEXT
      },
      params: {
        type: Sequelize.TEXT
      },
      query: {
        type: Sequelize.TEXT
      },
      body: {
        type: Sequelize.TEXT
      },
      email: {
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
    return queryInterface.dropTable('History');
  }
};