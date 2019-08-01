const Router = require('express').Router();
const BodyParser = require('body-parser');
const { protectRoute, protectGroup } = require('../../Auth/Protect');
const Store = require('../../Redux/Store');
const { Types, action } = require('../../Redux/Actions');

Router.post('/broadcast', protectRoute('broadcast'), BodyParser.json(), (req, res, next) => {
    for (const groupId of req.body.groups)
        if (!protectGroup(req, groupId)) {
            res.sendStatus(403);
            return;
        }
    for (const groupId of req.body.groups)
        Store.dispatch(action(Types.NewBroadcast, Object.assign({}, req.body.dashboard, { groupId, broadcast: true })));
    res.sendStatus(200);
});

module.exports = Router;