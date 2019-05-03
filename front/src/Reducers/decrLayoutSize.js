function decrLayoutSize(state) {
    var newLayoutSize = state.admin.layoutSize - 1;
    if (newLayoutSize < 1)
        newLayoutSize = 1;
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            layoutSize: newLayoutSize
        })
    });
}

export default decrLayoutSize;