const { Types } = require('../../../Actions');

module.exports = {
    type: Types.DeleteDisplay,
    do(state, payload) {
        const Displays = [...state.Displays];
        const displayIndex = Displays.findIndex((obj) => obj.id === payload);
        if (displayIndex === -1)
            return state;
        Displays.splice(displayIndex, 1);
        return Object.assign({}, state, { Displays });
    }
}