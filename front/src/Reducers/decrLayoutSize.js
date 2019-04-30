function decrLayoutSize(state) {
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            layoutSize: state.admin.layoutSize - 1
        })
    });
}

export default decrLayoutSize;