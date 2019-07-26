const db = require('../../Models');
const { removeTime } = require('../Utils');

module.exports = (dashboard) => {
    return new Promise((resolve, reject) => {
        db.SavedDashboards.create(dashboard)
            .then((data) => {
                const savedDashboard = Object.assign({}, data.dataValues);
                removeTime(savedDashboard);
                resolve(savedDashboard);
            })
            .catch((err) => reject(err));
    });
};