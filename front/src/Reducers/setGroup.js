function setGroup(state, group) {
    group.displays = Object.values(group.displays).sort((a, b) => {
        if (a.name > b.name)
            return 1;
        else if (a.name < b.name)
            return -1;
        else
            return 0;
    });
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