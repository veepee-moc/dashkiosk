const { Types } = require('../../../Actions');

module.exports = {
    type: Types.DeleteGroupTag,
    do(state, payload) {
        const GroupTags = [...state.GroupTags];
        const tagIndex = GroupTags.findIndex((obj) => obj.id === payload);
        if (tagIndex === -1)
            return state;
        GroupTags.splice(tagIndex, 1);
        return Object.assign({}, state, { GroupTags });
    }
}