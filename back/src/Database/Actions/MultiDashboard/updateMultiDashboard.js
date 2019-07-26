const db = require('../../Models');
const { removeTime } = require('../Utils');
const Store = require('../../../Redux/Store');
const { Types, action } = require('../../../Redux/Actions');

module.exports = (id, urls) => {
    return new Promise((resolve, reject) => {
        db.MultiDashboards.findOne({ where: { id } })
            .then((res) => {
                if (!res) {
                    reject();
                    return;
                }
                return res.update({ urls: JSON.stringify(urls) })
            })
            .then((data) => {
                removeTime(data);
                const multDashboard = Object.assign({}, data.dataValues);
                Store.dispatch(action(Types.UpdateMultiDashboard, multDashboard));
                resolve(multDashboard);
            })
            .catch((err) => reject(err));
    });
};