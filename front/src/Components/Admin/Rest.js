import Axios from 'axios';
import { toast } from 'react-toastify';
import { action, Types } from '../../Actions';
import Store from '../../Store';

class Rest {
    editRank(groupIndex) {
        const group = Store.getState().admin.groups[groupIndex];
        return new Promise((resolve, reject) => {
            Axios.put(`/api/group/rank/${group.id}`, { rank: groupIndex })
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
        const groupIndex = parseInt(info.source.droppableId);
        const dashboardIndex = info.source.index;
        const group = Store.getState().admin.groups[groupIndex];
        const dashboard = group.dashboards[dashboardIndex];
        const destGroup = Store.getState().admin.groups[parseInt(info.destination.droppableId)];
        if (info.source.droppableId !== info.destination.droppableId) {
            Axios.post(`/api/group/${destGroup.id}/dashboard`, dashboard)
                .then((res) => Axios.delete(`/api/group/${group.id}/dashboard/${dashboard.id}`)
                    .then(() => Axios.put(`/api/group/${destGroup.id}/dashboard/${res.data.id}`, { rank: info.destination.index })))
                .catch((err) => toast.error(`Failed to move dashboard: ${err.message}`));
        }
        else
            Axios.put(`/api/group/${destGroup.id}/dashboard/${dashboard.id}`, { rank: info.destination.index })
                .catch((err) => toast.error(`Failed to move dashboard: ${err.message}`));
    }
};

export default Rest;