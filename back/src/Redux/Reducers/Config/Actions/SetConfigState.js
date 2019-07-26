const { Types } = require('../../../Actions');

module.exports = {
    type: Types.SetConfigState,
    do(state, config) {
        return Object.assign({}, state, config);
    }
};