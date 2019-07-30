const ExpressSession = require('express-session');
const Passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(ExpressSession.Store);
const Sequelize = require('../Database/Models').sequelize;

const Store = new SequelizeStore({
    db: Sequelize
});

module.exports.Session = ExpressSession({
    secret: 'dashkiosk_app',
    saveUninitialized: true,
    resave: false,
    store: Store
});

Store.sync();

module.exports.PassportInitialize = Passport.initialize();

module.exports.PassportSession = Passport.session();