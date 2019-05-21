'use strict';

var http     = require('http'),
    socketio = require('socket.io'),
    logger   = require('./lib/logger'),
    config   = require('./lib/config'),
    chromecast = require('./lib/chromecast'),
    cors = require('cors'),
    express = require('express'),
    path = require('path');

var app = require('./lib/express'),
    server = http.createServer(app),
    io = socketio.listen(server, {
      logger: logger
    });

// Cors
app.use(cors());

// Static files
app.get('/', function(req, res) { res.redirect('/receiver'); });
app.get('/firefox', function(req, res) { res.redirect('/receiver'); });

// API
var api = require('./lib/api');
api.socketio(io);
api.rest(app);

// DB
var db = require('./lib/db'),
    models = require('./lib/models');
db
  .initialize()
  .then(function() { return models.Group.run(); })
  .catch(function(err) {
    if (err instanceof Array) {
      throw err[0];
    }
    throw err;
  })
  .then(function() {
      if (config.get('chromecast:enabled')) {
      chromecast();
    }
    server.listen(config.get('port'), function() {
      logger.info('Express server listening on port %d in %s mode',
                  config.get('port'),
                  config.get('environment'));
    });
  })
  .catch(function(err) {
    logger.exception('fatal error', err);
    process.exit(1);
  });

// Demo: halt after the given number of minutes
if (config.get('demo')) {
  var end = ((config.get('demo') * 1) || 60);
  logger.info('Demo mode enabled, will stop in ' + end + ' minutes');
  setTimeout(function() {
    logger.info('End of demo mode, quitting');
    process.exit(5);
  }, end * 60 * 1000);
}

// React Routing
if (app.get('env') !== 'development') {
  app.use(express.static(path.join(__dirname, './front')));
  app.get('/*', (req, res) => {
    if (!res.headersSent)
      res.sendFile(path.join(__dirname, './front', 'index.html'));
  });
}

module.exports = app;
