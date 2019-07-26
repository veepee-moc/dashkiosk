const { Types } = require('../../../Actions');

module.exports = {
    type: Types.UpdateGroupTag,
    do(state, payload) {
        if (!payload)
            return state;
        const GroupTags = [...state.GroupTags];
        const groupTag = GroupTags.find((obj) => obj.id === payload.id);
        if (!groupTag)
            return state;
        Object.assign(groupTag, payload);
        return Object.assign({}, state, { GroupTags });
    }
}