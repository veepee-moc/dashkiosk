'use strict';

const fs = require('fs');
const bodyParser = require('body-parser');
const PUG = require('pug');

const Templates = [];
fs.readdirSync('./templates')
    .filter((file) => fs.lstatSync(`./templates/${file}`).isDirectory())
    .forEach((dir) => Templates.push(JSON.parse(fs.readFileSync(`./templates/${dir}/data.json`))));

module.exports = function(app) {
    app.get('/multi-dashboards', (req, res, next) => {
        res.json(Templates.map((obj) => Object.assign({}, { name: obj.name, url: obj.url })));
        next();
    });

    app.get('/multi-dashboards/:multId', (req, res, next) => {
        const compiledFile = PUG.compileFile('./templates/4Grid/template.pug')
        res.send(compiledFile({
            url: [
                'https://www.youtube.com/embed/AufydOsiD6M',
                'https://www.youtube.com/embed/AufydOsiD6M',
                'https://www.youtube.com/embed/AufydOsiD6M',
                'https://www.youtube.com/embed/AufydOsiD6M'
            ]
        }));
        next();
    });

    app.post('/multi-dashboards', bodyParser.json(), (req, res, next) => {
        res.sendStatus(500);
        next();
    });
};
