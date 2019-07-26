import SetDndState from './Actions/setDndState';

const initialState = {
    type: null,
    object: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SetDndState.type:
            return SetDndState.do(state, action.payload);
        default:
            return state;
    }
};