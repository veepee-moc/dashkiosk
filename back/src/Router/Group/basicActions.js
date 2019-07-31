const Router = require('express').Router();
const BodyParser = require('body-parser');
const Store = require('../../Redux/Store');
const DbAction = require('../../Database/Actions');
const Logger = require('../../Logger');
const { protectGroup } = require('../../Auth/Protect');

function basicCheck(req, res, next) {
    const { Data } = Store.getState();
    req.params.groupId = parseInt(req.params.groupId);
    const group = Data.Groups.find((obj) => obj.id === req.params.groupId);
    if (!group)
        res.sendStatus(400);
    else if (!protectGroup(req, group.id))
        res.sendStatus(401);
    else {
        req.dk = { group };
        next();
    }
}

Router.get('/', (req, res) => {
    const { Groups } = Store.getState().Data;
    const allowedGroups = Groups.filter((obj) => protectGroup(req, obj.id));
    res.json(allowedGroups);
})

Router.get('/:groupId(\\d+)', basicCheck, (req, res) => {
    res.json(req.dk.group);
});

Router.post('/', (req, res) => {
    DbAction.newGroup()
        .then((newGroup) => {
            res.status(201).json(newGroup);
        })
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

Router.patch('/:groupId(\\d+)', basicCheck, BodyParser.json(), (req, res) => {
    DbAction.updateGroup(req.params.groupId, req.body)
        .then((updatedGroup) => {
            res.json(updatedGroup);
        })
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

Router.delete('/:groupId(\\d+)', basicCheck, (req, res) => {
    if (req.params.groupId === 1)
        res.status(403).send('Deleting Unassigned group is forbidden');
    else
        DbAction.deleteGroup(req.params.groupId)
            .then(() => {
                res.sendStatus(204);
            })
            .catch((err) => {
                Logger.error(err);
                res.sendStatus(500);
            });
})

module.exports = Router;