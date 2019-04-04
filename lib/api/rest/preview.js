'use strict';

const models = require('../../models'),
      scs = require('../scs'),
      bodyParser = require('body-parser');

module.exports = function(app) {
    app.post('/preview/group/:group', bodyParser.json(), (req, res, next) => {
        const name = JSON.parse(scs.decode(req.body.blob)).name;
        models.Display.get(name)
            .then((display) => models.Group.get(req.params.group)
                .then((group) => display.setGroup(group)))
            .then((display) => res.send(display.toJSON()))
            .catch((err) => next(err));
    });
};
