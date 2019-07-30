import SetLogs from './Actions/SetLogs';

const initialState = {
    historyLogs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SetLogs.type:
            return SetLogs.do(state, action.payload);
        default:
            return state;
    }
};