const { Types } = require('../../../Actions');

module.exports = {
    type: Types.UpdateDashboard,
    do(state, payload) {
        const MultiDashboards = [...state.MultiDashboards];
        const multiDashboard = MultiDashboards.find((obj) => obj.id === payload.id);
        if (!multiDashboard)
            return state;
        Object.assign(multiDashboard, payload);
        return Object.assign({}, state, { MultiDashboards });
    }
};