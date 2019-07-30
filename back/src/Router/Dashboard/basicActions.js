const Router = require('express').Router();
const BodyParser = require('body-parser');
const Store = require('../../Redux/Store');
const DbActions = require('../../Database/Actions');
const Logger = require('../../Logger');
const { protectRoute, protectGroup } = require('../../Auth/Protect');

function basicCheck(req, res, next) {
    req.params.dashboardId = parseInt(req.params.dashboardId);
    const { Data } = Store.getState();
    const dashboard = Data.Dashboards.find((obj) => obj.id === req.params.dashboardId);
    if (!dashboard)
        res.sendStatus(400);
    else if (!protectGroup(req, dashboard.groupId))
        res.sendStatus(401);
    else {
        req.dk = { dashboard };
        next();
    }
}

Router.get('/bygroup/:groupId(\\d+)', protectRoute('dashboard'), (req, res) => {
    req.params.groupId = parseInt(req.params.groupId);
    if (!protectGroup(req, req.params.groupId))
        res.sendStatus(401);
    const { Data } = Store.getState();
    const group = Data.Groups.find((obj) => obj.id === groupId);
    if (!group)
        res.sendStatus(400);
    else {
        const dashboards = Data.Dashboards.filter((obj) => obj.groupId === req.params.groupId);
        res.json(dashboards);
    }
});

Router.get('/:dashboardId(\\d+)', basicCheck, (req, res) => {
    res.json(req.dk.dashboard);
});

Router.post('/', protectRoute('dashboard'), BodyParser.json(), (req, res) => {
    console.log(req.body);
    if (!req.body.url || !req.body.groupId)
        res.sendStatus(400);
    else if (!protectGroup(req, req.groupId))
        res.sendStatus(401);
    else
        DbActions.newDashboard(req.body)
            .then((data) => res.status(201).json(data))
            .catch((err) => {
                Logger.error(err);
                res.sendStatus(500);
            });
});

Router.patch('/:dashboardId(\\d+)', protectRoute('dashboard'), basicCheck, BodyParser.json(), (req, res) => {
    DbActions.updateDashboard(req.params.dashboardId, req.body)
        .then((data) => res.json(data))
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

Router.delete('/:dashboardId(\\d+)', protectRoute('dashboard'), (req, res) => {
    DbActions.deleteDashboard(parseInt(req.params.dashboardId))
        .then(() => res.sendStatus(204))
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

module.exports = Router;
