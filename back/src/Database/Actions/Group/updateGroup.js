const db = require('../../Models');
const Store = require('../../../Redux/Store');
const { action, Types } = require('../../../Redux/Actions');
const { removeTime } = require('../Utils');

module.exports = (id, group) => {
    return new Promise((resolve, reject) => {
        db.Groups.findOne({ where: { id } })
            .then((res) => {
                if (!res) {
                    reject();
                    return;
                }
                if (group.id)
                    delete group.id;
                return res.update(group);
            })
            .then((res) => {
                removeTime(res.dataValues);
                const data = Object.assign({}, res.dataValues);
                data.roles = JSON.parse(data.roles);
                Store.dispatch(action(Types.UpdateGroup, data));
                resolve(data);
            })
            .catch((err) => reject(err));
    });
}