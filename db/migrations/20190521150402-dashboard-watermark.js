'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Groups', 'watermark', {
      type: DataTypes.TEXT,
      allowNull: true
    });
    migration.addColumn('Groups', 'watermarkPosition', {
      type: DataTypes.TEXT,
      allowNull: true
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Groups', 'watermark');
    migration.removeColumn('Groups', 'watermarkPosition');
    done();
  }
};
