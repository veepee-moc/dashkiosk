const fs = require('fs');
const Router = require('express').Router();
const BodyParser = require('body-parser');
const Pug = require('pug');
const Logger = require('../../Logger');
const DbActions = require('../../Database/Actions');
const Store = require('../../Redux/Store');
const { protectRoute } = require('../../Auth/Protect');

let Templates = [];
function loadTemplates() {
    const tempTemplates = [];
    try {
        fs.readdirSync('./templates')
            .filter((file) => fs.lstatSync(`./templates/${file}`).isDirectory())
            .forEach((dir) => tempTemplates.push(JSON.parse(fs.readFileSync(`./templates/${dir}/data.json`))));
        Templates = tempTemplates;
    }
    catch (err) {
        Logger.error(err);
    }
}
loadTemplates();

Router.get('/templates', protectRoute('multiDashboard'), (req, res) => {
    res.json(Templates.map((obj) => Object.assign({}, { name: obj.name, url: obj.url })));
});

Router.get('/:multId(\\d+)/info', protectRoute('multiDashboard'), (req, res) => {
    const { Data } = Store.getState();
    const multiDashboard = Data.MultiDashboards.find((obj) => obj.id === parseInt(req.params.multId));
    if (!multiDashboard)
        res.sendStatus(400);
    else
        res.json(multiDashboard);
});

Router.post('/', protectRoute('multiDashboard'), BodyParser.json(), (req, res) => {
    DbActions.newMultiDashboard(req.body.urls, req.body.template.name)
        .then((data) => res.status(201).json({ url: `/api/multidashboard/${data.id}` }))
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

Router.patch('/:multId(\\d+)', protectRoute('multiDashboard'), (req, res) => {
    DbActions.updateMultiDashboard(parseInt(req.params.multId), req.body.urls)
        .then((data) => res.json(data))
        .catch((err) => {
            Logger.error(err);
            res.sendStatus(500);
        });
});

Router.get('/:multId(\\d+)', (req, res) => {
    const { Data } = Store.getState();
    const multiDashboard = Data.MultiDashboards.find((obj) => obj.id === parseInt(req.params.multId));
    if (!multiDashboard)
        res.sendStatus(400);
    else {
        const template = Templates.find((obj) => obj.name === multiDashboard.template);
        if (!template)
            res.sendStatus(400);
        else {
            const compiledFile = Pug.compileFile(`./templates/${template.path}`);
            res.send(compiledFile({
                url: multiDashboard.urls
            }));
        }
    }
});

Router.get('/templates/reload', protectRoute('multiDashboard'), (req, res) => {
    loadTemplates();
    res.sendStatus(200);
});

module.exports = Router;