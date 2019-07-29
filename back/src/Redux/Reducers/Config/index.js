const { loadReducerActions } = require('../Utils');

const Actions = loadReducerActions(__dirname);
const initialState = {
    Auth: {
        strategy: 'Local',
        roles: {
            broadcast: null,
            dashboard: null,
            display: null,
            group: null,
            groupTag: null,
            history: null,
            multiDashboard: null,
            imageUpload: null,
            savedDashboard: null
        }
    },
    Server: {
        port: 3000,
        secret: 'dashkiosk'
    },
    Log: {
        level: 'info',
        file: null
    },
    Upload: {
        maxFileSizeUpload: 5242880, //In Bytes
        maxStorageAllowed: 104857600 //In Bytes
    }
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