const db = require('../../Models');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        db.SavedDashboards.destroy({ where: { id } })
            .then(() => resolve(id))
            .catch((err) => reject(err));
    })
};