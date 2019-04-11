import socketIO from 'socket.io-client';

export default function (groups) {
    const socket = socketIO.connect('http://localhost:9400/changes');
    socket.on('connect', function () {
        console.info('[Dashkiosk] connected to socket.io server');
        groups.props.setStoreState({
            socketConnected: true
        });
    });
    socket.on('disconnect', function () {
        console.warn('[Dashkiosk] lost connection to socket.io server');
        groups.props.setStoreState({
            socketConnected: false
        });
    });
    /*
    socket.on('snapshot', function (newGroups) {
        console.info('[Dashkiosk] received a full snapshot of all groups');
        groups.server = newGroups;
        fromServer();
    });
    socket.on('group.created', function (group) {
        console.info('[Dashkiosk] received a new group', group);
        groups.server[group.id] = group;
        fromServer();
    });
    socket.on('group.updated', function (group) {
        console.info('[Dashkiosk] updated group', group);
        groups.server[group.id] = group;
        fromServer();
    });
    socket.on('group.deleted', function (group) {
        console.info('[Dashkiosk] deleted group', group);
        delete groups.server[group.id];
        fromServer();
    });
    socket.on('display.updated', function (display) {
        console.info('[Dashkiosk] updated display', display);
        // Remove the display from any existing group
        _.each(groups.server, function (group) {
            group.displays = _.omit(group.displays, function (d) { return d.name === display.name; });
        });
        // Add it back to the right group
        var group = groups.server[display.group];
        if (group) {
            group.displays[display.name] = display;
        }
        fromServer();
    });
    socket.on('display.deleted', function (display) {
        console.debug('[Dashkiosk] deleted display', display);
        _.each(groups.server, function (group) {
            group.displays = _.omit(group.displays, function (d) { return d.name === display.name; });
        });
        fromServer();
    });
    */
    return (socket);
};