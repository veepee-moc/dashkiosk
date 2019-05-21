'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Groups', 'rank', {
      type: DataTypes.INTEGER
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Groups', 'rank');
    done();
  }
};
