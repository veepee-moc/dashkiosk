import socketIO from 'socket.io-client';
import Store from '../../Store';
import { Types, action } from '../../Actions';

export default function () {
    const socket = socketIO.connect('/changes');
    socket.on('connect', function () {
        console.info('[Dashkiosk] connected to socket.io server');
        Store.dispatch(action(Types.SetAdminState, { socketConnected: true }));
    });
    socket.on('disconnect', function () {
        console.warn('[Dashkiosk] lost connection to socket.io server');
        Store.dispatch(action(Types.SetAdminState, { socketConnected: false }));
    });
    socket.on('snapshot', function (newGroups) {
        console.info('[Dashkiosk] received a full snapshot of all groups');
        Store.dispatch(action(Types.SetAllGroups, newGroups));
    });
    socket.on('group.created', function (group) {
        console.info('[Dashkiosk] received a new group', group);
        Store.dispatch(action(Types.SetGroup, group));
    });
    socket.on('group.updated', function (group) {
        console.info('[Dashkiosk] updated group', group);
        Store.dispatch(action(Types.SetGroup, group));
    });
    socket.on('group.deleted', function (group) {
        console.info('[Dashkiosk] deleted group', group);
        Store.dispatch(action(Types.DeleteGroup, group));
    });
    socket.on('display.updated', function (display) {
        console.info('[Dashkiosk] updated display', display);
        Store.dispatch(action(Types.SetDisplay, display));
    });
    socket.on('display.deleted', function (display) {
        console.debug('[Dashkiosk] deleted display', display);
        Store.dispatch(action(Types.DeleteDisplay, display));
    });
    return (socket);
};