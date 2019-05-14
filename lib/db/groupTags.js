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
      allowNull: false
    }
  }, {
      tableName: 'GroupTags'
    });
  return GroupTags;
};