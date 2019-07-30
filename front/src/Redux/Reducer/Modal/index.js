import SetModalState from './Actions/SetModalState';

const initialState = {
    group: {},
    rest: {},
    dashboard: {},
    show: false,
    display: {},
    images: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SetModalState.type:
            return SetModalState.do(state, action.payload);
        default:
            return state;
    }
};