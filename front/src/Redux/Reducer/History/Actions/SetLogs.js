import { Types } from '../../../Actions';

export default {
    type: Types.SetLogs,
    do(state, payload) {
        return Object.assign({}, state, { historyLogs: payload });
    }
};