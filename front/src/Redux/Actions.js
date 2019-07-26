const Types = {
    SetConfigState: "SetConfigState",
    LoadStore: "LoadStore",
    NewDashboard: "NewDashboard",
    UpdateDashboard: "UpdateDashboard",
    DeleteDashboard: "DeleteDashboard",
    NewMultiDashboard: "NewMultiDashboard",
    UpdateMultiDashboard: "UpdateMultiDashboard",
    NewDisplay: "NewDisplay",
    UpdateDisplay: "UpdateDisplay",
    DeleteDisplay: "DeleteDisplay",
    NewGroup: "NewGroup",
    UpdateGroup: "UpdateGroup",
    DeleteGroup: "DeleteGroup",
    NewGroupTag: "NewGroupTag",
    DeleteGroupTag: "DeleteGroupTag",
    UpdateGroupTag: "UpdateGroupTag",
    NewBroadcast: "NewBroadcast",
    SetSettings: "SetSettings",
    SetAdminState: "SetAdminState",
    SetDndState: "SetDndState"
};

function action(type, payload) {
    return { type, payload };
}

export { Types, action };