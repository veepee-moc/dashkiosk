const Types = {
    SetStoreState: 0,
    SetAdminState: 1,
    SetAllGroups: 2,
    SetGroup: 3,
    DeleteGroup: 4,
    SetDisplay: 5,
    DeleteDisplay: 6
};

function action(type, payload) {
    return ({ type, payload });
}

export { Types, action };