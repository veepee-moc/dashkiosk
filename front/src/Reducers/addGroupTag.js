function addGroupTag(state, tag) {
    const tags = [...state.admin.groupTags];
    if (!tags.find((obj) => obj.id === tag.id))
        tags.push(tag);
    return (Object.assign({}, state, {
        admin: Object.assign({}, state.admin, {
            groupTags: tags
        })
    }));
}

export default addGroupTag;