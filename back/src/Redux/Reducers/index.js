const { combineReducers } = require('redux');
const fs = require('fs');

const Reducers = {};
const directories = fs.readdirSync(__dirname)
    .filter(fileName => fs.lstatSync(`${__dirname}/${fileName}`).isDirectory());
for (const directory of directories)
    Reducers[directory] = require(`./${directory}`);

module.exports = combineReducers(Reducers);