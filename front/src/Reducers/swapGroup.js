function swapGroup(state, index) {
    const groups = [...state.admin.groups];
    [groups[index.src], groups[index.dst]] = [groups[index.dst], groups[index.src]];
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            groups: groups
        })
    });
}

export default swapGroup;