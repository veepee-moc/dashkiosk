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
      defaultValue: '[]',
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#007bff',
      allowNull: false
    }
  }, {
      tableName: 'GroupTags'
    });
  return GroupTags;
};