'use strict';

const fs = require('fs');
const bodyParser = require('body-parser');
const PUG = require('pug');
const db = require('../../db');

const Templates = [];
fs.readdirSync('./templates')
    .filter((file) => fs.lstatSync(`./templates/${file}`).isDirectory())
    .forEach((dir) => Templates.push(JSON.parse(fs.readFileSync(`./templates/${dir}/data.json`))));

module.exports = function(app) {
    app.get('/multi-dashboards', (req, res, next) => {
        res.json(Templates.map((obj) => Object.assign({}, { name: obj.name, url: obj.url })));
    });

    app.get('/multi-dashboards/:multId', (req, res, next) => {
        db.MultiDashboards.find({ where: { id: req.params.multId } })
            .then(multiDashboards => {
                if (!multiDashboards)
                    throw new Error(`No MultiDashboard with id : ${req.params.multId}`);
                const template = Templates.find(obj => obj.name === multiDashboards.template);
                if (!template)
                    throw new Error(`No template with name : ${multiDashboards.template}`);
                const compiledFile = PUG.compileFile(`./templates/${template.path}`);
                res.send(compiledFile({
                    url: JSON.parse(multiDashboards.urls)
                }));
            })
            .catch( err => next(err) );
    });

    app.post('/multi-dashboards', bodyParser.json(), (req, res, next) => {
        db.MultiDashboards.create({
            urls: JSON.stringify(req.body.urls),
            template: req.body.template.name
        }).then(multiDashboards => {
            res.json({
                url: `/api/multi-dashboards/${multiDashboards.values.id}`
            });
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    });

    app.get('/multi-dashboards/:multId(\\d+)/info', (req, res, next) => {
        db.MultiDashboards.find({ where: { id: req.params.multId } })
            .then(multiDashboard => {
                if (!multiDashboard)
                    return res.sendStatus(204);
                res.json({
                    id: multiDashboard.id,
                    urls: multiDashboard.urls,
                    template: multiDashboard.template
                });
            })
            .catch(err => next(err));
    });
};
