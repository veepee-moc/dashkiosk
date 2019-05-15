'use strict';

module.exports = function (sequelize, DataTypes) {
  var SavedDashboards = sequelize.define('SavedDashboards', {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timeout: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    viewport: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    delay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    availability: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    watermark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    watermarkPosition: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    groupID: {
      type: DataTypes.INTEGER,
    }
  }, {
      tableName: 'SavedDashboards'
    });
  return SavedDashboards;
};