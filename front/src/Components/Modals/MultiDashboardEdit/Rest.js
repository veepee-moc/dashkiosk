import Axios from 'axios';
import { toast } from 'react-toastify';

class Rest {
    updateMultiDashboard(multDashboard) {
        Axios.patch(`/api/multidashboard/${multDashboard.id}`, multDashboard)
            .then(() => toast.success('Multi dashboard edited with success.'))
            .catch((err) => toast.error(`Failed to edit multi dashboard: ${err.message}`));
    }
};

export default Rest;