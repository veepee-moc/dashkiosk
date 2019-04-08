// Add Rank column for dashboard

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Groups', 'rank', {
        type: DataTypes.INTEGER,
        allowNull: true
    });
    done();
  }
};
