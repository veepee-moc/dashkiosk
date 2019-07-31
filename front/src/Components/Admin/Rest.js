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
        const srcGroup = parseInt(info.source.droppableId);
        const dstGroup = parseInt(info.destination.droppableId);
        const dashboard = Store.getState().Data.Dashboards.find(obj => obj.rank === info.source.index && obj.groupId === srcGroup);
        if (!dashboard)
            return;
        Axios.patch(`/api/dashboard/move/${dashboard.id}`, { srcGroup, dstGroup, newRank: info.destination.index })
            .catch(err => toast.error(`Failed to move dashboard: ${err.message}`));
    }
};

export default Rest;