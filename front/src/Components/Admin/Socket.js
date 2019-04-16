import socketIO from 'socket.io-client';

export default function (admin) {
    const socket = socketIO.connect('/changes');
    socket.on('connect', function () {
        console.info('[Dashkiosk] connected to socket.io server');
        admin.setState({
            socketConnected: true
        });
    });
    socket.on('disconnect', function () {
        console.warn('[Dashkiosk] lost connection to socket.io server');
        admin.setState({
            socketConnected: false
        });
    });
    socket.on('snapshot', function (newGroups) {
        console.info('[Dashkiosk] received a full snapshot of all groups');
        console.info(newGroups);
        admin.setState({
            groups: newGroups
        });
    });
    socket.on('group.created', function (group) {
        console.info('[Dashkiosk] received a new group', group);
        admin.setState({
            groups: Object.assign(admin.state.groups, { [group.id]: group })
        });
    });
    socket.on('group.updated', function (group) {
        console.info('[Dashkiosk] updated group', group);
        admin.setState({
            groups: Object.assign(admin.state.groups, { [group.id]: group })
        });
    });
    socket.on('group.deleted', function (group) {
        console.info('[Dashkiosk] deleted group', group);
        const groups = admin.state.groups;
        delete groups[group.id];
        admin.setState({
            groups: groups
        });
    });
    function removeFirstOccurence(objArr, obj) {
        for (const index in objArr) {
            if (objArr[index].id === obj.id)
                delete objArr[index];
        }
    }
    socket.on('display.updated', function (display) {
        console.info('[Dashkiosk] updated display', display);
        const groups = admin.state.groups;
        for (const index in groups)
            removeFirstOccurence(groups[index].displays, display);
        const group = groups[display.group];
        if (group)
            group.displays[display.name] = display;
        admin.setState({
            groups: groups
        });
    });
    socket.on('display.deleted', function (display) {
        console.debug('[Dashkiosk] deleted display', display);
        const groups = admin.state.groups;
        for (const index in groups)
            removeFirstOccurence(groups[index].displays, display);
        admin.setState({
            groups: groups
        });
    });
    return (socket);
};