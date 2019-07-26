const Router = require('express').Router();
const db = require('../../Database/Models');
const Logger = require('../../Logger');
const { protectRoute } = require('../../Auth/Protect');

Router.get('/:page/limit/:limit', protectRoute('history'), (req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page) - 1;
    db.History.findAll({ order: [['createdAt', 'DESC']], offset: page * limit, limit: limit })
        .then((logs) => {
            res.json(logs);
        })
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

Router.get('/count', protectRoute('history'), (req, res) => {
    db.History.count()
        .then((c) => {
            res.json({ count: c });
        })
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

module.exports = Router;