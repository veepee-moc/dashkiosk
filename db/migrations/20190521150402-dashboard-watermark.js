'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Dashboards', 'watermark', {
      type: DataTypes.TEXT,
      allowNull: true
    });
    migration.addColumn('Dashboards', 'watermarkPosition', {
      type: DataTypes.TEXT,
      allowNull: true
    });
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Dashboards', 'watermark');
    migration.removeColumn('Dashboards', 'watermarkPosition');
    done();
  }
};
