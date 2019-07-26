const { Types } = require('../../../Actions');

export default {
    type: Types.NewGroupTag,
    do(state, payload) {
        const GroupTags = [...state.GroupTags];
        GroupTags.push(payload);
        return Object.assign({}, state, { GroupTags });
    }
};