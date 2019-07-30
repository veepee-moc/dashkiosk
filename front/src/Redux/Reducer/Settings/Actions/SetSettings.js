import { Types } from '../../../Actions';

export default {
    type: Types.SetSettings,
    do(state, payload) {
        return Object.assign({}, state, payload);
    }
};