import Axios from 'axios';
import { toast } from 'react-toastify';
import localStorage from '../Receiver/localstorage';
import Store from '../../Redux/Store';

const Rest = {
    updateGroupName: (newName, groupId) => {
        Axios.patch(`/api/group/${groupId}`, { name: newName })
            .catch(() => toast.error('Failed to edit group\'s name'));
    },

    updateGroupDescription: (newDescription, groupId) => {
        Axios.patch(`/api/group/${groupId}`, { description: newDescription })
            .catch(() => toast.error('Failed to edit group\'s description.'));
    },

    updadeGroupLayoutSize: (newLayoutSize, groupId) => {
        if (newLayoutSize < 1)
            newLayoutSize = 1;
        else if (newLayoutSize > 10)
            newLayoutSize = 10;
        Axios.patch(`/api/group/${groupId}`, { layoutSize: newLayoutSize })
            .catch((err) => toast.error(`Failed to edit group's layout size: ${err.message}`))
    },

    deleteGroup: (groupId) => {
        Axios.delete(`/api/group/${groupId}`)
            .catch(() => toast.error('Failed to delete the group.'));
    },

    reloadGroupDisplays: (groupId) => {
        const group = Store.getState().Admin.Groups[groupId];
        const promises = Object.values(group.displays).map((display) => {
            if (display.connected)
                return Axios.post('/api/display/'+ display.name +'/action', { action: 'reload' });
            else
                return null;
        });
        Promise.all(promises)
            .then(() => toast.success('Successfully reloaded all displays.'))
            .catch(() => toast.error('Failed to reload all displays.'));
    },

    toggleOSD: (groupId) => {
        const group = Store.getState().Admin.Groups[groupId];
        const enable = !Object.values(group.displays).every((display) => !display.connected || display.osd);
        const promises = Object.values(group.displays).map((display) => {
            if (display.connected)
                return Axios.post('/api/display/'+ display.name +'/action',
                    { action: 'osd', text: enable || !display.osd ? display.name : null });
            else
                return null;
        });
        Promise.all(promises)
            .then(() => toast.success('Successfully set OSD on all displays.'))
            .catch(() => toast.error('Failed to set OSD on all displays.'));
    },

    preview: (groupId) => {
        Axios.post(`/api/group/${groupId}`, { blob: localStorage.getItem('register') })
            .catch(() => toast.error('Failed to preview group.'));
    },

    addDashboard: (inputs, groupId) => {
        Object.assign(inputs, { groupId });
        if (inputs.template.name !== 'None')
            Axios.post(`/api/multi-dashboards`, { urls: inputs.url, template: inputs.template })
                .then((res) => Axios.post(`/api/dashboard`, Object.assign(inputs, { url: res.data.url })))
                .catch((err) => toast.error(`Failed to add dashboard: ${err.message}`));
        else
            Axios.post(`/api/dashboard`, inputs)
                .catch((err) => toast.error(`Failed to add dashboard: ${err.message}`));
    },

    saveDashboard: (inputs) => {
        const body = {...inputs };
        delete body.template;

        Axios.post(`/api/dashboard/saved`, body)
            .then(ret => toast.success(ret.data.message))
            .catch((err) => toast.error(`Failed to save dashboard: ${err.message}`));
    },

    deleteDashboard: (dashboardId, dashboardUrl) => {
        const reg = new RegExp(/^https?:\/\/((([0-9]{1,3}\.){1,3}[0-9]{1,3})|(localhost)):[0-9]{4}\/api\/public\/dashkiosk[a-z0-9_]+(\.[a-z]*)?$/);
        if (reg.test(dashboardUrl)) {
            const image = dashboardUrl.split('/api/public/')[1];
            Axios.delete(`/api/${image}`);
        }
        Axios.delete(`/api/dashboard/${dashboardId}`)
            .catch(() => toast.error('Failed to remove dashboard.'));
    },

    editDashboard: (inputs, dashboardId) => {
        Axios.put(`/api/dashboard/${dashboardId}`, inputs)
            .catch(() => toast.error('Failed to edit dashboard.'));
    },

    moveDisplay: (displayId, groupId) => {
        const display = Store.getState().Data.Displays.find(disp => disp.id === displayId);
        Axios.patch(`/api/display/${display.id}`, { groupId })
            .catch(() => toast.error('Failed to move display.'));
    },

    editDisplay: (inputs, displayId) => {
        Axios.patch(`/api/display/${displayId}`, inputs)
            .catch(() => toast.error('Failed to edit display.'));
    },

    deleteDisplay: (displayId) => {
        Axios.delete(`/api/display/${displayId}`)
            .catch(() => toast.error('Failed to delete display.'));
    },

    moveDashboard: (dashboardIndex, groupId) => {
        const dashboard = Store.getState().Data.Dashboards.find(dash => dash.id === dashboardIndex);
        if (dashboard.groupId === groupId)
            return;
        Axios.patch(`/api/dashboard/${dashboardIndex}`, { groupId })
            .catch((err) => toast.error(`Failed to move dashboard: ${err.message}`));
    },

    copyDashboard: (dashboardIndex, groupId) => {
        const dashboard = Store.getState().Data.Dashboards.find(dash => dash.id === dashboardIndex);
        if (dashboard.groupId === groupId)
            return;
        Axios.post(`/api/dashboard`, dashboard)
            .catch((err) => toast.error(`Failed to copy dashboard: ${err.message}`));
    },

    addTagToGroup: (tagId, groupId) => {
        Axios.post(`/api/grouptag/${tagId}/group/${groupId}`)
            .then(() => toast.success('Add tag to group'))
            .catch((err) => toast.error(`Failed to add tag to a group: ${err.message}`));
    }
}

export default Rest;