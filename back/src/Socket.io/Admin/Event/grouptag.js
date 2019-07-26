const EventEmitter = require('../../../EventEmitter');
const Logger = require('../../../Logger');
const Utils = require('../utils.js');
const { Types } = require('../../../Redux/Actions');

module.exports = (io) => {
    EventEmitter.on(Types.NewGroupTag, (prevState, newState, payload) => {
        Utils.sendActionToRole(io, Types.NewGroupTag, payload, null);
    });

    EventEmitter.on(Types.UpdateGroupTag, (prevState, newState, payload) => {
        Utils.sendActionToRole(io, Types.UpdateGroupTag, payload, null);
    });

    EventEmitter.on(Types.DeleteGroupTag, (prevState, newState, payload) => {
        Utils.sendActionToRole(io, Types.DeleteGroupTag, payload, null);
    });
};
