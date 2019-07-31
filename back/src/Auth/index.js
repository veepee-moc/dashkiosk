/**
 * Imports
 */
const fs = require('fs');
const Passport = require('passport');
const BodyParser = require('body-parser');
const logger = require('../Logger');
const { Session, PassportInitialize, PassportSession } = require('./Middleware');

/**
 * Global Variables
 */
const Strategies = [];

/**
 * Load passport strategies from Strategies folder
 */
const files = fs.readdirSync(`${__dirname}/Strategies`).filter((fileName) => fileName.endsWith('.js'));
for (const fileName of files) {
    const strategy = require(`./Strategies/${fileName}`);
    Strategies.push(strategy);
}

/**
 * Set passport with a loaded strategy
 * @param {string} strategyName Strategy's name
 */
function setPassportStrategy(app, strategyName) {
    for (const strategy of Strategies) {
        if (strategy.name === strategyName) {
            strategy.do(app, Passport);
            logger.info(`${strategyName} passport strategy loaded.`);
            return;
        }
    }
    logger.error(`${strategyName} passport strategy doesn't exist.`);
}

/**
 * Init passport and load specified strategy
 * @param {Object} app Express app
 * @param {string} strategy Strategy's name
 */
module.exports = (app, strategy) => {
    app.use(Session);
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(PassportInitialize);
    app.use(PassportSession);
    setPassportStrategy(app, strategy);
    app.head('/isauth', (req, res) => {
        if (req.isAuthenticated())
            res.sendStatus(204);
        else
            res.sendStatus(403);
    });
    return (Passport);
};