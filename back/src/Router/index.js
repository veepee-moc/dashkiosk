const fs = require('fs');
const Router = require('express').Router();
const db = require('../Database/Models');
const prometheus = require('../Prometheus');
const Store = require('../Redux/Store');

Router.use((req, res, next) => {
    if (req.method !== 'GET') {
      const data = {
        refererUrl: req.headers.referer,
        originalUrl: req.originalUrl,
        originalMethod: req.method,
        params: JSON.stringify(req.params),
        query: JSON.stringify(req.query),
        body: JSON.stringify(req.body),
        email: null //TODO
      };
      db.History.create(data).catch((err) => console.log(err));
    }
    next();
});

Router.get('/metrics', prometheus.metrics);
prometheus.regenMetrics(Store.getState());

const dirs = fs.readdirSync(__dirname).filter((fileName) => fs.lstatSync(`${__dirname}/${fileName}`).isDirectory());
for (const directory of dirs) {
    const r = require(`./${directory}`);
    Router.use('/api', r);
}

module.exports = Router;