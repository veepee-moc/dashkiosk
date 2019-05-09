import Axios from 'axios';
import { toast } from 'react-toastify';
import localStorage from '../Receiver/localstorage';
import Store from '../../Store';

class Rest {
    constructor(groupIndex) {
        this.groupIndex = groupIndex;
        this.updateGroupName = this.updateGroupName.bind(this);
        this.updateGroupDescription = this.updateGroupDescription.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.reloadGroupDisplays = this.reloadGroupDisplays.bind(this);
        this.toggleOSD = this.toggleOSD.bind(this);
        this.preview = this.preview.bind(this);
        this.addDashboard = this.addDashboard.bind(this);
        this.editDashboard = this.editDashboard.bind(this);
        this.editDisplay = this.editDisplay.bind(this);
        this.deleteDashboard = this.deleteDashboard.bind(this);
        this.deleteDisplay = this.deleteDisplay.bind(this);
    }

    updateGroupName(newName) {
        const group = Store.getState().admin.groups[this.groupIndex];
        Axios.put('/api/group/' + group.id, { name: newName })
            .catch(() => toast.error('Failed to edit group\'s name'));
    }

    updateGroupDescription(newDescription) {
        const group = Store.getState().admin.groups[this.groupIndex];
        Axios.put('/api/group/'+ group.id, { description: newDescription })
            .catch(() => toast.error('Failed to edit group\'s description.'));
    }

    deleteGroup() {
        const group = Store.getState().admin.groups[this.groupIndex];
        Axios.delete('/api/group/'+ group.id)
            .catch(() => toast.error('Failed to delete the group.'));
    }

    reloadGroupDisplays() {
        const group = Store.getState().admin.groups[this.groupIndex];
        const promises = Object.values(group.displays).map((display) => {
            if (display.connected)
                return Axios.post('/api/display/'+ display.name +'/action', { action: 'reload' });
            else
                return null;
        });
        Promise.all(promises)
            .then(() => toast.success('Successfully reloaded all displays.'))
            .catch(() => toast.error('Failed to reload all displays.'));
    }

    toggleOSD() {
        const group = Store.getState().admin.groups[this.groupIndex];
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
    }

    preview() {
        const group = Store.getState().admin.groups[this.groupIndex];
        Axios.post('/api/preview/group/' + group.id, { blob: localStorage.getItem('register') })
            .catch(() => toast.error('Failed to preview group.'));
    }

    addDashboard(inputs) {
        const group = Store.getState().admin.groups[this.groupIndex];
        if (inputs.template.name !== 'None')
            Axios.post(`/api/multi-dashboards`, { urls: inputs.url, template: inputs.template })
                .then((res) => Axios.post(`/api/group/${group.id}/dashboard`, Object.assign(inputs, { url: res.data.url })))
                .then(() => toast.success('Successfully added dashboard.'))
                .catch((err) => toast.error(`Failed to add dashboard: ${err.message}`));
        else
            Axios.post(`/api/group/${group.id}/dashboard`, inputs)
                .then(() => toast.success('Successfully added dashboard.'))
                .catch((err) => toast.error(`Failed to add dashboard: ${err.message}`));
    }

    deleteDashboard(dashboardId, dashboardUrl) {
        const group = Store.getState().admin.groups[this.groupIndex];
        const reg = new RegExp(/^https?:\/\/((([0-9]{1,3}\.){1,3}[0-9]{1,3})|(localhost)):[0-9]{4}\/api\/public\/dashkiosk[a-z0-9_]+(\.[a-z]*)?$/);
        if (reg.test(dashboardUrl)) {
            const image = dashboardUrl.split('/api/public/')[1];
            Axios.delete(`/api/upload/${image}`);
        }
        Axios.delete(`/api/group/${group.id}/dashboard/${dashboardId}`)
            .then(() => toast.success('Successfully removed dashboard.'))
            .catch(() => toast.error('Failed to remove display.'));
    }

    editDashboard(inputs, dashboardId) {
        const group = Store.getState().admin.groups[this.groupIndex];
        Axios.put(`/api/group/${group.id}/dashboard/${dashboardId}`, inputs)
        .then(() => toast.success('Successfully edited dashboard.'))
        .catch(() => toast.error('Failed to edit dashboard.'));
    }

    moveDisplay(display) {
        const group = Store.getState().admin.groups[this.groupIndex];
        Axios.put(`/api/display/${display}/group/${group.id}`)
            .catch(() => toast.error('Failed to move display.'));
    }

    editDisplay(inputs, displayName) {
        Axios.put(`/api/display/${displayName}`, inputs)
            .then(() => toast.success('Successfully edited display.'))
            .catch(() => toast.error('Failed to edit display.'));
    }

    deleteDisplay(displayName) {
        Axios.delete(`/api/display/${displayName}`)
            .then(() => toast.success('Successfully deleted display.'))
            .catch(() => toast.error('Failed to delete display.'));
    }

    moveDashboard(srcGroupIndex, dashboardKey) {
        const group = Store.getState().admin.groups[this.groupIndex];
        const srcGroup = Store.getState().admin.groups[srcGroupIndex];
        const dashboard = srcGroup.dashboards[dashboardKey];
        const dashboardId = dashboard.id;
        if (dashboard.group === group.id)
            return;
        Axios.post(`/api/group/${group.id}/dashboard`, dashboard)
            .then(() => Axios.delete(`/api/group/${srcGroup.id}/dashboard/${dashboardId}`))
            .catch((err) => toast.error(`Failed to move dashboard: ${err.message}`));
    }

    copyDashboard(srcGroupIndex, dashboardKey) {
        const group = Store.getState().admin.groups[this.groupIndex];
        const dashboard = Store.getState().admin.groups[srcGroupIndex].dashboards[dashboardKey];
        if (dashboard.group === group.id)
            return;
        Axios.post(`/api/group/${group.id}/dashboard`, dashboard)
            .catch((err) => toast.error(`Failed to copy dashboard: ${err.message}`));
    }
}

export default Rest;