'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupTags = sequelize.define('GroupTags', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    groups: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#007bff',
      allowNull: false
    },
  }, {});
  GroupTags.associate = function(models) {
    // associations can be defined here
  };
  return GroupTags;
};