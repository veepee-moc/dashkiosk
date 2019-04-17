import Axios from 'axios';
import { toast } from 'react-toastify';
import localStorage from '../Receiver/localstorage';

class Rest {
    constructor(parent) {
        this.parent = parent;
        this.updateGroupName = this.updateGroupName.bind(this);
        this.updateGroupDescription = this.updateGroupDescription.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.reloadGroupDisplays = this.reloadGroupDisplays.bind(this);
        this.toggleOSD = this.toggleOSD.bind(this);
        this.preview = this.preview.bind(this);
    }

    updateGroupName(newName) {
        Axios.put('/api/group/' + this.parent.state.id, { name: newName })
            .catch(() => toast.error('Failed to edit group\'s name'));
    }

    updateGroupDescription(newDescription) {
        Axios.put('/api/group/'+ this.parent.state.id, { description: newDescription })
            .catch(() => toast.error('Failed to edit group\'s description.'));
    }

    deleteGroup() {
        Axios.delete('/api/group/'+ this.parent.state.id)
            .catch(() => toast.error('Failed to delete the group.'));
    }

    reloadGroupDisplays() {
        const promises = Object.values(this.parent.state.displays).map((display) => {
            if (display.connected)
                return Axios.post('/api/display/'+ display.name +'/action', { action: 'reload' });
        });
        Promise.all(promises)
            .then(() => toast.success('Successfully reloaded all displays.'))
            .catch(() => toast.error('Failed to reload all displays.'));
    }

    toggleOSD() {
        const enable = !Object.values(this.parent.state.displays).every((display) => !display.connected || display.osd);
        const promises = Object.values(this.parent.state.displays).map((display) => {
            if (display.connected)
                return Axios.post('/api/display/'+ display.name +'/action',
                    { action: 'osd', text: enable || !display.osd ? display.name : null });
        });
        Promise.all(promises)
            .then(() => toast.success('Successfully set OSD on all displays.'))
            .catch(() => toast.error('Failed to set OSD on all displays.'));
    }

    preview() {
        Axios.post('/api/preview/group/' + this.parent.state.id, { blob: localStorage.getItem('register') })
            .catch(() => toast.error('Failed to preview group.'));
    }
}

export default Rest;