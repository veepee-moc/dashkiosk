const { Types } = require('../../../Actions');

export default {
    type: Types.UpdateDisplay,
    do(state, payload) {
        const Displays = [...state.Displays];
        const index = Displays.find((obj) => obj.id === payload.id);
        if (index === undefined)
            return state;
        Displays[index] = Object.assign({}, Displays[index], payload);
        return Object.assign({}, state, { Displays });
    }
}