const EventEmitter = require('../../../EventEmitter');
const Logger = require('../../../Logger');
const Utils = require('../utils.js');
const { Types } = require('../../../Redux/Actions');

module.exports = (io) => {
    EventEmitter.on(Types.NewGroup, (prevState, newState, payload) => {
        Utils.sendActionToRole(io, Types.NewGroup, payload, payload.roles);
    });

    EventEmitter.on(Types.UpdateGroup, (prevState, newState, payload) => {
        Utils.sendActionToRole(io, Types.UpdateGroup, payload, payload.roles);
    });

    EventEmitter.on(Types.DeleteGroup, (prevState, newState, payload) => {
        Utils.sendActionToRole(io, Types.DeleteGroup, payload, payload.roles);
    });
};
