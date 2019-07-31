const Router = require('express').Router();
const BodyParser = require('body-parser');
const Store = require('../../Redux/Store');
const DbActions = require('../../Database/Actions');
const Logger = require('../../Logger');
const { protectRoute } = require('../../Auth/Protect');

Router.patch('/move/:groupId', protectRoute('moveGroup'), BodyParser.json(), (req, res) => {
    const { newRank } = req.body;
    const groups = [...Store.getState().Data.Groups];
    groups.sort((a, b) => {
        if (a.rank > b.rank)
            return 1;
        else if (a.rank < b.rank)
            return -1;
        else
            return 0;
    });
    const index = groups.findIndex(a => a.id === parseInt(req.params.groupId));
    if (index === -1) {
        res.sendStatus(400);
        return;
    }
    const group = groups[index];
    groups.splice(index, 1);
    groups.splice(newRank, 0, group);
    const promises = [];
    for (let rank = 0; rank < groups.length; rank++)
        promises.push(DbActions.updateGroup(groups[rank].id, { rank }));
    Promise.all(promises)
        .then(() => {
            console.log(Store.getState().Data.Groups);
            res.sendStatus(200)
        })
        .catch(err => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

module.exports = Router;