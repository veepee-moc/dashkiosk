import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdTrash, IoMdRefresh, IoMdLocate } from 'react-icons/io';
import Rest from './Rest';
import EditableText from '../EditableText';
import Swap from '../Swap';
import Display from '../Display';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
        this.Rest = new Rest(this);
        this.updateGroupInfo = this.updateGroupInfo.bind(this);
        this.renderDisplays = this.renderDisplays.bind(this);
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

    componentDidMount() {
        this.updateGroupInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.group !== prevProps.group)
            this.updateGroupInfo();
    }

    renderDisplays() {
        return Object.values(this.state.displays).map((display) =>
            <CSSTransition key={display.id} classNames="fade" timeout={{ enter: 500, exit: 300 }}>
                <li className="list-layout-item" key={display.id} style={{ width: 100 / this.state.layoutSize + '%' }}>
                    <Display display={display} />
                </li>
            </CSSTransition>
        );
    }

    render() {
        return (
            <div className="card">
                <div className="card-header pt-1 pr-2 pb-0 pl-2">
                    <Swap className="float-right" control={!(Object.keys(this.state.displays).length === 0)}>
                        <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.Rest.deleteGroup }>
                            <IoMdTrash />
                        </button>
                        <div hidden={ Object.values(this.state.displays).find((obj) => obj.connected) === undefined }>
                            <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.Rest.reloadGroupDisplays }>
                                <IoMdRefresh />
                            </button>
                            <button className="btn btn-noframe-dark p-1 pl-2 pr-2" onClick={ this.Rest.toggleOSD }>
                                <IoMdLocate />
                            </button>
                        </div>
                    </Swap>
                    <EditableText className="card-title mb-0" text={ this.state.title }
                        onSubmit={ this.Rest.updateGroupName } />
                    <EditableText className="card-subtitle text-muted m-0 mb-1" text={ this.state.description }
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
                    <button type="button" className="btn btn-light w-50 border-right rounded-0">
                        Add a new dashboard
                    </button>
                    <button type="button" className="btn btn-light w-50 border-left rounded-0" onClick={ this.Rest.preview }>
                        Preview
                    </button>
                </div>
            </div>
        );
    }
};

export default withRouter(Group);