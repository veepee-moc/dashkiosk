const db = require('../../Models');
const uniqId = require('uniqid');
const Store = require('../../../Redux/Store');
const { action, Types } = require('../../../Redux/Actions');
const { removeTime } = require('../Utils');

module.exports = () => {
    const { Data } = Store.getState();
    let rank = -1;
    for (const group of Data.Groups) {
        if (group.rank > rank)
            rank = group.rank;
    }
    return new Promise((resolve, reject) => {
        db.Groups.create({ name: `New group ${ uniqId.time() }`, layoutSize: 3, rank: rank + 1 })
            .then((res) => {
                removeTime(res.dataValues);
                const data = Object.assign({}, res.dataValues);
                data.roles = JSON.parse(data.roles);
                Store.dispatch(action(Types.NewGroup, data));
                resolve(data);
            })
            .catch((err) => reject(err));
    })
}