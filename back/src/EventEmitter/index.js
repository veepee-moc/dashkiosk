/**
 * Event Emitter
 */
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    emit(type, ...args) {
        super.emit('any', type, ...args);
        return super.emit(type, ...args);
    }
};

const emitter = new MyEmitter();
emitter.setMaxListeners(0);
module.exports = emitter;