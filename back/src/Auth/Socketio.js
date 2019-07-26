const { Session, PassportInitialize, PassportSession } = require('./Middleware');

module.exports = (io) => {
    io.use((socket, next) => Session(socket.request, {}, next))
        .use((socket, next) => PassportInitialize(socket.request, {}, next))
        .use((socket, next) => PassportSession(socket.request, {}, next));
};