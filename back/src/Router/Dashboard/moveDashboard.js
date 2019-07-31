const Router = require('express').Router();
const BodyParser = require('body-parser');
const Store = require('../../Redux/Store');
const DbActions = require('../../Database/Actions');
const { protectGroup } = require('../../Auth/Protect');

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

function getDashboards(groupId) {
    const dashboards = Store.getState().Data.Dashboards
        .filter(a => a.groupId === groupId)
        .map(a => {
            return { id: a.id, rank: a.rank }
        })
        .sort((a, b) => {
            if (a.rank > b.rank)
                return 1;
            else if (a.rank < b.rank)
                return -1;
            else
                return 0;
        });
    return dashboards;
}

function updateRanks(dashboards) {
    for (let rank = 0; rank < dashboards.length; rank++)
        dashboards[rank].rank = rank;
}

Router.patch('/move/:dashboardId(\\d+)', basicCheck, BodyParser.json(), (req, res, next) => {
    const { srcGroup, dstGroup, newRank } = req.body;
    const dashboard = req.dk.dashboard;
    const srcDashboards = getDashboards(srcGroup);
    srcDashboards.splice(dashboard.rank, 1);
    updateRanks(srcDashboards);
    const dstDashboards = srcGroup === dstGroup ? srcDashboards : getDashboards(dstGroup);
    dashboard.rank = newRank;
    dashboard.groupId = dstGroup;
    dstDashboards.splice(newRank, 0, dashboard);
    updateRanks(dstDashboards);
    const promises = [];
    for (const dash of srcDashboards)
        promises.push(DbActions.updateDashboard(dash.id, { rank: dash.rank, groupId: dash.groupId }));
    if (srcGroup !== dstGroup) {
        for (const dash of dstDashboards)
            promises.push(DbActions.updateDashboard(dash.id, { rank: dash.rank, groupId: dash.groupId }));
    }
    Promise.all(promises)
        .then(() => res.sendStatus(200))
        .catch(err => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

module.exports = Router;