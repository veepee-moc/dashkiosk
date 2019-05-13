function deleteGroupTag(state, tag) {
    const tags = [...state.admin.groupTags];
    for (var i = 0; i < tags.length; i++)
        if (tags[i].id === tag.id) {
            tags.splice(i, 1);
            return (Object.assign({}, state, {
                admin: Object.assign({}, state.admin, {
                    groupTags: tags
                })
            }));
        }
    return state;
}

module.exports = deleteGroupTag;