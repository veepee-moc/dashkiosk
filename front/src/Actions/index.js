const Types = {
    SetStoreState: 0,
    SetAdminState: 1,
    SetAllGroups: 2,
    SortGroups: 3,
    SetGroup: 4,
    SwapGroup: 5,
    DeleteGroup: 6,
    SetDisplay: 7,
    DeleteDisplay: 8,
    SetDragAndDrop: 9,
    IncrLayoutSize: 10,
    DecrLayoutSize: 11
};

function action(type, payload) {
    return ({ type, payload });
}

export { Types, action };