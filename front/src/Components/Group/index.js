import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdTrash, IoMdRefresh, IoMdLocate, IoMdContract } from 'react-icons/io';
import Rest from './Rest';
import EditableText from '../EditableText';
import Swap from '../Swap';
import Display from '../Display';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { SortableHandle } from 'react-sortable-hoc';
import Droppable from '../DragAndDrop/Droppable';
import ModalDashboard from '../Modals/dashboard';

const DragHandle = SortableHandle(() =>
    <button className="btn btn-noframe-dark p-1 pl-2 pr-2">
        <IoMdContract />
    </button>
);

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutSize: 3
        };
        this.Rest = new Rest(this);
        this.renderDisplays = this.renderDisplays.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    renderDisplays() {
        return Object.values(this.props.group.displays).map((display) =>
            <CSSTransition key={display.id} classNames="fade" timeout={{ enter: 500, exit: 300 }}>
                <li className="list-layout-item" key={display.id} style={{ width: 100 / this.state.layoutSize + '%' }}>
                    <Display display={display} />
                </li>
            </CSSTransition>
        );
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <Droppable types={["Display"]}>
                <div className="card">
                    <div className="card-header pt-1 pr-2 pb-0 pl-2">
                        <div className="float-right">
                            <Swap className="float-left" control={!(Object.keys(this.props.group.displays).length === 0)}>
                                <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.Rest.deleteGroup }>
                                    <IoMdTrash />
                                </button>
                                <div hidden={ Object.values(this.props.group.displays).find((obj) => obj.connected) === undefined }>
                                    <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.Rest.reloadGroupDisplays }>
                                        <IoMdRefresh />
                                    </button>
                                    <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.Rest.toggleOSD }>
                                        <IoMdLocate />
                                    </button>
                                </div>
                            </Swap>
                            <DragHandle className="float-right" />
                        </div>
                        <EditableText className="card-title mb-0" text={ this.props.group.name }
                            onSubmit={ this.Rest.updateGroupName } />
                        <EditableText className="card-subtitle text-muted m-0 mb-1" text={ this.props.group.description }
                            onSubmit={ this.Rest.updateGroupDescription } />
                    </div>
                    <div className="card-body pt-2 pb-2">
                        <ul className="list-layout">
                            <TransitionGroup>
                                { this.renderDisplays() }
                            </TransitionGroup>
                        </ul>
                    </div>
                    <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-light w-50 border-right rounded-0" onClick={ this.openModal }>
                            Add a new dashboard
                        </button>
                        <button type="button" className="btn btn-light w-50 border-left rounded-0" onClick={ this.Rest.preview }>
                            Preview
                        </button>
                    </div>
                    <ModalDashboard show={this.state.showModal} rest={this.Rest}
                        group={{ name: this.props.group.name, id: this.props.group.id }} onHide={this.closeModal} />
                </div>
            </Droppable>
        );
    }
};

export default withRouter(Group);