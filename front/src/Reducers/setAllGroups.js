function setAllGroups(state, groups) {
    const arr = Object.values(groups).sort((a, b) => {
        if (a.rank > b.rank)
            return 1;
        else if (a.rank < b.rank)
            return -1;
        else
            return 0;
    });
    for (const group of arr)
        group.displays = Object.values(group.displays).sort((a, b) => {
            if (a.name > b.name)
                return 1;
            else if (a.name < b.name)
                return -1;
            else
                return 0;
        });
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            groups: arr
        })
    });
}

export default setAllGroups;