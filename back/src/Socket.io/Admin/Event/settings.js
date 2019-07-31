const EventEmitter = require('../../../EventEmitter');
const Utils = require('../utils.js');

module.exports = (io) => {
    EventEmitter.on('UpdateSettings', (settings) => {
        Utils.sendActionToRole(io, 'UpdateSettings', settings, null);
    });
};
