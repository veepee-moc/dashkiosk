import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoMdLocate, IoMdRefresh, IoMdTrash, IoMdMove, IoMdArrowDown } from 'react-icons/io';
import { SortableHandle } from 'react-sortable-hoc';
import Rest from '../Rest';
import Swap from '../../Swap';
import EditableText from '../../EditableText';
import './GroupHeader.css';

const DragHandle = SortableHandle(({searched, collapse}) =>
    <button className={`btn btn-noframe-dark p-1 pl-2 pr-2 ${ searched === true ? collapse === true ? 'collapse' : 'invisible' : 'visible' }`}>
        <IoMdMove />
    </button>
);

class GroupHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleGroupMenu: false
        };
        this.Rest = Rest;
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
                            <button className={`btn btn-noframe-dark p-1 pl-2 pr-2 ${ this.props.group.id === 1 ? "hidden" : "" }`} onClick={ () => this.Rest.deleteGroup(this.props.group.id) }>
                                <IoMdTrash />
                            </button>
                            <div hidden={ !this.props.group.displayConnected }>
                                <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ () => this.Rest.reloadGroupDisplays(this.props.group.id) }>
                                    <IoMdRefresh />
                                </button>
                                <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ () => this.Rest.toggleOSD(this.props.group.id) }>
                                    <IoMdLocate />
                                </button>
                            </div>
                        </Swap>
                        <DragHandle searched={ this.props.searched } collapse={ this.props.group.displayConnected || this.props.group.empty }/>
                    </div>
                    <button className="btn btn-noframe-dark p-1 px-2 mb-1 float-right"
                        onClick={ this.handleToggleGroupMenu }>
                        <IoMdArrowDown className={ `gp-header-collapse-arrow ${ this.state.toggleGroupMenu ? 'active' : '' }` } />
                    </button>
                </div>
                <div className="card-title mb-0">
                    <EditableText text={ this.props.group.name }
                        onSubmit={ (name) => this.Rest.updateGroupName(name ,this.props.group.id) } />
                </div>
                <div className="card-subtitle text-muted m-0 mb-1">
                    <EditableText text={ this.props.group.description }
                        onSubmit={ (description) => this.Rest.updateGroupDescription(description, this.props.group.id) } />
                </div>
            </div>
        );
    }
};

function mapStateToProps(state, ownProps) {
    const group = state.Data.Groups.find(g => g.id === ownProps.groupId);
    //console.log(group);
    return { 
        group: {
            id: group.id,
            name: group.name,
            description: group.description,
            empty: state.Data.Displays.find(obj => obj.groupId === ownProps.groupId) === undefined,
            displayConnected: state.Data.Displays.find((obj) => obj.groupId === ownProps.groupId && obj.connected) !== undefined
        }
    };
}

export default connect(mapStateToProps)(GroupHeader);