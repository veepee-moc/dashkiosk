'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Umzug = require('umzug');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../Config/config.json')[env];
const logger = require('../../Logger');
const Store = require('../../Redux/Store');
const { action, Types } = require('../../Redux/Actions');
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize
    },
    migrations: {
        params: [
            sequelize.getQueryInterface(),
            Sequelize
        ],
        path: __dirname + '/../Migrations/',
        pattern: /\.js$/
    }
});

function initialize() {
    return new Promise((resolve, reject) => {
        const payload = {};
        umzug.pending().then((migrations) => {
            migrations = migrations.map(function (migration) {
                return migration.file.replace(/\.js$/, '');
            });
            umzug.execute({
                migrations: migrations,
                method: 'up'
            }).then((migrations) => {
                migrations.forEach((migration) => {
                    logger.info(`Migration ${migration.file} executed`);
                });
                return db.Groups.findOrCreate({
                    where: { id: 1 },
                    defaults: { name: 'Unassigned', description: 'Default group for unassigned displays', rank: 0 }
                });
            }).then(([group, created]) => {
                return db.Dashboards.findOrCreate({
                    where: { url: '/unassigned', GroupId: 1 },
                    defaults: { rank: 0, url: '/unassigned', description: 'Dashboards for unassigned display', GroupId: 1 }
                });
            }).then(([dashboard, created]) => {
                return db.Groups.findAll();
            }).then((data) => {
                payload.Groups = {
                    model: data,
                    modelName: 'Groups'
                };
                return db.Dashboards.findAll();
            }).then((data) => {
                payload.Dashboards = {
                    model: data,
                    modelName: 'Dashboards'
                };
                return db.Displays.findAll();
            }).then((data) => {
                payload.Displays = {
                    model: data,
                    modelName: 'Displays'
                };
                return db.MultiDashboards.findAll();
            }).then((data) => {
                payload.MultiDashboards = {
                    model: data,
                    modelName: 'MultiDashboards'
                };
                return db.GroupTags.findAll();
            }).then((data) => {
                payload.GroupTags = {
                    model: data,
                    modelName: 'GroupTags'
                };
                Store.dispatch(action(Types.LoadModel, payload));
                resolve();
                return;
            });
        })
        .catch((err) => {
            logger.error(err);
            reject(err);
        });
    });
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.initialize = initialize;

module.exports = db;
