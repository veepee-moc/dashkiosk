import setStoreState from './setStoreState';
import setAdminState from './setAdminState';
import setAllGroups from './setAllGroups';
import setGroup from './setGroup';
import deleteGroup from './deleteGroup';
import setDisplay from './setDisplay';
import deleteDisplay from './deleteDisplay';
import { Types } from '../Actions';

const initialState = {
	admin: {
		socketConnected: false,
		groups: []
	},
	socketConnected: false,
	receiverConnected: false,
	connectionLost: false,
	reloadRequired: false,
	dashboardToDisplay: {},
	osd: ''
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case Types.SetStoreState:
			return setStoreState(state, action.payload);
		case Types.SetAdminState:
			return setAdminState(state, action.payload);
		case Types.SetAllGroups:
			return setAllGroups(state, action.payload);
		case Types.SetGroup:
			return setGroup(state, action.payload);
		case Types.DeleteGroup:
			return deleteGroup(state, action.payload);
		case Types.SetDisplay:
			return setDisplay(state, action.payload);
		case Types.DeleteDisplay:
			return deleteDisplay(state, action.payload);
		default:
			return (state);
	}
}

export default rootReducer;