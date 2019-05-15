'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('SavedDashboards', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      timeout: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      viewport: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      delay: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      availability: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      watermark: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      watermarkPosition: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      groupID: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('SavedDashboards');
    done();
  }
};