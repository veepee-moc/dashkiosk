const { Types } = require('../../../Actions');

export default {
    type: Types.NewDisplay,
    do(state, payload) {
        const Displays = [...state.Displays];
        Displays.push(payload);
        return Object.assign({}, state, { Displays });
    }
};