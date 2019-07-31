import { Types } from '../../../Actions';

export default {
    type: Types.SetReceiverState,
    do(state, payload) {
        return Object.assign({}, state, payload);
    }
};