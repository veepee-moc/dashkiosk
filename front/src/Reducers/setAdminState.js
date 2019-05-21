function setAdminState(state, payload) {
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, payload)
    });
}

export default setAdminState;