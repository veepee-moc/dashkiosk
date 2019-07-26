const { Types } = require('../../../Actions');

export default {
    type: Types.DeleteDashboard,
    do(state, dashboard) {
        const Dashboards = [...state.Dashboards];
        const index = Dashboards.findIndex(obj => obj.id === dashboard.id);
        if (index === -1)
            return state;
        Dashboards.splice(index, 1);
        return Object.assign({}, state, { Dashboards });
    }
};