const EventEmitter = require('../../../EventEmitter');
const Logger = require('../../../Logger');
const Utils = require('../utils.js');
const Store = require('../../../Redux/Store');
const { Types } = require('../../../Redux/Actions');

module.exports = (io) => {
    EventEmitter.on(Types.NewDashboard, (prevState, newState, payload) => {
        const group = newState.Data.Groups.find((obj) => obj.id === payload.groupId);
        if (!group) {
            Logger.error('Group not found');
            return;
        }
        Utils.sendActionToRole(io, Types.NewDashboard, payload, group.roles);
    });

    EventEmitter.on(Types.UpdateDashboard, (prevState, newState, payload) => {
        const group = newState.Data.Groups.find((obj) => obj.id === payload.groupId);
        if (!group) {
            Logger.error('Group not found');
            return;
        }
        Utils.sendActionToRole(io, Types.UpdateDashboard, payload, group.roles);
    });

    EventEmitter.on('UpdateActiveDashboard', (dashboard) => {
        const group = Store.getState().Data.Groups.find((obj) => obj.id === dashboard.groupId);
        if (!group) {
            Logger.error('Group not found');
            return;
        }
        Utils.sendActionToRole(io, Types.UpdateDashboard, dashboard, group.roles);
    });

    EventEmitter.on(Types.DeleteDashboard, (prevState, newState, payload) => {
        const dashboard = prevState.Data.Dashboards.find((obj) => obj.id === payload);
        if (!dashboard) {
            Logger.error('Dashboard not found');
            return;
        }
        const group = prevState.Data.Groups.find((obj) => obj.id === dashboard.groupId);
        if (!group) {
            Logger.error('Group not found');
            return;
        }
        Utils.sendActionToRole(io, Types.DeleteDashboard, dashboard, group.roles);
    });
};
