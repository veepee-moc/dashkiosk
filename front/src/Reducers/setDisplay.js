function setDisplay(state, display) {
    const groups = [...state.admin.groups];
    for (const group of groups) {
        if (group.displays[display.name])
            delete group.displays[display.name];
    }
    const group = groups.find((group) => group.id === display.group);
    group.displays[display.name] = display;
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            groups: groups
        })
    });
}

export default setDisplay;