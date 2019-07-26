let io = null;

module.exports = (http) => {
    if (!io) {
        io = require('socket.io')(http);
    }
    const Admin = require('./Admin')(io);
    return io;
};
