const { Types } = require('../../../Actions');

export default {
    type: Types.LoadStore,
    do(state, payload) {
        const newState = Object.assign({}, state);
        newState.Groups = payload.Groups;
        newState.Dashboards = payload.Dashboards;
        newState.Displays = payload.Displays;
        newState.Broadcasts = payload.Broadcasts;
        newState.MultiDashboards = payload.MultiDashboards;
        newState.GroupTags = payload.GroupTags;
        return newState;
    }
};