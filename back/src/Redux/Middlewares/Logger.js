const Logger = require('../../Logger');

const loggerMiddleware = store => next => action => {
    const prevState = store.getState();
    const result = next(action);
    const state = store.getState();
    if (state !== prevState)
        Logger.info(`Redux reducer: ${ action.type }`);
    else
        Logger.error(`Action Type is unknown or state is unchanged: ${ action.type }`);
    return result;
};

module.exports = loggerMiddleware;