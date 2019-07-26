const db = require('../../Models');
const Store = require('../../../Redux/Store');
const { action, Types } = require('../../../Redux/Actions');
const { removeTime } = require('../Utils');

module.exports = (tagId, groupId) => {
    return new Promise((resolve, reject) => {
        db.GroupTags.findOne({ where: { id: tagId } })
            .then((tag) => {
                if (!tag) {
                    reject();
                    return;
                }
                const groupsId = JSON.parse(tag.groups);
                for (const i = 0; i < groupsId.length; i++) {
                    if (groupsId[i] === groupId) {
                        groupsId.splice(i, 1);
                        return tag.update({ groups: JSON.stringify(groupsId) })
                    }
                }
            })
            .then((res) => {
                if (!res) {
                    resolve();
                    return;
                }
                removeTime(res.dataValues);
                const data = Object.assign({}, res.dataValues);
                data.groups = JSON.parse(data.groups);
                Store.dispatch(action(Types.UpdateGroupTag, data))
                resolve(data);
            })
            .catch((err) => reject(err));
    });
}