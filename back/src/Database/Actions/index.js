const fs = require('fs');

const Actions = {};

const dirs = fs.readdirSync(`${__dirname}`).filter((fileName) => fs.lstatSync(`${__dirname}/${fileName}`).isDirectory());
for (const dir of dirs) {
    const files = fs.readdirSync(`${__dirname}/${dir}`).filter((fileName) => fileName.endsWith('.js'));
    for (const file of files) {
        const action = require(`./${dir}/${file}`);
        Actions[file.replace(/\.[^/.]+$/, "")] = action;
    }
}

module.exports = Actions;