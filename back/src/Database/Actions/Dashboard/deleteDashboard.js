const db = require('../../Models');
const Store = require('../../../Redux/Store');
const { action, Types } = require('../../../Redux/Actions');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        db.Dashboards.destroy({ where: { id } })
            .then(() => {
                Store.dispatch(action(Types.DeleteDashboard, id));
                resolve(id);
            })
            .catch((err) => reject(err));
    })
};