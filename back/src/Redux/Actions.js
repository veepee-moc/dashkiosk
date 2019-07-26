const Types = {
    SetConfigState: "SetConfigState",
    LoadModel: "LoadModel",
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
    NewBroadcast: "NewBroadcast"
};

function action(type, payload) {
    return { type, payload };
}

module.exports = { Types, action };