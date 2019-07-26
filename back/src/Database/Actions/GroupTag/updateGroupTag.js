const db = require('../../Models');
const Store = require('../../../Redux/Store');
const { action, Types } = require('../../../Redux/Actions');
const { removeTime } = require('../Utils');

module.exports = (id, body) => {
    return new Promise((resolve, reject) => {
        db.GroupTags.findOne({ where: { id }})
            .then((tag) => {
                if (tag && body)
                    return tag.update(body);
                else if (tag)
                    return tag;
                return;
            })
            .then((tag) => {
                if (tag) {
                    removeTime(tag.dataValues);
                    const data = Object.assign({}, tag.dataValues);
                    data.groups = JSON.parse(data.groups);
                    Store.dispatch(action(Types.UpdateGroupTag, data));
                    resolve(data);
                }
                else
                    resolve();
            })
            .catch((err) => reject(err));
    });
}