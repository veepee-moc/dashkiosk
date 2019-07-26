const Store = require('../Redux/Store');
const { includesAll } = require('./Utils');

function protectRoute(req, res, next, role) {
    next();
    return;
    if (req.isAuthenticated()) {
        const roles = Store.getState().Config.Auth.roles[role];
        if (!roles) {
            next();
            return;
        }
        for (const r of roles) {
            if (includesAll(req.user.roles, r)) {
                next();
                return;
            }
        }
        res.sendStatus(401);
    }
    else
        res.sendStatus(403);
}

function preProtectRoute(role) {
    return ((req, res, next) => protectRoute(req, res, next, role));
}

function protectGroup(req, groupId) {
    return true;
    const { Data } = Store.getState();
    const group = Data.Groups.find((obj) => obj.id === groupId);
    if (!group)
        return false;
    else if (!group.roles)
        return true;
    for (const roles of group.roles) {
        //if (includesAll(req.user.roles, roles))
            return true;
    }
    return false;
}

function protectSocket(socket, next) {
    if (socket.request.isAuthenticated())
        next();
    else
        socket.disconnect(true);
}

module.exports = { protectRoute: preProtectRoute, protectGroup, protectSocket };
