const { Types } = require('../../../Actions');

export default {
    type: Types.DecrLayoutSize,
    do(state, payload) {
        var newLayoutSize = state.layoutSize - 1;
        if (newLayoutSize < 1)
            newLayoutSize = 1;
        return Object.assign({}, state, { layoutSize: newLayoutSize });
    }
};