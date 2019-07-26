const { Types } = require('../../../Actions');

function removeTime(obj) {
    if (obj.createdAt)
        delete obj.createdAt;
    if (obj.updatedAt)
        delete obj.updatedAt;
}

module.exports = {
    type: Types.LoadModel,
    do(state, payload) {
        const newState = Object.assign({}, state);
        for (const key in payload) {
            for (const p of payload[key].model) {
                removeTime(p.dataValues);
                if (payload[key].modelName === 'Groups')
                    p.dataValues.roles = JSON.parse(p.dataValues.roles);
                else if (payload[key].modelName === 'MultiDashboards')
                    p.dataValues.urls = JSON.parse(p.dataValues.urls);
                else if (payload[key].modelName === 'Displays')
                    p.dataValues.connected = false;
                else if (payload[key].modelName === 'GroupTags')
                    p.dataValues.groups = JSON.parse(p.dataValues.groups);
                newState[payload[key].modelName].push(p.dataValues);
            }
        }
        return newState;
    }
};