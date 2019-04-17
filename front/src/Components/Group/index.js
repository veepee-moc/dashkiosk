import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Display from '../Display';
import EditableText from '../EditableText';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdTrash, IoMdRefresh, IoMdLocate } from 'react-icons/io';
import Swap from '../Swap';
import localStorage from '../Receiver/localstorage'

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: 'Unassigned',
            description: 'Newly created group',
            displays: [],
            layoutSize: 3
        };
        this.updateGroupInfo = this.updateGroupInfo.bind(this);
        this.handleNameUpdate = this.handleNameUpdate.bind(this);
        this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleOSD = this.handleOSD.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
    }

    updateGroupInfo() {
        if (this.props.group) {
            this.setState({
                id: this.props.group.id,
                title: this.props.group.name,
                description: this.props.group.description,
                displays: this.props.group.displays
            });
        }
    }

    renderDisplays() {
        var layoutSize = 0;
        const displays = [];
        for (const index in this.state.displays) {
            var i = Math.floor(layoutSize / this.state.layoutSize);
            if (!displays[i])
                displays[i] = [];
            displays[i].push(this.state.displays[index]);
            ++layoutSize;
        }
        return (
            displays.map((displaysToRender, index) => {
                return (
                    <div className="row" key={index}>
                        {displaysToRender.map((display) => {
                            return (
                                <div className="col-sm p-1" style={{maxWidth: 100 / this.state.layoutSize + '%'}} key={display.id}>
                                    <Display display={display} />
                                </div>
                            );
                        })}
                    </div>
                );
            })
        );
    }

    componentDidMount() {
        this.updateGroupInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.group !== prevProps.group)
            this.updateGroupInfo();
    }

    handleNameUpdate(newName) {
        Axios.put('/api/group/'+ this.state.id, { name: newName })
            .catch(() => toast.error('Failed to edit group\'s name'));
    }

    handleDescriptionUpdate(newDescription) {
        Axios.put('/api/group/'+ this.state.id, { description: newDescription })
            .catch(() => toast.error('Failed to edit group\'s description.'));
    }

    handleDelete() {
        Axios.delete('/api/group/'+ this.state.id)
            .catch(() => toast.error('Failed to delete the group.'));
    }

    handleRefresh() {
        const promises = Object.values(this.state.displays).map((display) => {
            if (display.connected)
                return Axios.post('/api/display/'+ display.name +'/action', { action: 'reload' });
        });
        Promise.all(promises)
            .then(() => toast.success('Successfully reloaded all displays.'))
            .catch(() => toast.error('Failed to reload all displays.'));
    }

    handleOSD() {
        const enable = !Object.values(this.state.displays).every((display) => !display.connected || display.osd);
        const promises = Object.values(this.state.displays).map((display) => {
            if (display.connected)
                return Axios.post('/api/display/'+ display.name +'/action',
                    { action: 'osd', text: enable || !display.osd ? display.name : null });
        });
        Promise.all(promises)
            .then(() => toast.success('Successfully set OSD on all displays.'))
            .catch(() => toast.error('Failed to set OSD on all displays.'));
    }

    handlePreview() {
        Axios.post('/api/preview/group/' + this.state.id, { blob: localStorage.getItem('register') })
            .catch(() => toast.error('Failed to preview group.'));
    }

    render() {
        return (
            <div className="card">
                <div className="card-header pt-1 pr-2 pb-0 pl-2">
                    <Swap className="float-right" control={!(Object.keys(this.state.displays).length === 0)}>
                        <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.handleDelete }>
                            <IoMdTrash />
                        </button>
                        <div hidden={ Object.values(this.state.displays).find((obj) => obj.connected) === undefined }>
                            <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.handleRefresh }>
                                <IoMdRefresh />
                            </button>
                            <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.handleOSD }>
                                <IoMdLocate />
                            </button>
                        </div>
                    </Swap>
                    <EditableText className="card-title mb-0" text={ this.state.title }
                        onSubmit={ this.handleNameUpdate } />
                    <EditableText className="card-subtitle text-muted m-0 mb-1" text={ this.state.description }
                        onSubmit={ this.handleDescriptionUpdate } />
                </div>
                <div className="card-body pt-2 pb-2">
                    { this.renderDisplays() }
                </div>
                <div className="btn-group btn-group-sm">
                    <button type="button" className="btn btn-light w-50 border-right rounded-0">
                        Add a new dashboard
                    </button>
                    <button type="button" className="btn btn-light w-50 border-left rounded-0" onClick={ this.handlePreview }>
                        Preview
                    </button>
                </div>
            </div>
        );
    }
};

export default withRouter(Group);