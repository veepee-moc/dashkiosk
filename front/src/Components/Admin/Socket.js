import socketIO from 'socket.io-client';
import Store from '../../Redux/Store';
import { Types, action } from '../../Redux/Actions';

export default function () {
    const socket = socketIO.connect('/admin');

    //socket.emit('/register', 'admin');
    
    socket.on(Types.NewDashboard, (newDashboard) => {
        console.log('[Socket.io]: New dashboard');
        Store.dispatch(action(Types.NewDashboard, newDashboard));
    });

    socket.on(Types.UpdateDashboard, (updatedDashboard) => {
        console.log('[Socket.io]: Update dashboard');
        Store.dispatch(action(Types.UpdateDashboard, updatedDashboard));
    });

    socket.on(Types.DeleteDashboard, (deletedDashboard) => {
        console.log('[Socket.io]: Delete dashboard');
        Store.dispatch(action(Types.DeleteDashboard, deletedDashboard));
    });

    socket.on(Types.NewDisplay, (newDisplay) => {
        console.log('[Socket.io]: New display');
        Store.dispatch(action(Types.NewDisplay, newDisplay));
    });

    socket.on(Types.UpdateDisplay, (updatedDisplay) => {
        console.log('[Socket.io]: Update display');
        Store.dispatch(action(Types.UpdateDisplay, updatedDisplay));
    });

    socket.on(Types.DeleteDisplay, (deleteDisplay) => {
        console.log('[Socket.io]: Delete display');
        Store.dispatch(action(Types.DeleteDisplay, deleteDisplay));
    });

    socket.on(Types.NewGroup, (newGroup) => {
        console.log('[Socket.io]: New group');
        Store.dispatch(action(Types.NewGroup, newGroup));
    });

    socket.on(Types.UpdateGroup, (updatedGroup) => {
        console.log('[Socket.io]: Update group');
        Store.dispatch(action(Types.UpdateGroup, updatedGroup));
    });

    socket.on(Types.DeleteGroup, (deletedGroup) => {
        console.log('[Socket.io]: Delete group');
        Store.dispatch(action(Types.DeleteGroup, deletedGroup));
    });

    socket.on(Types.NewGroupTag, (newGroupTag) => {
        console.log('[Socket.io]: New grouptag');
        Store.dispatch(action(Types.NewGroupTag, newGroupTag));
    });

    socket.on(Types.UpdateGroupTag, (updatedGroupTag) => {
        console.log('[Socket.io]: Update grouptag');
        Store.dispatch(action(Types.UpdateGroupTag, updatedGroupTag));
    });

    socket.on(Types.DeleteGroupTag, (deletedGroupTag) => {
        console.log('[Socket.io]: Delete grouptag');
        Store.dispatch(action(Types.DeleteGroupTag, deletedGroupTag));
    });

    socket.on('loadStore', (data) => {
        console.log('[Socket.io]: Load Store');
        Store.dispatch(action(Types.LoadStore, data));
    });

    socket.on('connect', () => {
        Store.dispatch(action(Types.SetAdminState, { socketConnected: true }));
        console.info('[Dashkiosk] connected to socket.io server');
    });

    socket.on('disconnect', (reason) => {
        Store.dispatch(action(Types.SetAdminState, { socketConnected: false }));
        console.warn('[Dashkiosk] lost connection to socket.io server: ' + reason);
    });

    // old
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
    socket.on('grouptag.created', (tag) =>
        Store.dispatch(action(Types.AddGroupTag, tag))
    );
    socket.on('grouptag.updated', (tag) =>
        Store.dispatch(action(Types.UpdateGroupTag, tag))
    );
    socket.on('grouptag.deleted', (tag) =>
        Store.dispatch(action(Types.DeleteGroupTag, tag))
    );
    return (socket);
};
