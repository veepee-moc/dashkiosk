import Axios from 'axios';
import { toast } from 'react-toastify';

class Rest {
    updateMultiDashboard(multDashboard) {
        Axios.post(`/api/multi-dashboards/${multDashboard.id}`, multDashboard)
            .then(() => toast.success('Multi dashboard edited with success.'))
            .catch((err) => toast.error(`Failed to edit multi dashboard: ${err.message}`));
    }
};

export default Rest;