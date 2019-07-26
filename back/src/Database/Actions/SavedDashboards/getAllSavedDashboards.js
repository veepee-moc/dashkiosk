const db = require('../../Models');
const { removeTime } = require('../Utils');

module.exports = () => {
    return new Promise((resolve, reject) => {
        db.SavedDashboards.findAll()
            .then((data) => {
                const savedDashboards = data.map((obj) => {
                    const cpy = Object.assign({}, obj.dataValues);
                    removeTime(cpy);
                    return cpy;
                });
                resolve(savedDashboards);
            })
            .catch((err) => reject(err));
    });
};