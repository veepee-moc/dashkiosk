const { Types } = require('../../../Actions');

module.exports = {
    type: Types.UpdateDashboard,
    do(state, payload) {
        const Dashboards = [...state.Dashboards];
        const dashboard = Dashboards.find((obj) => obj.id === payload.id);
        if (!dashboard)
            return state;
        Object.assign(dashboard, payload);
        return Object.assign({}, state, { Dashboards });
    }
};