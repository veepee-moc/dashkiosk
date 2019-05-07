'use strict';

var express  = require('express'),
    expressStatic = require('serve-static'),
    expressErrorHandler = require('errorhandler'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    auth = require('http-auth'),
    Keycloak = require('keycloak-connect'),
    path = require('path'),
    logger   = require('./logger'),
    config   = require('./config')

var app = module.exports = express();

// Configuration of Express.js
if (app.get('env') === 'development') {
  /*app.use(require('connect-livereload')({
    port: process.env.LIVERELOAD_PORT
  }));*/
}

if (config.get('forcessl')) {
  var forceSsl = function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
  return next();
  };
  app.use(forceSsl);
}

// Logging
logger.express.access(app);
logger.express.error(app);

// Authentication
if (config.get('auth:enabled')) {
  var basic = auth.basic({
    realm: config.get('auth:realm')
  }, function (username, password, callback) {
    // Custom authentication method.
    callback(username === config.get('auth:username') &&
             password === config.get('auth:password'));
  });
  app.use(auth.connect(basic));
}
else if (config.get('authKeycloak:enabled')) {
  const memoryStore = new expressSession.MemoryStore();
  const keycloak = new Keycloak({ store: memoryStore }, config.get('authKeycloak:config'));
  app.use(expressSession({
    secret: config.get('authKeycloak:sessionSecret'),
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));
  app.use(keycloak.middleware(config.get('authKeycloak:middleware')));
  for (const protect of config.get('authKeycloak:protects'))
    app.use(protect.endpoint, keycloak.protect(protect.role));
}

// Other files are static

app.use(expressStatic(config.get('path:static'), { extensions: ['html'] }));
app.use(methodOverride());

if (app.get('env') === 'development') {
  app.set('view cache', false);
  app.use(expressErrorHandler());
}