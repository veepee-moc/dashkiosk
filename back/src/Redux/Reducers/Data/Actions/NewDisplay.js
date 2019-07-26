const { Types } = require('../../../Actions');

module.exports = {
    type: Types.NewDisplay,
    do(state, payload) {
        const Displays = [...state.Displays];
        Displays.push(payload);
        return Object.assign({}, state, { Displays });
    }
};