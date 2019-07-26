import Axios from "axios";
import { toast } from 'react-toastify';

class Rest {
    updateTag(newName, newColor, tagId) {
        Axios.patch(`/api/grouptag/${tagId}`, { name: newName, color: newColor })
            .catch((err) => toast.error(`Failed to update tag: ${err.message}`));
    }

    deleteTag(tagId) {
        Axios.delete(`/api/grouptag/${tagId}`)
            .catch((err) => toast.error(`Failed to remove tag: ${err.message}`));
    }

    deleteTagFromGroup(groupId, tagId) {
        Axios.delete(`/api/grouptag/${tagId}/group/${groupId}`)
            .catch((err) => toast.error(`Failed to remove tag: ${err.message}`));
    }
};

export default Rest;