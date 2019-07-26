const { Types } = require('../../../Actions');

export default {
    type: Types.NewDashboard,
    do(state, payload) {
        const Dashboards = [...state.Dashboards];
        Dashboards.push(payload);
        return Object.assign({}, state, { Dashboards });
    }
};