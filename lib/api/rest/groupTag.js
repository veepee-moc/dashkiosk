'use strict';

const bus = require('../../bus');
const db = require('../../db');

module.exports = function(app) {
    app.put('/grouptag/:groupTag', (req, res, next) => {
        db.GroupTags.findOrCreate({ name: req.params.groupTag })
            .then((obj) => {
                bus.publish(`grouptag.${obj.name}.created`, Object.assign({},
                    { id: obj.id, name: obj.name, groups: obj.groups }
                ));
                res.sendStatus(200);
            })
            .catch((err) => next(err));
    });

    app.post('/grouptag/:groupTag/group/:groupId', (req, res, next) => {
        db.GroupTags.find({ where: { name: req.params.groupTag } })
            .then((tag) => {
                var groupsId = JSON.parse(tag.groups);
                if (!groupsId)
                    groupsId = [];
                if (!groupsId.find((id) => id === req.params.groupId)) {
                    groupsId.push(req.params.groupId);
                    tag.updateAttributes({ groups: JSON.stringify(groupsId) })
                        .then(() => {
                            bus.publish(`grouptag.${tag.name}.updated`, Object.assign({},
                                { id: tag.id, name: tag.name, groups: tag.groups }
                            ));
                            res.sendStatus(200);
                        })
                        .catch((err) => next(err));
                }
                else
                    res.sendStatus(200);
            })
            .catch((err) => next(err));
    });

    app.delete('/grouptag/:groupTag', (req, res, next) => {
        db.GroupTags.find({ where: { name: req.params.groupTag } })
            .then((tag) => {
                tag.destroy();
                bus.publish(`grouptag.${tag.name}.deleted`, Object.assign({},
                    { id: tag.id, name: tag.name, groups: tag.groups }
                ));
                res.sendStatus(200);
            })
            .catch((err) => next(err));
    });
};
