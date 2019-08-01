const { Types } = require('../../../Actions');

module.exports = {
    type: Types.UpdateGroup,
    do(state, payload) {
        const Groups = [...state.Groups];
        const index = Groups.findIndex((obj) => obj.id === payload.id);
        if (index === -1)
            return state;
        Groups[index] = Object.assign({}, Groups[index], payload);
        return Object.assign({}, state, { Groups });
    }
}