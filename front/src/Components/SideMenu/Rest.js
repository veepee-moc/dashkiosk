import Axios from 'axios';
import { toast } from 'react-toastify';

class Rest {
    constructor(parent) {
        this.parent = parent;
    }

    getKeycloakLogout() {
        Axios.get('/api/keycloak')
            .then((res) => {
                if (res.status === 204)
                    this.parent.setState({ keycloakLogout: null });
                else
                    this.parent.setState({ keycloakLogout: res.data.logout });
            })
            .catch(() => toast.error('Failed to get info about keycloak from server.'));
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

    addNewTag(name) {
        Axios.put(`/api/grouptag/${name}`)
            .catch((err) => toast.error(`Failed to create a new tag: ${err.message}`));
    }
};

export default Rest;