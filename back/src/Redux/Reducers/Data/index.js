const { loadReducerActions } = require('../Utils');

const Actions = loadReducerActions(__dirname);
const initialState = {
    Groups: [],
    Displays: [],
    Dashboards: [],
    Broadcasts: [],
    MultiDashboards: [],
    GroupTags: []
};

function reducer(state = initialState, action) {
    for (const a of Actions) {
        if (a.type === action.type) {
            return a.do(state, action.payload);
        }
    }
    return state;
}

module.exports = reducer;