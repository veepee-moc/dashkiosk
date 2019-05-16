'use strict';

const Config = require('../../config');

module.exports = function(app) {
    app.get('/keycloak', (req, res) => {
        if (Config.get('authKeycloak:enabled'))
            res.json({ logout: Config.get('authKeycloak:middleware:logout') });
        else
            res.sendStatus(204);
    });
};
