'use strict';
module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: 'No description'
    },
    layoutSize: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      allowNull: false
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roles: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      allowNull: false
    },
  }, {});
  Groups.associate = function(models) {
    // associations can be defined here
    Groups.hasMany(models.Dashboards, { onDelete: 'cascade' });
    Groups.hasMany(models.Displays, {
      as: 'Displays',
      onDelete: 'restrict'
    });
  };
  return Groups;
};