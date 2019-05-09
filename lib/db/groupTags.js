'use strict';

module.exports = function (sequelize, DataTypes) {
  var GroupTags = sequelize.define('GroupTags', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    groups: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      tableName: 'GroupTags'
    });
  return GroupTags;
};