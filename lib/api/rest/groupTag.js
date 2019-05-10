'use strict';

const db = require('../../db');

module.exports = function(app) {
    app.put('/grouptag/:groupTag', (req, res, next) => {
        db.GroupTags.findOrCreate({ name: req.params.groupTag })
            .then(() => res.sendStatus(200))
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
                    return tag.updateAttributes({ groups: JSON.stringify(groupsId) });
                }
            })
            .then(() => res.sendStatus(200))
            .catch((err) => next(err));
    });
};
