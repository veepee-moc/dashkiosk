'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('GroupTags', {
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
        allowNull: true
      }
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('GroupTags');
    done();
  }
};
