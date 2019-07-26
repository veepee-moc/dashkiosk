const winston = require('winston');
const EventEmitter = require('../EventEmitter');
const { Types } = require('../Redux/Actions');
var logger;

var transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.prettyPrint()
        ),
        level: 'info',
        name: 'Console'
    })
];

logger = winston.createLogger({
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
                format: winston.format.combine(
                    winston.format.timestamp()
                ),
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

module.exports = logger;