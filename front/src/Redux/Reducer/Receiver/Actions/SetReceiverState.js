import { Types } from '../../../Actions';

export default {
    type: Types.SetReceiverState,
    do(state, payload) {
        console.log(payload);
        console.log(state);
        return Object.assign({}, state, payload);
    }
};