import Axios from 'axios';
import { toast } from 'react-toastify';
import { action, Types } from '../../Redux/Actions';
import Store from '../../Redux/Store';

class Rest {
    editRank(groupIndex) {
        const group = Store.getState().Data.Groups.find((obj) => obj.id === groupIndex);
        return new Promise((resolve, reject) => {
            Axios.patch(`/api/group/${group.id}`, { rank: groupIndex })
                .then(() => resolve())
                .catch(() => {
                    toast.error('Failed to edit group rank.')
                    reject();
                });
        });
    }

    loadGroupTags() {
        Axios.get('/api/grouptag')
            .then((res) => Store.dispatch(action(Types.SetAdminState, {groupTags: res.data})))
            .catch((err) => toast.error(`Failed to load group tags: ${err.message}`));
    }

    moveDashboard(info) {
        if (!info.destination)
            return;
        const dashboardIndex = info.source.index;
        const dashboard = Store.getState().Data.Dashboards.find(dash => dash.id === dashboardIndex);
        const destGroup = Store.getState().Data.Groups.find(group => group.id === info.destination.droppableId);
        const newDashboard = Object.assign({}, dashboard, { rank: info.destination.index, groupId: destGroup.id });
        Axios.patch(`/api/dashboard/${dashboard.id}`, newDashboard)
            .catch((err) => toast.error(`Failed to move dashboard: ${err.message}`));
    }
};

export default Rest;