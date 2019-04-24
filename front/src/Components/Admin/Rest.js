import Axios from 'axios';
import { toast } from 'react-toastify';
import Store from '../../Store';

class Rest {
    editRank(groupIndex, newRank) {
        const group = Store.getState().admin.groups[groupIndex];
        Axios.put(`/api/group/rank/${group.id}`, { rank: newRank })
            .catch(() => toast.error('Failed to edit group rank.'))
    }
};

export default Rest;