import SetAdminState from './Actions/SetAdminState';
import IncrLayoutSize from './Actions/IncrLayoutSize';
import DecrLayoutSize from './Actions/DecrLayoutSize';

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
        case IncrLayoutSize.type:
            return IncrLayoutSize.do(state, action.payload);
        case DecrLayoutSize.type:
            return DecrLayoutSize.do(state, action.payload);
        default:
            return state;
    }
};