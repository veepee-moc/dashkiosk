function deleteDisplay(groups, display) {
    for (const group of groups) {
        for (let i = 0; i < group.displays.length; i++) {
            if (group.displays[i].name === display.name) {
                group.displays.splice(i, 1);
                return;
            }
        }
    }
}

function setDisplay(state, display) {
    const groups = [...state.admin.groups];
    deleteDisplay(groups, display);
    const group = groups.find((v) => v.id === display.group);
    if (!group)
        return state;
    group.displays.push(display);
    group.displays.sort((a, b) => {
        if (a.name > b.name)
            return 1;
        else if (a.name < b.name)
            return -1;
        else
            return 0;
    });
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            groups: groups
        })
    });
}

export default setDisplay;