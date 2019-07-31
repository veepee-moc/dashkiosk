const ExpressSession = require('express-session');
const Passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(ExpressSession.Store);
const Sequelize = require('../Database/Models').sequelize;
const Store = require('../Redux/Store');

const sequelizeStore = new SequelizeStore({
    db: Sequelize
});

module.exports.Session = ExpressSession({
    secret: Store.getState().Config.Server.secret,
    saveUninitialized: true,
    resave: false,
    store: sequelizeStore
});

sequelizeStore.sync();

module.exports.PassportInitialize = Passport.initialize();

module.exports.PassportSession = Passport.session();