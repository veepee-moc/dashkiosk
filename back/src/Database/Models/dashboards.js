'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dashboards = sequelize.define('Dashboards', {
    rank: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    timeout: {
      type: DataTypes.INTEGER
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    viewport: {
      type: DataTypes.STRING
    },
    delay: {
      type: DataTypes.INTEGER
    },
    availability: {
      type: DataTypes.STRING
    },
    watermark: {
      type: DataTypes.TEXT
    },
    watermarkPosition: {
      type: DataTypes.STRING
    }
  }, {});
  Dashboards.associate = function(models) {
    // associations can be defined here
    Dashboards.belongsTo(models.Groups, {onDelete: 'cascade'});
  };
  return Dashboards;
};