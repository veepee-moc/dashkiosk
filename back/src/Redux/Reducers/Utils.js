const fs = require('fs');

function loadReducers(dirname) {
    const reducers = {};
    const directories = fs.readdirSync(`${dirname}`).filter((fileName) => fs.lstatSync(`${dirname}/${fileName}`).isDirectory());
    for (const directory of directories)
        reducers[directory] = require(`${dirname}/${directory}`);
    return reducers;
}

function loadReducerActions(dirname) {
    const actions = [];
    const files = fs.readdirSync(`${dirname}/Actions`).filter((fileName) => fileName.endsWith('.js'));
    for (const fileName of files) {
        const action = require(`${dirname}/Actions/${fileName}`);
        actions.push(action);
    }
    return actions;
}

module.exports = { loadReducers, loadReducerActions };