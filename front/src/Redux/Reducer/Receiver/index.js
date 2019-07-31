import SetReceiverState from './Actions/SetReceiverState';

const initialState = {
	receiverConnected: false,
	connectionLost: false,
	reloadRequired: false,
	dashboardToDisplay: {},
	osd: '',
	displayViewport: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SetReceiverState.type:
            return SetReceiverState.do(state, action.payload);
        default:
            return state;
    }
};