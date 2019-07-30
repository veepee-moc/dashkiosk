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
        app.get('/login', (req, res, next) => {
            res.send(
                '<form method="POST" action="/login">'+
                    '<input type="text" name="username" placeholder="Username"/>'+
                    '<input type="password" name="password" placeholder="Password"/>'+
                    '<button type="submit">Login</button>'+
                '</form>'
            );
        });
        app.post('/login', Passport.authenticate('local'), (req, res, next) => {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
                res.sendStatus(200);
            else
                res.redirect('/admin');
        });
        app.get('/logout', (req, res, next) => {
            req.logOut();
            res.sendStatus(200);
            next();
        });
    }
};