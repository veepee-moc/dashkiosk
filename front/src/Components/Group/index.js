import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Rest from './Rest';
import Droppable from '../DragAndDrop/Droppable';
import GroupHeader from './GroupHeader';
import GroupBody from './GroupBody';
import Store from '../../Redux/Store';
import { Types, action } from '../../Redux/Actions';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.Rest = Rest;
        this.onDrop = this.onDrop.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    onDrop(dropEffect, dnd) {
        switch (dnd.type) {
            case "Display":
                this.Rest.moveDisplay(dnd.object.props.displayId);
                return;
            case "Dashboard":
                if (dropEffect === "move")
                    this.Rest.moveDashboard(dnd.object.props.dashboardKey);
                else if (dropEffect === "copy")
                    this.Rest.copyDashboard(dnd.object.props.dashboardKey);
                return;
            case "GroupTag":
                this.Rest.addTagToGroup(dnd.object.props.tagid);
                return;
            default:
                return;
        }
    }

    openModal() {
        Store.dispatch(action(Types.SetModal, {
            modal: {
                group: this.props.group,
                rest: this.Rest,
                show: 'addDashboard'
            }
        }));
    }

    render() {
        return (
            <Droppable types={["Display", "Dashboard", "GroupTag"]} onDrop={ this.onDrop }>
                <div className="card">
                    <GroupHeader groupId={ this.props.groupId } searched={ this.props.searched }
                        onToggleGroupMenu={ (toggle) => this.setState({ toggleGroupMenu: toggle }) } />
                    <GroupBody groupId={ this.props.groupId } toggleGroupMenu={ this.state.toggleGroupMenu } />
                    <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-light w-50 border-right rounded-0"
                            onClick={() => this.openModal()}>
                            Add a new dashboard
                        </button>
                        <button type="button" className="btn btn-light w-50 border-left rounded-0" onClick={ this.Rest.preview }>
                            Preview
                        </button>
                    </div>
                </div>
            </Droppable>
        );
    }
};

function mapStateToProps(state, ownProps) {
    return ({
        group: state.Data.Groups.find(g => g.id === ownProps.groupId)
    });
}

export default withRouter(connect(mapStateToProps)(Group));