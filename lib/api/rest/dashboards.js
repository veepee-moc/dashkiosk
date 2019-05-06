'use strict';
/*jshint loopfunc:true*/

var models = require('../../models'),
  _ = require('lodash'),
  bus = require('../../bus');

module.exports = function (app) {

  // Get a list of dashboards
  app.get('/group/:id/dashboard', function (req, res, next) {
    models.Group.get(req.params.id)
      .then(function (group) {
        return group.getDashboards();
      })
      .then(function (dashboards) {
        res.send(_.map(dashboards, function (d) { return d.toJSON(); }));
      })
      .catch(function (err) { next(err); });
  });

  // Create a new dashboard
  app.post('/group/:id/dashboard', function (req, res, next) {
    if (!req.body.url) {
      res.status(400).send({ message: 'Each dashboard should have an URL.' });
      return;
    }

    models.Group.get(req.params.id)
      .then(function (group) {
        return group.addDashboard(req.body.url, req.body);
      })
      .then(function (dashboard) {
        res.status(201).send(dashboard.toJSON());
      })
      .catch(function (err) { next(err); });
  });

  // Modify a dashboard. We also accept a rank to move the dashboard
  // to the specified rank (pushing other dashboards to higher ranks).
  app.put('/group/:group_id/dashboard/:dashboard_id', function (req, res, next) {
    models.Group.get(req.params.group_id)
      .then(function (group) {
        return group.getDashboard(req.params.dashboard_id)
          .then(function (dashboard) {
            return group.updateDashboard(dashboard, _.omit(req.body, 'rank'));
          })
          .then(function (dashboard) {
            var rank = req.body.rank;
            if (rank === null ||
              rank === undefined) {
              return dashboard;
            }
            rank = parseInt(rank, 10);
            return group.moveDashboard(dashboard, rank);
          });
      })
      .then(function (dashboard) {
        res.send(dashboard.toJSON());
      })
      .catch(function (err) { next(err); });
  });

  // Delete a dashboard
  app.delete('/group/:group_id/dashboard/:dashboard_id', function (req, res, next) {
    models.Group.get(req.params.group_id)
      .then(function (group) {
        return group.getDashboard(req.params.dashboard_id)
          .then(function (dashboard) {
            return group.deleteDashboard(dashboard);
          });
      })
      .then(function () {
        res.sendStatus(204);
      })
      .catch(function (err) { next(err); });
  });

  // Add a broadcast to every devices
  app.post('/broadcast', (req, res, next) => {
    if (!req.body.dashboard || !req.body.groups || !req.body.dashboard.url || !req.body.dashboard.timeout) {
      res.status(400).send({ message: 'Bad request' });
      return;
    }
    var params = req.body.dashboard;
    var groups = req.body.groups;
    var url = req.body.dashboard.url;

    groups.forEach(function (groupID, i) {
      models.Group.get(groupID)
        .then(function (dao) {
          dao.addDashboard(url, params).then(function (dashboard) {
            const group = dashboard.toJSON().group;
            setTimeout(function () {
              dao.deleteDashboard(dashboard);
            }, params.timeout * 1000);
            bus.publish('group.' + group + '.broadcast', { dashboard: dashboard });
          });
          return (dao);
        })
        .catch(function (err) {
          return (err);
        });
    });
    res.sendStatus(200);
  });
};