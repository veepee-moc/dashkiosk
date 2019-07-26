const db = require('../../Models');
const { removeTime } = require('../Utils');
const Store = require('../../../Redux/Store');
const { Types, action } = require('../../../Redux/Actions');

module.exports = (dashboardId, dashboard) => {
    return new Promise((resolve, reject) => {
        db.Dashboards.findOne({ where: { id: dashboardId } })
            .then((res) => {
                if (!res) {
                    reject();
                    return;
                }
                return res.update(dashboard);
            })
            .then((res) => {
                removeTime(res.dataValues);
                const data = Object.assign({}, res.dataValues);
                Store.dispatch(action(Types.UpdateDashboard, data));
                resolve(data);
            })
            .catch((err) => reject(err));
    });
};
