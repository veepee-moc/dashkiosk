const { Types } = require('../../../Actions');

export default {
    type: Types.NewBroadcast,
    do(state, payload) {
        const Broadcasts = [...state.Broadcasts];
        const oldBroadcast = Broadcasts.findIndex((broadcast) => broadcast.groupId === payload.groupId)
        if (oldBroadcast)
            Broadcasts.splice(oldBroadcast, 1);
        Broadcasts.push(payload);
        return Object.assign({}, state, { Broadcasts });
    }
};