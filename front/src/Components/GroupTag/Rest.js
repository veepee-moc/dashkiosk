import Axios from "axios";
import { toast } from 'react-toastify';

class Rest {
    constructor(tagId) {
        this.tagId = tagId;
    }

    updateTag(newName, newColor) {
        Axios.post(`/api/grouptag/${this.tagId}`, { name: newName, color: newColor })
            .catch((err) => toast.error(`Failed to update tag: ${err.message}`));
    }

    deleteTag() {
        Axios.delete(`/api/grouptag/${this.tagId}`)
            .catch((err) => toast.error(`Failed to remove tag: ${err.message}`));
    }

    deleteTagFromGroup(groupId) {
        Axios.delete(`/api/grouptag/${this.tagId}/group/${groupId}`)
            .catch((err) => toast.error(`Failed to remove tag: ${err.message}`));
    }
};

export default Rest;