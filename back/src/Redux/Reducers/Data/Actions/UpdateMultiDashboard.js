const { Types } = require('../../../Actions');

module.exports = {
    type: Types.UpdateDashboard,
    do(state, payload) {
        const MultiDashboards = [...state.MultiDashboards];
        const index = MultiDashboards.findIndex((obj) => obj.id === payload.id);
        if (index === -1)
            return state;
        MultiDashboards[index] = Object.assign({}, MultiDashboards[index], payload);
        return Object.assign({}, state, { MultiDashboards });
    }
};