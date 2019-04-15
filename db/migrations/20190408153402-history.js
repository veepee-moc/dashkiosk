'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('History', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      refererUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      originalUrl: {
          type: DataTypes.STRING,
          allowNull: true
      },
      originalMethod: {
          type: DataTypes.STRING,
          allowNull: true
      },
      params: {
          type: DataTypes.STRING,
          allowNull: true
      },
      query: {
          type: DataTypes.STRING,
          allowNull: true
      },
      body: {
          type: DataTypes.STRING,
          allowNull: true
      },
      email: {
          type: DataTypes.STRING,
          allowNull: true
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
    migration.dropTable('History');
    done();
  }
};
