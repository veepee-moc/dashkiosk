const { Config } = require('../../Redux/Store').getState();
const Strategy = require('passport-openidconnect').Strategy;

module.exports = {
    name: 'Keycloak',
    do(app, Passport) {
        const kcRealmUrl = Config.Auth.keycloak.issuer + "/realms/" + Config.Auth.keycloak.realm + "/protocol/openid-connect";
        Passport.use(new Strategy({
                issuer: Config.Auth.keycloak.issuer + "/realms/" + Config.Auth.keycloak.realm,
                authorizationURL: kcRealmUrl + '/auth',
                tokenURL: kcRealmUrl + '/token',
                userInfoURL: kcRealmUrl + '/userinfo',
                clientID: Config.Auth.keycloak.clientId,
                clientSecret: Config.Auth.keycloak.secret,
                callbackURL: "http://localhost:3000/login/callback"
            }, (token, tokenSecret, profile, done) => {
                return done(null, profile);
            }));
        Passport.serializeUser((data, done) => {
            done(null, data);
        });
        Passport.deserializeUser((user, done) => {
            done(null, { roles: ['admin'] });
        });
        app.get('/login', Passport.authenticate('openidconnect'), (req, res, next) => {
            res.sendStatus(200);
        });
        app.get('/login/callback', Passport.authenticate('openidconnect'), (req, res, next) => {
            res.redirect('/admin');
        });
        app.get('/logout', (req, res, next) => {
            req.logOut();
            res.sendStatus(200);
            next();
        });
    }
};