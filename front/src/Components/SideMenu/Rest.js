import Axios from 'axios';
import { toast } from 'react-toastify';

class Rest {
    constructor(parent) {
        this.parent = parent;
    }

    addNewGroup() {
        const random = (function(length) {
            var bits = 36,
            tmp,
            out = '';
            while (out.length < length) {
              tmp = Math.random().toString(bits).slice(2);
              out += tmp.slice(0, Math.min(tmp.length, (length - out.length)));
            }
            return out.toUpperCase();
          })(6);
        Axios.post('/api/group', {
            name: `New group ${ random }`,
            description: 'Newly created group'
        })
            .catch((err) => toast.error(`Failed to create a new group: ${err.message}`));
    }

    getKeycloakLogout() {
        Axios.get('/api/keycloak')
            .then((res) => this.parent.setState({ keycloak: res.data.logout }))
            .catch(() => this.parent.setState({ keycloak: null }));
    }

    addNewTag(name) {
        Axios.put(`/api/grouptag/${name}`)
            .catch((err) => toast.error(`Failed to create a new tag: ${err.message}`));
    }

    deleteTag(id) {
        Axios.delete(`/api/grouptag/${id}`)
            .catch((err) => toast.error(`Failed to remove tag: ${err.message}`));
    }
};

export default Rest;