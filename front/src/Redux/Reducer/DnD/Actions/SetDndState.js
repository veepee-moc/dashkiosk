import { Types } from "../../../Actions";

export default {
    type: Types.SetDndState,
    do(state, payload) {
        return Object.assign({}, state, payload);
    }
};