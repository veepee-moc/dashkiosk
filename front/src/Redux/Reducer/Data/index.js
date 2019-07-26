import NewBroadcast from './Actions/NewBroadcast';
import NewDashboard from './Actions/NewDashboard';
import NewDisplay from './Actions/NewDisplay';
import NewGroup from './Actions/NewGroup';
import NewGroupTag from './Actions/NewGroupTag';
import NewMultiDashboard from './Actions/NewMultiDashboard';
import UpdateDashboard from './Actions/UpdateDashboard';
import UpdateDisplay from './Actions/UpdateDisplay';
import UpdateGroup from './Actions/UpdateGroup';
import UpdateGroupTag from './Actions/UpdateGroupTag';
import UpdateMultiDashboard from './Actions/UpdateMultiDashboard';
import DeleteDashboard from './Actions/DeleteDashboard';
import DeleteDisplay from './Actions/DeleteDisplay';
import DeleteGroup from './Actions/DeleteGroup';
import DeleteGroupTag from './Actions/DeleteGroupTag';
import LoadStore from './Actions/LoadStore';

const initialState = {
    Groups: [],
    Displays: [],
    Dashboards: [],
    Broadcasts: [],
    MultiDashboards: [],
    GroupTags: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case NewBroadcast.type:
            return NewBroadcast.do(state, action.payload);
        case NewDashboard.type:
            return NewDashboard.do(state, action.payload);
        case NewDisplay.type:
            return NewDisplay.do(state, action.payload);
        case NewGroup.type:
            return NewGroup.do(state, action.payload);
        case NewGroupTag.type:
            return NewGroupTag.do(state, action.payload);
        case NewMultiDashboard.type:
            return NewMultiDashboard.do(state, action.payload);
        case UpdateDashboard.type:
            return UpdateDashboard.do(state, action.payload);
        case UpdateDisplay.type:
            return UpdateDisplay.do(state, action.payload);
        case UpdateGroup.type:
            return UpdateGroup.do(state, action.payload);
        case UpdateGroupTag.type:
            return UpdateGroupTag.do(state, action.payload);
        case UpdateMultiDashboard.type:
            return UpdateMultiDashboard.do(state, action.payload);
        case DeleteDashboard.type:
            return DeleteDashboard.do(state, action.payload);
        case DeleteDisplay.type:
            return DeleteDisplay.do(state, action.payload);
        case DeleteGroup.type:
            return DeleteGroup.do(state, action.payload);
        case DeleteGroupTag.type:
            return DeleteGroupTag.do(state, action.payload);
        case LoadStore.type:
            return LoadStore.do(state, action.payload);
        default:
            return state;
    }
};