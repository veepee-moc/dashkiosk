const { Types } = require('../../../Actions');

export default {
    type: Types.NewGroup,
    do(state, payload) {
        if (state.Groups.find(group => group.id === payload.id))
            return state;
        const Groups = [...state.Groups];
        Groups.push(payload);
        return Object.assign({}, state, { Groups });
    }
};