import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Rest from './Rest';
import Droppable from '../DragAndDrop/Droppable';
import GroupHeader from './GroupHeader';
import GroupBody from './GroupBody';
import Store from '../../Store';
import { Types, action } from '../../Actions';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutSize: 3
        };
        this.Rest = new Rest(this.props.groupIndex);
        this.onDrop = this.onDrop.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    onDrop(dropEffect, dnd) {
        switch (dnd.type) {
            case "Display":
                this.Rest.moveDisplay(dnd.object.props.displayKey);
                return;
            case "Dashboard":
                if (dropEffect === "move")
                    this.Rest.moveDashboard(dnd.object.props.groupIndex, dnd.object.props.dashboardKey);
                else if (dropEffect === "copy")
                    this.Rest.copyDashboard(dnd.object.props.groupIndex, dnd.object.props.dashboardKey);
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
                    <GroupHeader groupIndex={ this.props.groupIndex }
                        onToggleGroupMenu={ (toggle) => this.setState({ toggleGroupMenu: toggle }) } />
                    <GroupBody groupIndex={ this.props.groupIndex } toggleGroupMenu={ this.state.toggleGroupMenu } />
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
        group: state.admin.groups[ownProps.groupIndex]
    });
}

export default withRouter(connect(mapStateToProps)(Group));