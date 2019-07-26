import { Types } from '../Actions';
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
import incrLayoutSize from './incrLayoutSize';
import decrLayoutSize from './decrLayoutSize';
import addGroupTag from './addGroupTag';
import updateGroupTag from './updateGroupTag';
import deleteGroupTag from './deleteGroupTag';
import setModal from './setModal';
import setLogs from './setLogs';
import setAuthenticated from './setAuthenticated';

const initialState = {
	admin: {
		authenticated: false,
		socketConnected: false,
		groups: [],
		groupTags: [],
		toggleMenu: false,
		layoutSize: 3,
		sideMenuWidth: 0
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
	osd: '',
	displayViewport: '',
	settings: {
		timezone: 'Europe/Paris',
		branding: 'default',
		background_choice: 'color',
		background_color: '#1c1a1f',
		background_image: '',
		loading_image: '',
		stamp: '',
		unassigned: []
	},
	modal: {
		group: {},
		rest: {},
		dashboard: {},
		show: false,
		display: {},
		images: ''
	},
	history: {
		historyLogs: []
	}
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
		case Types.IncrLayoutSize:
			return incrLayoutSize(state);
		case Types.DecrLayoutSize:
			return decrLayoutSize(state);
		case Types.AddGroupTag:
			return addGroupTag(state, action.payload);
		case Types.UpdateGroupTag:
			return updateGroupTag(state, action.payload);
		case Types.DeleteGroupTag:
			return deleteGroupTag(state, action.payload);
		case Types.SetModal:
			return setModal(state, action.payload);
		case Types.SetLogs:
			return setLogs(state, action.payload);
		case Types.SetAuthenticated:
			return setAuthenticated(state, action.payload);
		default:
			return (state);
	}
}

export default rootReducer;