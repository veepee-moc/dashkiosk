'use strict';

const models = require('../../models'),
      scs = require('../scs'),
      bodyParser = require('body-parser');

module.exports = function(app) {
    app.post('/preview/group/:group', bodyParser.json(), (req, res, next) => {
        const name = JSON.parse(scs.decode(req.body.blob)).name;
        models.Display.get(name)
            .then(function(display) {
                return models.Group.get(req.params.group)
                    .then(function(group) { return display.setGroup(group); });
            })
            .then(function(display) { return res.send(display.toJSON()); })
            .catch(function(err) { next(err); });
    });
};
