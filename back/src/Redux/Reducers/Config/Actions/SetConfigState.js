const { Types } = require('../../../Actions');

function assign(dst, src) {
    for (const key in src) {
        if (typeof(src[key]) === 'object' && dst.hasOwnProperty(key))
            assign(dst[key], src[key]);
        else
            dst[key] = src[key]
    }
}

module.exports = {
    type: Types.SetConfigState,
    do(state, config) {
        const Config = Object.assign({}, state);
        assign(Config, config);
        return Object.assign({}, state, Config);
    }
};