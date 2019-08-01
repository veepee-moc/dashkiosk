const { Types } = require('../../../Actions');

module.exports = {
    type: Types.UpdateDisplay,
    do(state, payload) {
        const Displays = [...state.Displays];
        const index = Displays.findIndex((obj) => obj.id === payload.id);
        if (index === -1)
            return state;
        Displays[index] = Object.assign({}, Displays[index], payload);
        return Object.assign({}, state, { Displays });
    }
}