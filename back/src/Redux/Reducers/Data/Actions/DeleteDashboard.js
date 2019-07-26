const { Types } = require('../../../Actions');

module.exports = {
    type: Types.DeleteDashboard,
    do(state, dashboardId) {
        const Dashboards = [...state.Dashboards];
        const dashboardIndex = Dashboards.findIndex((obj) => obj.id === dashboardId);
        if (dashboardIndex === -1)
            return state;
        Dashboards.splice(dashboardIndex, 1);
        return Object.assign({}, state, { Dashboards });
    }
}