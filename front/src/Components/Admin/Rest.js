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
            .then((res) => Store.dispatch(action(Types.SetAdminState, res.data)))
            .catch((err) => toast.error(`Failed to load group tags: ${err.message}`));
    }
};

export default Rest;