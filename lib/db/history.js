'use strict';

// A display is associated to a group of dashboards

module.exports = function(sequelize, DataTypes) {
  var History = sequelize.define('History', {
    refererUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    originalUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    originalMethod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    params: {
        type: DataTypes.STRING,
        allowNull: true
    },
    query: {
        type: DataTypes.STRING,
        allowNull: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    tableName: 'History'
  });
  return History;
};
