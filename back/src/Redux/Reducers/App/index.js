const { loadReducerActions } = require('../Utils');

const Actions = loadReducerActions(__dirname);
const initialState = {
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