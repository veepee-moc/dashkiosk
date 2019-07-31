const { Types } = require('../../../Actions');

export default {
    type: Types.UpdateDashboard,
    do(state, payload) {
        const Dashboards = [...state.Dashboards];
        const index = Dashboards.findIndex((obj) => obj.id === payload.id);
        if (index === undefined)
            return state;
        Dashboards[index] = Object.assign({}, Dashboards[index], payload);
        return Object.assign({}, state, { Dashboards });
    }
};