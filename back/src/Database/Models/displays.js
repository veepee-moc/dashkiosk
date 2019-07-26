'use strict';
module.exports = (sequelize, DataTypes) => {
  const Displays = sequelize.define('Displays', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups',
        key: 'id',
      },
      onDelete: 'RESTRICT'
    },
    viewport: {
      type: DataTypes.STRING
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chromecast: {
      type: DataTypes.STRING
    }
  }, {});
  Displays.associate = function(models) {
    // associations can be defined here
    Displays.belongsTo(models.Groups, {onDelete: 'restrict'});
  };
  return Displays;
};