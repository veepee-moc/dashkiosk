const EventEmitter = require('../../EventEmitter');

const eventMiddleware = store => next => action => {
    const prevState = store.getState();
    const result = next(action);
    const state = store.getState();
    if (prevState !== state)
        EventEmitter.emit(action.type, prevState, state, action.payload);
    return result;
};

module.exports = eventMiddleware;