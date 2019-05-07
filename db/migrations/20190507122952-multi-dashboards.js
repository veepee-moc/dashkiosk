'use strict';

module.exports = {
  up: (migration, DataTypes, done) => {
    migration.createTable('MultiDashboards', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      urls: {
        type: DataTypes.STRING,
        allowNull: false
      },
      template: {
        type: DataTypes.STRING,
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

  down: (migration, DataTypes, done) => {
    migration.dropTable('MultiDashboards');
    done();
  }
};
