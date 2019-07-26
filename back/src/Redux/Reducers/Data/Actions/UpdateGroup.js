const { Types } = require('../../../Actions');

module.exports = {
    type: Types.UpdateGroup,
    do(state, payload) {
        const Groups = [...state.Groups];
        const group = Groups.find((obj) => obj.id === payload.id);
        if (!group)
            return state;
        Object.assign(group, payload);
        return Object.assign({}, state, { Groups });
    }
}