function deleteDisplay(state, display) {
    const groups = [...state.admin.groups];
    for (const group of groups) {
        if (group.displays[display.name])
            delete group.displays[display.name];
    }
    return Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            groups: groups
        })
    });
}

export default deleteDisplay;