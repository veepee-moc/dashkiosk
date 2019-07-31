const { Types } = require('../../../Actions');

export default {
    type: Types.IncrLayoutSize,
    do(state, payload) {
        var newLayoutSize = state.layoutSize + 1;
        if (newLayoutSize > 10)
            newLayoutSize = 10;
        return Object.assign({}, state, { layoutSize: newLayoutSize });
    }
};