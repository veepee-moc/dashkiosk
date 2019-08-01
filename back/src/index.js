const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const expressWinston = require('express-winston');
const winston = require('winston');
const Logger = require('./Logger');
require('./Configuration')(`${__dirname}/..`);
const Router = require('./Router');
const db = require('./Database/Models/index');
const Store = require('./Redux/Store');
require('./Auth')(app, Store.getState().Config.Auth.strategy);
const io = require('./Socket.io')(http);
const DisplayManager = require('./DisplayManager');

const dm = DisplayManager(io);

db.initialize().then(() => dm.initRollovers());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.errors({ stack: true }),
        Logger.printFormat
    ),
    level: Store.getState().Config.Log.level
}));

app.use(Router);

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(__dirname, '../front')));
    app.get(['/', '/receiver', '/admin', '/history'], (req, res) => {
        res.sendFile(path.join(__dirname, '../front', 'index.html'));
    });
}

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.errors({ stack: true }),
        Logger.printFormat
    ),
    level: Store.getState().Config.Log.level
}));

const server = http.listen(Store.getState().Config.Server.port, () => Logger.info(`Server listening on port ${server.address().port}.`));
