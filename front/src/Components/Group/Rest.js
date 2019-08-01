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
        const group = Store.getState().Data.Groups.find(g => g.id === groupId);
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
        const group = Store.getState().Data.Groups.find(g => g.id === groupId);
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
        const display = Store.getState().Data.Displays.find(d => d.name === localStorage.getItem('register'));
        if (!display)
            return;
        Axios.patch(`/api/display/${display.id}`, { groupId })
            .catch(() => toast.error('Failed to preview group.'));
    },

    addDashboard: (inputs, groupId) => {
        Object.assign(inputs, { groupId });
        console.log(inputs);
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
        Axios.patch(`/api/dashboard/${dashboardId}`, inputs)
            .catch(() => toast.error('Failed to edit dashboard.'));
    },

    moveDisplay: (displayId, groupId) => {
        Axios.patch(`/api/display/${displayId}`, { groupId })
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

    addTagToGroup: (tagId, groupId) => {
        Axios.post(`/api/grouptag/${tagId}/group/${groupId}`)
            .then(() => toast.success('Add tag to group'))
            .catch((err) => toast.error(`Failed to add tag to a group: ${err.message}`));
    }
}

export default Rest;