'use strict';
module.exports = (sequelize, DataTypes) => {
  const MultiDashboards = sequelize.define('MultiDashboards', {
    urls: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    template: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {});
  MultiDashboards.associate = function(models) {
    // associations can be defined here
  };
  return MultiDashboards;
};