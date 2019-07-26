const EventEmitter = require('../../../EventEmitter');
const Logger = require('../../../Logger');
const Utils = require('../utils.js');
const { Types } = require('../../../Redux/Actions');

module.exports = (io) => {
    EventEmitter.on(Types.NewDisplay, (prevState, newState, payload) => {
        const group = newState.Data.Groups.find((obj) => obj.id === payload.groupId);
        if (!group) {
            Logger.error('Group not found');
            return;
        }
        Utils.sendActionToRole(io, Types.NewDisplay, payload, group.roles);
    });

    EventEmitter.on(Types.UpdateDisplay, (prevState, newState, payload) => {
        const group = newState.Data.Groups.find((obj) => obj.id === payload.groupId);
        if (!group) {
            Logger.error('Group not found');
            return;
        }
        Utils.sendActionToRole(io, Types.UpdateDisplay, payload, group.roles);
    });

    EventEmitter.on(Types.DeleteDisplay, (prevState, newState, payload) => {
        const display = prevState.Data.Groups.find((obj) => obj.id === payload);
        if (!display) {
            Logger.error('Display not found');
            return;
        }
        const group = pevState.Data.Groups.find((obj) => obj.id === display.groupId);
        if (!group) {
            Logger.error('Group not found');
            return;
        }
        Utils.sendActionToRole(io, Types.DeleteDisplay, display, group.roles);
    });
};
