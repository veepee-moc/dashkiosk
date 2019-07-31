const db = require('../../Models');
const Store = require('../../../Redux/Store');
const { Types, action } = require('../../../Redux/Actions');
const { removeTime } = require('../Utils');

module.exports = (dashboard) => {
    const { Data } = Store.getState();
    let rank = -1;
    for (const dash of Data.Dashboards) {
        if (dash.rank > rank)
            rank = dash.rank;
    }
    ++rank;
    if(dashboard.id)
        delete dashboard.id;
    if(dashboard.rank)
        delete dashboard.rank;
    return new Promise((resolve, reject) => {
        db.Dashboards.create({ rank, ...dashboard })
            .then((res) => {
                removeTime(res.dataValues);
                const data = Object.assign({}, res.dataValues);
                Store.dispatch(action(Types.NewDashboard, data));
                resolve(data);
            })
            .catch((err) => reject(err));
    });
};
