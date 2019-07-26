const LocalStrategy = require('passport-local').Strategy;

module.exports = {
    name: 'Local',
    do(app, Passport) {
        Passport.use(new LocalStrategy((username, password, done) => {
            if (username === 'root' && password === 'root')
                return done(null, username);
            else
                return done(null, false, { message: 'Incorrect username or password.' });
        }));
        Passport.serializeUser((data, done) => {
            done(null, data);
        });
        Passport.deserializeUser((user, done) => {
            done(null, { roles: ['admin'] });
        });
        app.post('/login', Passport.authenticate('local'), (req, res, next) => {
            res.sendStatus(200);
            next();
        });
        app.get('/logout', (req, res, next) => {
            req.logOut();
            res.sendStatus(200);
            next();
        });
    }
};