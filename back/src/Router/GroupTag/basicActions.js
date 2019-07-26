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

/**
 * Get all groupTags
 */
Router.get('/', (req, res) => {
    const { GroupTags } = Store.getState().Data;
    const groupTags = Object.assign({}, GroupTags);
    for (const tag of groupTags)
        tag.groups = JSON.parse(tag.groups);
    res.json(groupTags);
})

/**
 * Create a groupTag
 */
Router.put('/:groupTag', (req, res) => {
    DbAction.newGroupTag(req.params.groupTag)
        .then((createdTag) => {
            if (!createdTag)
                res.sendStatus(204);
            else
                res.json(createdTag);
        })
        .catch((err) => {
            Logger.error(err);
            res.status(500);
        });
});

/**
 * Modify a groupTag (name, color...)
 */
Router.patch('/:tagId(\\d+)', BodyParser.json(), (req, res) => {
    DbAction.updateGroupTag(parseInt(req.params.tagId), req.body)
        .then((updatedGroupTag) => {
            res.json(updatedGroupTag);
        })
        .catch((err) => {
            Logger.error(err);
            res.status(500);
        });
});

/**
 * Add a group to a groupTag
 */
Router.post('/:tagId(\\d+)/group/:groupId(\\d+)', basicCheck, (req, res) => {
    DbAction.addGroupToTag(parseInt(req.params.tagId), req.params.groupId)
        .then((updatedGroupTag) => {
            if (!updatedGroupTag)
                res.sendStatus(204);
            else
                res.json(updatedGroupTag);
        })
        .catch((err) => {
            Logger.error(err);
            res.status(500);
        });
});

/**
 * Delete a group from a groupTag
 */
Router.delete('/:tagId(\\d+)/group/:groupId(\\d+)', basicCheck, (req, res) => {
    DbAction.deleteGroupFromTag(parseInt(req.params.tagId), req.params.groupId)
        .then((updatedGroupTag) => {
            if (!updatedGroupTag)
                res.sendStatus(204);
            else
                res.json(updatedGroupTag);
        })
        .catch((err) => {
            Logger.error(err);
            res.status(500);
        });
});

/**
 * Delete a groupTag
 */
Router.delete('/:tagId', (req, res) => {
    DbAction.deleteGroupTag(parseInt(req.params.tagId))
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            Logger.error(err);
            res.status(500);
        });
});

module.exports = Router;