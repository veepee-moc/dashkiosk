const { Types } = require('../../../Actions');

module.exports = {
    type: Types.DeleteBroadcast,
    do(state, broadcastId) {
        const Broadcasts = [...state.Broadcasts];
        const broadcastIndex = Broadcasts.findIndex((obj) => obj.id === broadcastId);
        if (broadcastIndex === -1)
            return state;
        Broadcasts.splice(broadcastIndex, 1);
        return Object.assign({}, state, { Broadcasts });
    }
};