const _ = require('lodash');
const models = require('../models');

module.exports = initializeRank = () => {
  models.Group.all().then(all => {
    var initialize = (allGroups) => {
      var hasNull = false;
      var tmpGroup = JSON.parse(JSON.stringify(allGroups));
      const setRank = (array) => {
        var highest = -1;
        for (var i = 0; i < array.length; i++) {
          if (array[i].rank >= highest && array[i].rank !== null) {
            highest = array[i].rank;
          }
        }
        return (highest + 1);
      };
      const updateRank = (id, rank) => {
        models.Group.get(id).then((dao) => {
          dao.update({ rank: rank });
        });
      };

      for (var y = 0; y < tmpGroup.length; y++) {
        if (tmpGroup[y].rank === null) {
          hasNull = true;
          tmpGroup[y].rank = setRank(tmpGroup);
        }
      }
      if (hasNull) {
        for (var x = 0; x < tmpGroup.length; x++) {
          if (allGroups[x].rank === null)
            updateRank(allGroups[x].id, tmpGroup[x].rank);
        }
      }
    }
    var data = _.mapValues(all, function (gp) { return gp.toJSON(); });
    var gp = Object.values(data);
    initialize(gp);
  });
};
