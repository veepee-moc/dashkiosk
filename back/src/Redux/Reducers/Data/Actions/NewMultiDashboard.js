const { Types } = require('../../../Actions');

module.exports = {
    type: Types.NewMultiDashboard,
    do(state, payload) {
        const MultiDashboards = [...state.MultiDashboards];
        MultiDashboards.push(payload);
        return Object.assign({}, state, { MultiDashboards });
    }
};