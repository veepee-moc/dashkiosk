export default (state, payload) => {
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, { authenticated: payload })
    });
};