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
        Axios.post('/api/group/' + group.id + "/dashboard", inputs)
            .then(() => toast.success('Successfully added dashboard.'))
            .catch(() => toast.error('Failed to add dashboard.'));
    }

    moveDisplay(display) {
        const group = Store.getState().admin.groups[this.groupIndex];
        Axios.put(`/api/display/${display}/group/${group.id}`)
            .catch(() => toast.error('Failed to move display.'));
    }
}

export default Rest;