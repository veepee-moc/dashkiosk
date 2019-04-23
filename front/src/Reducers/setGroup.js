function setGroup(state, group) {
    const groups = [...state.admin.groups];
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].id === group.id)
            groups.splice(i, 1);
    }
    groups.splice(group.rank, 0, group);
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            groups: groups
        })
    });
}

export default setGroup;