'use strict';

const db = require('../../db');

module.exports = function(app) {
    app.get('/history/:page/limit/:limit', (req, res, next) => {
        const limit = parseInt(req.params.limit);
        const page = parseInt(req.params.page) - 1;
        db.History.findAll({ order: 'createdAt DESC', offset: page * limit, limit: limit })
            .then((logs) => {
                res.json(logs);
            })
            .catch((err) => next(err));
    });

    app.get('/history/count', (req, res, next) => {
        db.History.count()
            .then((c) => {
                res.json({ count: c });
            })
            .catch((err) => next(err));
    });
};