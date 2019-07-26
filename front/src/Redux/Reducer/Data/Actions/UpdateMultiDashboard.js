const { Types } = require('../../../Actions');

export default {
    type: Types.UpdateDashboard,
    do(state, payload) {
        const MultiDashboards = [...state.MultiDashboards];
        const index = MultiDashboards.find((obj) => obj.id === payload.id);
        if (index === undefined)
            return state;
        MultiDashboards[index] = Object.assign({}, MultiDashboards[index], payload);
        return Object.assign({}, state, { MultiDashboards });
    }
};