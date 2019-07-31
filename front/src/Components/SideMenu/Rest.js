import Axios from 'axios';
import { toast } from 'react-toastify';

class Rest {
    constructor(parent) {
        this.parent = parent;
    }
    
    addNewGroup() {
        return Axios.post('/api/group')
            .catch((err) => toast.error(`Failed to create a new group: ${err.message}`));
    }

    addNewTag(name) {
        Axios.put(`/api/grouptag/${name}`)
            .catch((err) => toast.error(`Failed to create a new tag: ${err.message}`));
    }
};

export default Rest;