const { Types } = require('../../../Actions');

export default {
    type: Types.DeleteDisplay,
    do(state, payload) {
        const Displays = [...state.Displays];
        const displayIndex = Displays.findIndex((obj) => obj.id === payload.id);
        if (displayIndex === -1)
            return state;
        Displays.splice(displayIndex, 1);
        return Object.assign({}, state, { Displays });
    }
};