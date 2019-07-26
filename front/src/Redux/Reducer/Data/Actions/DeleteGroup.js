const { Types } = require('../../../Actions');

export default {
    type: Types.DeleteGroup,
    do(state, payload) {
        const Groups = [...state.Groups];
        const groupIndex = Groups.findIndex((obj) => obj.id === payload);
        if (groupIndex === -1)
            return state;
        Groups.splice(groupIndex, 1);
        return Object.assign({}, state, { Groups });
    }
};