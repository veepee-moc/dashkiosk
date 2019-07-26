'use strict';
module.exports = (sequelize, DataTypes) => {
  const SavedDashboards = sequelize.define('SavedDashboards', {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
        validate: {
          notNull: true
        }
    },
    description: DataTypes.TEXT,
    timeout: DataTypes.INTEGER,
    viewport: DataTypes.STRING,
    delay: DataTypes.INTEGER,
    availability: DataTypes.STRING,
    watermark: DataTypes.TEXT,
    watermarkPosition: DataTypes.STRING
  }, {});
  SavedDashboards.associate = function(models) {
    // associations can be defined here
  };
  return SavedDashboards;
};