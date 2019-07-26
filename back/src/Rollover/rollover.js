const Store = require('../Redux/Store');
const EventEmitter = require('../EventEmitter');
const { Types } = require('../Redux/Actions');

class Rollover {
    constructor(groupId) {
        this.rank = null;
        this.groupId = groupId;
        this.dashboard = null;
        this.loadDashboards();

        EventEmitter.on(Types.NewDashbord, (prevState, newState, payload) => {
            this.loadDashboards();
        });

        EventEmitter.on(Types.UpdateDashbord, (prevState, newState, payload) => {
            this.loadDashboards();
        });

        EventEmitter.on(Types.DeleteDashbord, (prevState, newState, payload) => {
            this.loadDashboards();
        });
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
        this.nextDashboard();
    }

    getBroadcast() {
        const { Data } = Store.getState();
        const broadcast = Data.Broadcasts.find((obj) => obj.groupId === this.groupId && (!obj.availability || obj.availability.isValid(Date.now())));
        if (broadcast)
            clearTimeout(this.timeout);
        return broadcast;
    }

    getDashboard() {
        if (this.rankMax < 0 || this.dashboard)
            return null;
        let dashboard;
        let rank = this.rank + 1;
        while (!dashboard) {
            if (rank > this.rankMax)
                rank = 0;
            if (rank === this.rank)
                return null;
            dashboard = this.dashboards.find((obj) => {
                obj.rank === rank && (!obj.availability || obj.availability.isValid(Date.now()))
            });
            EventEmitter.emit('NextDashboard-' + this.groupId);
            ++rank;
        }
        return dashboard;
    }

    nextDashboard() {
        let dashboard = this.getBroadcast();
        if (!dashboard)
            dashboard = this.getDashboard();
        if (!dashboard)
            return;
        this.dashboard = dashboard;
        if (!dashboard.timeout)
            return;
        this.timeout = setTimeout(() => {
            this.dashboard = null;
            this.nextDashboard();
        }, dashboard.timeout);
    }

    stop() {
        clearTimeout(this.timeout);
        this.dashboard = null;
    }
};

module.exports = Rollover;
