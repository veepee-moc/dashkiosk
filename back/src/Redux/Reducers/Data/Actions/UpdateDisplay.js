const { Types } = require('../../../Actions');

module.exports = {
    type: Types.UpdateDisplay,
    do(state, payload) {
        const Displays = [...state.Displays];
        const display = Displays.find((obj) => obj.id === payload.id);
        if (!display)
            return state;
        Object.assign(display, payload);
        return Object.assign({}, state, { Displays });
    }
}