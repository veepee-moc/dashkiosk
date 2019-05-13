function updateGroupTag(state, tag) {
    const tags = [...state.admin.groupTags];
    for (var i = 0; i < tags.length; i++)
        if (tags[i].id === tag) {
            tags[i] = tag;
            return Object.assign({}, state, {
                admin: Object.assign({}, state.admin, {
                    groupTags: tags
                })
            });
        }
    return state;
}

export default updateGroupTag;