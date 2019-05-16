'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('SavedDashboard', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
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
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('SavedDashboard');
    done();
  }
};