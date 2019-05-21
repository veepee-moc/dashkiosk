import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoMdLocate, IoMdRefresh, IoMdTrash, IoMdMove, IoMdArrowDown } from 'react-icons/io';
import { SortableHandle } from 'react-sortable-hoc';
import Rest from '../Rest';
import Swap from '../../Swap';
import EditableText from '../../EditableText';
import './GroupHeader.css';

const DragHandle = SortableHandle(() =>
    <button className="btn btn-noframe-dark p-1 pl-2 pr-2">
        <IoMdMove />
    </button>
);

class GroupHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleGroupMenu: false
        };
        this.Rest = new Rest(this.props.groupIndex);
        this.handleToggleGroupMenu = this.handleToggleGroupMenu.bind(this);
    }

    handleToggleGroupMenu() {
        this.setState({
            toggleGroupMenu: !this.state.toggleGroupMenu
        }, () => this.props.onToggleGroupMenu(this.state.toggleGroupMenu));
    }

    render() {
        return (
            <div className="card-header pt-1 pr-2 pb-0 pl-2">
                <div className="float-right">
                    <div>
                        <Swap className="float-left" control={ this.props.group.empty }>
                            <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.Rest.deleteGroup }>
                                <IoMdTrash />
                            </button>
                            <div hidden={ !this.props.group.displayConnected }>
                                <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.Rest.reloadGroupDisplays }>
                                    <IoMdRefresh />
                                </button>
                                <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.Rest.toggleOSD }>
                                    <IoMdLocate />
                                </button>
                            </div>
                        </Swap>
                        <DragHandle />
                    </div>
                    <button className="btn btn-noframe-dark p-1 px-2 mb-1 float-right"
                        onClick={ this.handleToggleGroupMenu }>
                        <IoMdArrowDown className={ `gp-header-collapse-arrow ${ this.state.toggleGroupMenu ? 'active' : '' }` } />
                    </button>
                </div>
                <div className="card-title mb-0">
                    <EditableText text={ this.props.group.name }
                        onSubmit={ this.Rest.updateGroupName } />
                </div>
                <div className="card-subtitle text-muted m-0 mb-1">
                    <EditableText text={ this.props.group.description }
                        onSubmit={ this.Rest.updateGroupDescription } />
                </div>
            </div>
        );
    }
};

function mapStateToProps(state, ownProps) {
    const group = state.admin.groups[ownProps.groupIndex];
    if (group)
        return {
            group: {
                name: group.name,
                description: group.description,
                empty: Object.keys(group.displays).length === 0,
                displayConnected: Object.values(group.displays).find((obj) => obj.connected) !== undefined
            }
        };
    else
        return {
            group: {
                name: "Unknown",
                description: "Can't find this group",
                empty: true,
                displayConnected: false
            }
        }
}

export default connect(mapStateToProps)(GroupHeader);