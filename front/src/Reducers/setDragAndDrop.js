function setDragAndDrop(state, dnd) {
    return Object.assign({}, state, {
        dnd: dnd
    });
}

export default setDragAndDrop;