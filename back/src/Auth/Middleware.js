const ExpressSession = require('express-session');
const Passport = require('passport');

module.exports.Session = ExpressSession({
    secret: 'dashkiosk',
    saveUninitialized: true,
    resave: false
});

module.exports.PassportInitialize = Passport.initialize();

module.exports.PassportSession = Passport.session();