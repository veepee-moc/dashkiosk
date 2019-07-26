'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    refererUrl: DataTypes.TEXT,
    originalUrl: DataTypes.TEXT,
    originalMethod: DataTypes.TEXT,
    params: DataTypes.TEXT,
    query: DataTypes.TEXT,
    body: DataTypes.TEXT,
    email: DataTypes.STRING
  }, {tableName: 'History'});
  History.associate = function(models) {
    // associations can be defined here
  };
  return History;
};