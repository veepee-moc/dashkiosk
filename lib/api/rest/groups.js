'use strict';

var models = require('../../models'),
    _  = require('lodash');

module.exports = function(app) {

  // Get list of groups
  app.get('/group', function(req, res, next) {
    models.Group.all()
      .then(function(groups) {
        res.send(_.mapValues(groups, function(g) { return g.toJSON(); }));
      })
      .catch(function(err) { next(err); });
  });

  // Create a new group
  app.post('/group', function(req, res, next) {
    var options = req.body;
    if (!options.name) {
      res.status(400).send({ message: 'Each group should have a name.' });
      return;
    }
    new models.Group(options.name, options).create()
      .then(function(group) {
        res.status(201).send(group.toJSON());
      })
      .catch(function(err) { next(err); });
  });

  // Modify an existing group
  app.put('/group/:id', function(req, res, next) {
    var options = req.body;
    models.Group.get(req.params.id)
      .then(function(group) {
        return group.update(options);
      })
      .then(function(group) {
        res.send(group.toJSON());
      })
      .catch(function(err) { next(err); });
  });

  // Delete a group
  app.delete('/group/:id', function(req, res, next) {
    models.Group.get(req.params.id)
      .then(function(group) {
        return group.delete();
      })
      .then(function() {
        res.sendStatus(204);
      })
      .catch(function(err) { next(err); });
  });

  // Drag and drop
  app.put('/group/rank/:id', function (req, res, next) {
    var drop = req.body.drop;
    var drag = req.params.id;

    models.Group.all()
      .then(function (all) {
        var data = _.mapValues(all, function (gp) { return gp.toJSON(); });
        var gp = Object.values(data);
        var findId = (arr, value) => {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === value)
              return i;
          }
          return 0;
        };
        var mooveRank = (gp, rank) => {
          models.Group.get(gp.id).then(dao => {
            dao.update({ rank: rank });
          });
        };
        gp.sort((a, b) => (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0));
        if (gp[findId(gp, drag)].rank < gp[findId(gp, drop)].rank) {
          models.Group.get(gp[findId(gp, drag)].id).then(dao => {
            dao.update({ rank: gp[findId(gp, drop) - 1].rank });
          });
          for (var i = findId(gp, drop) - 1; i > findId(gp, drag); i--)
            mooveRank(gp[i], gp[i - 1].rank);
        }
        else {
          models.Group.get(gp[findId(gp, drag)].id).then(dao => {
            dao.update({ rank: gp[findId(gp, drop)].rank });
          });
          for (var y = findId(gp, drop); y < findId(gp, drag); y++)
            mooveRank(gp[y], gp[y + 1].rank);
        }
      })
      .catch(function(err) { next(err); });
    res.sendStatus(201);
  });
};
