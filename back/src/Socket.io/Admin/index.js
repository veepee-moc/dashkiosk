const fs = require('fs');
const Utils = require('./utils.js');
const SocketPassport = require('../../Auth/Socketio');
const { protectGroup, protectSocket } = require('../../Auth/Protect');
const Store = require('../../Redux/Store');
const Logger = require('../../Logger');
const DisplayManager = require('../../DisplayManager');

module.exports = (io) => {
    io = io.of('/admin');
    SocketPassport(io);
    io.use(protectSocket);
    
    io.on('connection', (socket) => {
        Utils.socketList.set(socket.id, socket);

        Logger.info("New admin socket");

        const storeData = Store.getState().Data;
        const data = {
            Groups: [],
            Displays: [],
            Dashboards: [],
            Broadcasts: [],
            MultiDashboards: [],
            GroupTags: []
        };

        for(group of storeData.Groups) {
            if(protectGroup(socket.request, group.id)) {
                data.Groups.push(group);
                data.Displays.push(...storeData.Displays.filter(display => display.groupId === group.id));
                data.Dashboards.push(...storeData.Dashboards.filter(dashboard => dashboard.groupId === group.id));
            }
        }
        data.Broadcasts = storeData.Broadcasts;
        data.MultiDashboards = storeData.MultiDashboards;
        data.GroupTags = storeData.GroupTags;

        const dm = DisplayManager();
        if (!dm) {
            socket.disconnect();
            return;
        }
        for (const rollover of dm.rollovers) {
            if (rollover.dashboard) {
                const index = data.Dashboards.findIndex(dash => dash.id === rollover.dashboard.id);
                if (index !== -1)
                    data.Dashboards[index] = Object.assign({}, data.Dashboards[index], { active: true });
            }
        }

        socket.emit('loadStore', data);
        socket.on('disconnect', (reason) => {
            Logger.info(`Socket ${ socket.id } has disconnected : ${ reason }`);
            Utils.socketList.delete(socket.id);
        });
    });
    const files = fs.readdirSync(`${__dirname}/Event`).filter(fileName => fileName.endsWith('.js'));
    for (const file of files)
        require(`./Event/${file}`)(io);
};
