const fs = require('fs');
const Store = require('../Redux/Store');
const { action, Types } = require('../Redux/Actions');
const Logger = require('../Logger');

/**
 * Create or load configuration
 * @param {String} path Path to config
 * @returns {Object} Redux Store
 */
module.exports = (path) => {
    try {
        if (fs.existsSync(`${path}/config.json`))
            Store.dispatch(action(Types.SetConfigState, JSON.parse(fs.readFileSync(`${path}/config.json`))));
        else
            Logger.info("Configuration does not exist, using default configuration");
    } catch (err) {
        Logger.error(err);
    }
    return Store;
}