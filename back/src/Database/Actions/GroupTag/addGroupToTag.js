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
                let groupsId = JSON.parse(tag.groups);
                if (!groupsId)
                    groupsId = [];
                if (!groupsId.find((id) => id === groupId)) {
                    groupsId.push(groupId);
                    return tag.update({ groups: JSON.stringify(groupsId) })
                }
                else
                    resolve();
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