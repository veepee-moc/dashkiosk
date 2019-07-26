const { createStore, applyMiddleware } = require('redux');
const reducer = require('./Reducers');
const eventMiddleware = require('./Middlewares/Event');
const loggerMiddleware = require('./Middlewares/Logger');

const Store = createStore(reducer, applyMiddleware(eventMiddleware, loggerMiddleware));

module.exports = Store;