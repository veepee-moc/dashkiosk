'use strict';
/*jshint loopfunc:true*/

var models = require('../../models'),
  _ = require('lodash'),
  bus = require('../../bus'),
  db = require('../../db');

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
    if (!req.body.dashboard || !req.body.groups || !req.body.dashboard.url || !req.body.dashboard.timeout)
      return res.status(400).send({ message: 'Bad request' });
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
    res.sendStatus(201);
  });

  // Save a dashboard
  app.post('/saved_dashboard', (req, res, next) => {
    if (!req.body || !req.body.url || !req.body.groupID)
      return res.status(400).send({ message: 'Bad request' });
    db.SavedDashboards.find({ where: req.body })
      .then(savedDashboard => {
        if (!savedDashboard)
          db.SavedDashboards.create(req.body)
            .then(data => res.status(200).json({ message: 'Dashboard successfully saved.' }))
            .catch(err => next(err));
        else
          res.status(200).json({ message: 'Dashboard already saved.' });
      })
      .catch(err => next(err));
  });

  // Get a saved dashboard
  app.get('/saved_dashboard', (req, res, next) => {
    db.SavedDashboards.findAll().then(savedDashboard => {
      if (!savedDashboard)
        return res.sendStatus(404);
      res.status(200).json(savedDashboard);
    }).catch(err => next(err));
  });

  // Delete a saved dashbo'/saved_dashboardard
  app.delete('/saved_dashboard/:id', (req, res, next) => {
    db.SavedDashboards.find({ where: { id: req.params.id } })
    .then(savedDashboard => {
      if (!savedDashboard)
        return res.sendStatus(404);
      savedDashboard.destroy();
      res.sendStatus(200);
    }).catch(err => next(err));
  });
};
