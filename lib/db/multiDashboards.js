'use strict';

module.exports = function (sequelize, DataTypes) {
  var MultiDashboards = sequelize.define('MultiDashboards', {
    urls: {
      type: DataTypes.STRING,
      allowNull: true
    },
    template: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      tableName: 'MultiDashboards'
    });
  return MultiDashboards;
};