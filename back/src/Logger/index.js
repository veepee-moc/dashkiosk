const winston = require('winston');
const EventEmitter = require('../EventEmitter');
const { Types } = require('../Redux/Actions');

const printFormat = winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}${ info.stack ? ' - ' + info.stack : ''}`);
var logger;

var transports = [
    new winston.transports.Console({
        level: 'info',
        name: 'Console'
    })
];

logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.errors({ stack: true }),
        printFormat
    ),
    transports: transports
});

EventEmitter.on(Types.SetConfigState, (type, prevState, state, payload) => {
    if (prevState === state) {
        return;
    }
    const log = state.Config.Log;
    if (log.file) {
        if (!logger.transports.File) {
            logger.add(new winston.transports.File({
                level: log.level,
                filename: log.file,
                name: 'File'
            }))
        }
        [File] = logger.transports;
        File.level = log.level;
    }
    [Console] = logger.transports;
    Console.level = log.level;
});
logger.printFormat = printFormat;
module.exports = logger;