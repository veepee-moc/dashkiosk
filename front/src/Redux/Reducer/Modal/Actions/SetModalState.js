const { Types } = require('../../../Actions');

export default {
    type: Types.SetModalState,
    do(state, payload) {
        return Object.assign({}, state, payload);
    }
};