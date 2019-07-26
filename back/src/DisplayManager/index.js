const Logger = require('../Logger');
const Store = require('../Redux/Store');
const DbActions = require('../Database/Actions');
const prometheus = require('../Prometheus');
const Rollover = require('../Rollover/rollover.js');

const EventEmitter = require('../EventEmitter');
const { Types } = require('../Redux/Actions');
// [display.id][socket]
const socketList = new Map();



// EventEmitter.on(Types.UpdateDisplay, (prevState, newState, payload) => {
//     const oldGroups = ;
//     const newGroups = ;
//     if (oldGroups == newGroups) {
//         return;
//     }
//     const socket = sokcetList(payload.id);
//     socket.join();
//     socket.leave();
// });

EventEmitter.on(Types.DeleteGroup, (prevState, newState, payload) => {
    // rollovers.pop();
});

class DisplayManager {
    constructor(io) {
        this.io = io.of('/displays');
        this.handleNewDisplay();
        this.rollovers = null;
    }

    initRollovers() {
        this.rollovers = new Array(new Rollover(1));
    }

    handleNewDisplay() {
        EventEmitter.on(Types.NewGroup, (prevState, newState, payload) => {
            this.rollovers.push(new Rollover(payload.id));
            EventEmitter.on('NextDashboard-' + payload.id, (dashboard) => {
                this.io.to(display.groupId).emit('dashboard', dashboard.url);
            });
        });

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
                        socketList.set(display.id, socket);
                        socket.on('disconnect', () => {
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
