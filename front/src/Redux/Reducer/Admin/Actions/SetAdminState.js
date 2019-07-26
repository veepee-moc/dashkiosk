const { Types } = require('../../../Actions');

export default {
    type: Types.SetAdminState,
    do(state, payload) {
        console.log(payload);
        return Object.assign({}, state, payload);
    }
};