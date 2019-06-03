function deleteDisplay(state, display) {
    const groups = [...state.admin.groups];
    const group = groups.find((v) => v.id === display.group);
    if (!group)
        return state;
    for (let i = 0; i < group.displays.length; i++) {
        if (group.displays[i].name === display.name)
            group.displays.splice(i, 1);
    }
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            groups: groups
        })
    });
}

export default deleteDisplay;