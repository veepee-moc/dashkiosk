'use strict';

const bodyParser = require('body-parser');
const bus = require('../../bus');
const db = require('../../db');

module.exports = function(app) {
    app.get('/grouptag', (req, res, next) => {
        db.GroupTags.findAll()
            .then((tags) => res.json(tags))
            .catch((err) => next(err));
    });

    app.put('/grouptag/:groupTag', (req, res, next) => {
        db.GroupTags.findOrCreate({ name: req.params.groupTag })
            .then((obj) => {
                bus.publish(`grouptag.${obj.id}.created`, {
                    id: obj.id, name: obj.name, groups: obj.groups
                });
                res.sendStatus(200);
            })
            .catch((err) => next(err));
    });

    app.post('/grouptag/:tagId(\\d+)', bodyParser.json(), (req, res, next) => {
        db.GroupTags.find({ where: { id: req.params.tagId } })
            .then((tag) => {
                if (!tag)
                    return;
                return tag.updateAttributes({ name: req.body.name });
            })
            .then((tag) => {
                if (tag)
                    bus.publish(`grouptag.${tag.id}.updated`, {
                        id: tag.id, name: tag.name, groups: tag.groups
                    });
                res.sendStatus(200);
            })
            .catch((err) => next(err));
    });

    app.post('/grouptag/:tagId(\\d+)/group/:groupId', (req, res, next) => {
        db.GroupTags.find({ where: { id: req.params.tagId } })
            .then((tag) => {
                if (!tag)
                    return;
                var groupsId = JSON.parse(tag.groups);
                if (!groupsId)
                    groupsId = [];
                if (!groupsId.find((id) => id === req.params.groupId)) {
                    groupsId.push(req.params.groupId);
                    tag.updateAttributes({ groups: JSON.stringify(groupsId) })
                        .then(() => {
                            bus.publish(`grouptag.${tag.id}.updated`, {
                                id: tag.id, name: tag.name, groups: tag.groups
                            });
                            res.sendStatus(200);
                        })
                        .catch((err) => next(err));
                }
                else
                    res.sendStatus(200);
            })
            .catch((err) => next(err));
    });

    app.delete('/grouptag/:tagId', (req, res, next) => {
        db.GroupTags.find({ where: { id: req.params.tagId } })
            .then((tag) => {
                tag.destroy();
                bus.publish(`grouptag.${tag.id}.deleted`, {
                    id: tag.id, name: tag.name, groups: tag.groups
                });
                res.sendStatus(200);
            })
            .catch((err) => next(err));
    });
};
