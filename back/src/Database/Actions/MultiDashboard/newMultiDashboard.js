const db = require('../../Models');
const { removeTime } = require('../Utils');
const Store = require('../../../Redux/Store');
const { Types, action } = require('../../../Redux/Actions');

module.exports = (urls, template) => {
    return new Promise((resolve, reject) => {
        db.MultiDashboards.create({ urls: JSON.stringify(urls), template })
            .then((data) => {
                const multDashboard = Object.assign({}, data.dataValues);
                removeTime(multDashboard);
                multDashboard.urls = JSON.parse(multDashboard.urls);
                Store.dispatch(action(Types.NewMultiDashboard, multDashboard));
                resolve(multDashboard);
            })
            .catch((err) => reject(err));
    });
};