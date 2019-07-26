// [socket.id][socket]
const socketList = new Map();
module.exports.socketList = socketList;

// Match at least a set of role with multipl sets of role
function matchRole (userRoles, recipientRole) {
    for (roleSet of recipientRole) {
        let matched = true;
        for (role of roleSet) {
            if (userRoles.indexOf(role) === -1) {
                matched = false;
                break;
            }
        }
        if (matched) {
            return true;
        }
    }
    return false;
}

// Send a message to all socket that match the given roles
module.exports.sendActionToRole = (io, action, payload, roles) => {
    console.log(roles);
    if (!roles || roles.length === 0) {
        console.log(`Emit to all client ${ action }`);
        io.emit(action, payload);
        return;
    }
    for (const [socketId, socket] of socketList) {
        if (matchRole(socket.request.user.roles, roles)) {
            io.to(`${socketId}`).emit(action, payload);
        }
    }
};
