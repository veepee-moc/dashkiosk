const db = require('../../Models');
const uniqId = require('uniqid');
const Store = require('../../../Redux/Store');
const { action, Types } = require('../../../Redux/Actions');
const { removeTime } = require('../Utils');

module.exports = (name, ip) => {
    return new Promise((resolve, reject) => {
        db.Displays.findOrCreate({ where: { name }, defaults: { name: uniqId.time(), groupId: 1, ip: ip }})
            .then(([res, created]) => {
                removeTime(res.dataValues)
                const data = Object.assign({}, res.dataValues);
                data.connected = true;
                if (created)
                    Store.dispatch(action(Types.NewDisplay, data));
                resolve(data);
            })
            .catch((err) => reject(err));
    });
}