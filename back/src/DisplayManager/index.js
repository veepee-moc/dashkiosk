const Logger = require('../Logger');
const Store = require('../Redux/Store');
const DbActions = require('../Database/Actions');
const prometheus = require('../Prometheus');
const Rollover = require('../Rollover/rollover.js');

const EventEmitter = require('../EventEmitter');
const { Types } = require('../Redux/Actions');

class DisplayManager {
    constructor(io) {
        this.io = io.of('/displays');
        this.rollovers = [];
        // [display.id][socket]
        this.socketList = new Map();
        this.handleNewDisplay();
    }

    initRollovers() {
        const groups = Store.getState().Data.Groups;
        for (const group of groups) {
            EventEmitter.on('NextDashboard-' + group.id, (dashboard) => {
                this.io.to(group.id).emit('NextDashboard', dashboard);
            });
            this.rollovers.push(new Rollover(group.id));
        }

        EventEmitter.on(Types.NewGroup, (prevState, newState, payload) => {
            this.rollovers.push(new Rollover(payload.id));
            EventEmitter.on('NextDashboard-' + payload.id, (dashboard) => {
                this.io.to(dashboard.groupId).emit('NextDashboard', dashboard);
            });
        });

        EventEmitter.on(Types.UpdateDisplay, (prevState, newState, payload) => {
            const oldGroupId = prevState.Data.Displays.find((obj) => payload.id).groupId;
            if (oldGroupId !== payload.groupId) {
                const socket = this.sokcetList(payload.id);
                socket.leave(oldGroupId);
                socket.join(payload.id);
            }
        });

        EventEmitter.on(Types.DeleteGroup, (prevState, newState, payload) => {
            const index = this.rollovers.findIndex((rollover) => rollover.groupId === payload);
            if (index === undefined)
                return;
            this.rollovers[index].stop();
            this.rollovers.splice(index, 1);
            EventEmitter.removeAllListeners('NextDashboard-' + payload);
        });
    }

    handleNewDisplay() {
        this.io.on('connection', (socket) => {
            let ip = (socket.handshake.headers || {})['x-forwarded-for'] ||
                socket.request.connection.remoteAddress;
            if (ip) {
                // For some reason, socket.io may not provide an IP in all cases
                ip = ip.replace(/^:ffff:/, '');
            }
            socket.on('register', (data, fn) => {
                let display;
                DbActions.newDisplay(data.name, ip)
                    .then((res) => {
                        display = res;
                        fn(display.name);
                        prometheus.setDisplayStatus(display, 1);
                        Logger.info(`New display: ${ display.name }-${ ip }`);
                    })
                    .then(() => {
                        this.socketList.set(display.id, socket);
                        socket.join(display.groupId);
                        socket.on('disconnect', () => {
                            this.socketList.delete(display.id);
                            prometheus.setDisplayStatus(display, 0);
                            display.connected = false;
                            Logger.info(`display disconnected: ${ display.name } `);
                        })
                    })
                    .catch((err) => {
                        Logger.error(`Unable to register new display: ${ err }`);
                        socket.disconnect();
                    });
            });
        });
    }
};

module.exports = DisplayManager;
