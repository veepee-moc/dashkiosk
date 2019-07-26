const db = require('../../Models');
const Store = require('../../../Redux/Store');
const { action, Types } = require('../../../Redux/Actions');
const { removeTime } = require('../Utils');

module.exports = (groupTag) => {
    return new Promise((resolve, reject) => {
        db.GroupTags.findOrCreate({ where: { name: groupTag }, defaults: { name: groupTag } })
            .then(([tag,created]) => {
                if (created) {
                    removeTime(tag.dataValues);
                    const data = Object.assign({}, tag.dataValues);
                    data.groups = JSON.parse(data.groups);
                    Store.dispatch(action(Types.NewGroupTag, data));
                    resolve(data);
                }
                else
                    resolve();
            })
            .catch((err) => reject(err));
    });
};