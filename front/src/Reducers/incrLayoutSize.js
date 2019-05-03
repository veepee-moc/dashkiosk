function incrLayoutSize(state) {
    var newLayoutSize = state.admin.layoutSize + 1;
    if (newLayoutSize > 10)
        newLayoutSize = 10;
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            layoutSize: newLayoutSize
        })
    });
}

export default incrLayoutSize;