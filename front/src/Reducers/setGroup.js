function setGroup(state, group) {
    const groups = [...state.admin.groups];
    groups[group.rank] = group;
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            groups: groups
        })
    });
}

export default setGroup;