import setStoreState from './setStoreState';

const initialState = {
    socketConnected: false,
    receiverConnected: false
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SetStoreState':
            return setStoreState(state, action.payload);
        default:
            return (state);
    }
}

export default rootReducer;