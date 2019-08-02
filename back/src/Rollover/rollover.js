const Store = require('../Redux/Store');
const EventEmitter = require('../EventEmitter');
const { Types, action } = require('../Redux/Actions');

class Rollover {
    constructor(groupId) {
        this.rank = null;
        this.groupId = groupId;
        this.dashboard = null;
        EventEmitter.on(Types.NewDashboard, (prevState, newState, payload) => {
            if (payload.groupId === this.groupId)
                this.loadDashboards();
        });
        EventEmitter.on(Types.NewBroadcast, (prevState, newState, payload) => {
            if (payload.groupId === this.groupId)
                this.loadDashboards()
        });
        EventEmitter.on(Types.UpdateDashboard, (prevState, newState, payload) => {
            if (payload.groupId === this.groupId)
                this.loadDashboards();
        });
        EventEmitter.on(Types.DeleteDashboard, (prevState, newState, payload) => {
            const dashboard = prevState.Data.Dashboards.find((obj) => obj.id === payload);
            if (dashboard && dashboard.groupId === this.groupId)
                this.loadDashboards();
        });
        EventEmitter.on(Types.DeleteBroadcast, (prevState, newState, payload) => {
            const broadcast = prevState.Data.Broadcasts.find(obj => obj.id === payload);
            if (broadcast && broadcast.groupId === this.groupId)
                this.loadDashboards();
        });
        this.loadDashboards();
    }

    getRankMax() {
        let rank = -1;
        for (const dashboard of this.dashboards)
            if (dashboard.rank > rank)
                rank = dashboard.rank;
        return rank;
    }

    loadDashboards() {
        const { Data } = Store.getState();
        this.dashboards = Data.Dashboards.filter((obj) => obj.groupId === this.groupId);
        this.rankMax = this.getRankMax();
        if (!this.rank)
            this.rank = this.rankMax;
        if (this.dashboard && !this.dashboards.includes(this.dashboard) && !this.dashboard.broadcast)
            this.stop();
        this.nextDashboard();
    }

    getBroadcast() {
        if (this.dashboard && this.dashboard.broadcast)
            return;
        const { Data } = Store.getState();
        const broadcast = Data.Broadcasts.find((obj) => obj.groupId === this.groupId && (!obj.availability || obj.availability.isValid(Date.now())));
        if (broadcast) {
            this.stop();
            this.dashboard = broadcast;
            Store.dispatch(action(Types.DeleteBroadcast, broadcast.id));
        }
    }

    getDashboard() {
        if (this.dashboard)
            return;
        if (this.rankMax < 0 || this.dashboard)
            return;
        let dashboard = null;
        let rank = this.rank;
        while (!dashboard) {
            ++rank;
            if (rank > this.rankMax)
                rank = 0;
            dashboard = this.dashboards.find((obj) => obj.rank === rank && (!obj.availability || obj.availability.isValid(Date.now())));
            if (rank === this.rank && !dashboard)
                return null;
        }
        this.rank = rank;
        this.dashboard = dashboard;
    }

    nextDashboard() {
        const actualDashboard = this.dashboard;
        this.getBroadcast();
        this.getDashboard();
        if (!this.dashboard || actualDashboard === this.dashboard)
            return;
        EventEmitter.emit('NextDashboard-' + this.groupId, this.dashboard);
        if (!this.dashboard.broadcast)
            EventEmitter.emit('UpdateActiveDashboard', { active: true, id: this.dashboard.id, groupId: this.dashboard.groupId });
        if (!this.dashboard.timeout)
            return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (!this.dashboard.broadcast)
                EventEmitter.emit('UpdateActiveDashboard', { active: false, id: this.dashboard.id, groupId: this.dashboard.groupId });
            this.dashboard = null;
            this.nextDashboard();
        }, this.dashboard.timeout * 1000);
    }

    stop() {
        clearTimeout(this.timeout);
        if (this.dashboard) {
            if (!this.dashboard.broadcast)
                EventEmitter.emit('UpdateActiveDashboard', { active: false, id: this.dashboard.id, groupId: this.dashboard.groupId });
            this.dashboard = null;
        }
    }
};

module.exports = Rollover;
