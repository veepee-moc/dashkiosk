import SetAdminState from './Actions/SetAdminState';

const initialState = {
    authenticated: false,
    socketConnected: false,
    toggleMenu: false,
    layoutSize: 3,
    sideMenuWidth: 0,
    dndType: null,
    dndObject: null,
    historyLogs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SetAdminState.type:
            return SetAdminState.do(state, action.payload);
        default:
            return state;
    }
};