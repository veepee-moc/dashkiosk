'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Groups', 'layoutSize', {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      allowNull: false
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Groups', 'layoutSize');
    done();
  }
};
