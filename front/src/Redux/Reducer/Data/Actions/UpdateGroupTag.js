const { Types } = require('../../../Actions');

export default {
    type: Types.UpdateGroupTag,
    do(state, payload) {
        if (!payload)
            return state;
        const GroupTags = [...state.GroupTags];
        const index = GroupTags.findIndex((obj) => obj.id === payload.id);
        if (index === -1)
            return state;
        GroupTags[index] = Object.assign({}, GroupTags[index], payload);
        return Object.assign({}, state, { GroupTags });
    }
}