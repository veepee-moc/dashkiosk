const Store = require('../Redux/Store');
const EventEmitter = require('../EventEmitter');
const { Types } = require('../Redux/Actions');

class GroupRollover {
    constructor(groupId) {
        this.groupId = groupId;
        this.currDashboard = null;
        this.handleGroupIsRunning = false;
        this.continue = true;
        this.timeout = null;
        this.loadDashboards();
        EventEmitter.on(null, this.loadDashboards);
    }

    sleep(duration) {
        return new Promise((resolve) => {
            this.resolve = resolve;
            this.timeout = setTimeout(resolve, duration);
        });
    }

    loadDashboards() {
        const { Data } = Store.getState();
        this.dashboards = Data.Dashboards
            .filter((db) => db.groupId === this.groupId)
            .sort((a, b) => {
                if (a.rank > b.rank)
                    return 1;
                else if (a.rank < b.rank)
                    return -1;
                else
                    return 0;
            });
            if (!this.handleGroupIsRunning) {
                this.handleGroupIsRunning = true;
                this.handleGroup();
            }
    }

    getNextDashboard(currDashboard) {
        if (this.dashboards.length === 0) {
            this.currDashboard = null;
            return;
        }
        if (currDashboard === null)
            this.currDashboard = this.dashboards[0];
        else {
            const index = this.dashboards.findIndex((obj) => obj.id === currDashboard.id);
            if (index + 1 < this.dashboards.length)
                this.currDashboard = this.dashboards[index + 1];
            else
                this.currDashboard = this.dashboards[0];
        }
        this.timer = Date.now();
    }

    async handleGroup() {
        if (!this.currDashboard)
            this.getNextDashboard(this.currDashboard);
        while (this.continue) {
            if (!this.currDashboard || this.currDashboard.timeout === null) {
                this.handleGroupIsRunning = false;
                return;
            }
            await this.sleep(this.currDashboard.timeout);
            this.getNextDashboard(this.currDashboard);
        }
    }

    stop() {
        this.continue = false;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.resolve();
        }
        EventEmitter.off(null, this.loadDashboards);
    }
};

module.exports = GroupRollover;