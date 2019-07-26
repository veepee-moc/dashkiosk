const Router = require('express').Router();
const BodyParser = require('body-parser');
const Store = require('../../Redux/Store');
const DbAction = require('../../Database/Actions');
const Logger = require('../../Logger');
const { protectGroup } = require('../../Auth/Protect');

function basicCheck(req, res, next) {
    const { Data } = Store.getState();
    req.params.displayId = parseInt(req.params.displayId);
    const display = Data.Displays.find((obj) => obj.id === req.params.displayId);
    if (!display)
        res.sendStatus(400);
    else if (!protectGroup(req, display.groupId))
        res.sendStatus(401);
    else {
        next();
    }
}

Router.patch('/:displayId(\\d+)', basicCheck, BodyParser.json(), (req, res) => {
    console.log('MY BODY:');
    console.log(req.body);
    DbAction.updateDisplay(req.params.displayId, req.body)
        .then((updatedDisplay) => {
            res.json(updatedDisplay);
        })
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

Router.delete('/:displayId(\\d+)', basicCheck, (req, res) => {
    DbAction.deleteDisplay(req.params.displayId)
        .then(() => {
            res.sendStatus(204);
        })
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

module.exports = Router;