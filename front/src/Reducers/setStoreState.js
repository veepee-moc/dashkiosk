function setStoreState(state, payload) {
    return Object.assign({}, state, payload);
}

export default setStoreState;