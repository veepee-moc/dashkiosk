import setStoreState from './setStoreState';
import setAdminState from './setAdminState';
import setAllGroups from './setAllGroups';
import sortGroups from './sortGroups';
import setGroup from './setGroup';
import swapGroup from './swapGroup';
import deleteGroup from './deleteGroup';
import setDisplay from './setDisplay';
import deleteDisplay from './deleteDisplay';
import setDragAndDrop from './setDragAndDrop';
import { Types } from '../Actions';

const initialState = {
	admin: {
		socketConnected: false,
		groups: []
	},
	dnd: {
		type: null,
		object: null
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
		case Types.SortGroups:
			return sortGroups(state);
		case Types.SetGroup:
			return setGroup(state, action.payload);
		case Types.SwapGroup:
			return swapGroup(state, action.payload);
		case Types.DeleteGroup:
			return deleteGroup(state, action.payload);
		case Types.SetDisplay:
			return setDisplay(state, action.payload);
		case Types.DeleteDisplay:
			return deleteDisplay(state, action.payload);
		case Types.SetDragAndDrop:
			return setDragAndDrop(state, action.payload);
		default:
			return (state);
	}
}

export default rootReducer;