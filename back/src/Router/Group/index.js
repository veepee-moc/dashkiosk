const fs = require('fs');
const Router = require('express').Router();
const { protectRoute } = require('../../Auth/Protect');

const files = fs.readdirSync(__dirname).filter((fileName) => fileName !== 'index.js' && fileName.endsWith('.js'));
for (const file of files) {
    const r = require(`./${file}`);
    Router.use('/group', protectRoute('group'), r);
}

module.exports = Router;