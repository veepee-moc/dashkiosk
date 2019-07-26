const Router = require('express').Router();
const BodyParser = require('body-parser');
const DbActions = require('../../Database/Actions');
const Logger = require('../../Logger');
const { protectRoute } = require('../../Auth/Protect');

Router.get('/saved', protectRoute('savedDashboard'), (req , res) => {
    DbActions.getAllSavedDashboards()
        .then((data) => res.json(data))
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500)
        });
});

Router.post('/saved', protectRoute('savedDashboard'), BodyParser.json(), (req, res) => {
    DbActions.newSavedDashboard(req.body)
        .then((data) => res.status(201).json(data))
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

Router.delete('/saved/:id', protectRoute('savedDashboard'), (req, res) => {
    DbActions.deleteSavedDashboard(req.params.id)
        .then(() => res.sendStatus(204))
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

module.exports = Router;