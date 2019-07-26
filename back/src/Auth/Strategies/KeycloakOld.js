const Passport = require('passport');
const Strategy = require('passport-openidconnect').Strategy;

const keycloakURL = "https://ssoco.preprod.platform.vpgrp.net/auth";
const realm = "vpgrp";
const kcRealmURL = keycloakURL + '/realms/' + realm + '/protocol/openid-connect';

module.exports = {
    name: 'KeycloakOld',
    strategy: 'openidconnect',
    protectRedirect: '/login',
    successRedirect: '/',
    failedRedirect: '/',
    loginPage: '/login',
    loginMethod: 'get',
    do() {
        Passport.use(new Strategy({
            issuer: "https://ssoco.preprod.platform.vpgrp.net/auth",
            clientID: '',
            clientSecret: '',
            authorizationURL: kcRealmURL + '/auth',
            tokenURL: kcRealmURL + '/token',
            userInfoURL: kcRealmURL + '/userinfo',
            callbackURL: 'http://localhost:8080/'
        }, (token, tokenSecret, profile, done) => {
            return done(null, profile);
        }));
    }
};