import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import Collapse from '../../Collapse';
import Display from '../../Display';
import Dashboard from '../../Dashboard'
import Draggable from '../../DragAndDrop/Draggable';
import Rest from '../Rest';
import './GroupBody.css';

class GroupBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleMenu: false
        };
        this.Rest = new Rest(this.props.groupIndex);
        this.setLayoutSize = this.setLayoutSize.bind(this);
    }

    setLayoutSize(incr) {
        this.Rest.updadeGroupLayoutSize(this.props.layoutSize + incr);
    }

    renderDashboard() {
        var nbDashboard = this.props.dashboards.length;
        return this.props.dashboards.map((key) =>
            <Draggable type="Dashboard" key={ key }>
                <Dashboard groupIndex={ this.props.groupIndex } dashboardKey={ key } nbDashboard={ nbDashboard }/>
            </Draggable>
        );
    }

    renderDisplays() {
        return this.props.displays.map((key) =>
            <CSSTransition key={ key } timeout={ 500 } classNames="fade">
                <li className="list-layout-item p-1" key={ key } style={{ width: 100 / this.props.layoutSize + '%' }}>
                    <Draggable type="Display">
                        <Display groupIndex={ this.props.groupIndex } displayKey={ key } />
                    </Draggable>
                </li>
            </CSSTransition>
        );
    }

    render() {
        return (
            <div>
                <Collapse collapsed={ this.props.toggleGroupMenu }>
                    <div className="gp-body-collapse-container bg-light">
                        <div className="text-center p-2">
                            Layout Size
                            <span className="border rounded p-1 ml-1 bg-white text-dark">
                                <button className="btn btn-noframe-dark btn-sm mx-1 py-0 px-1 mb-1" onClick={ () => this.setLayoutSize(-1) }>
                                    <IoMdRemove />
                                </button>
                                { this.props.layoutSize }
                                <button className="btn btn-noframe-dark btn-sm mx-1 py-0 px-1 mb-1" onClick={ () => this.setLayoutSize(1) }>
                                    <IoMdAdd />
                                </button>
                            </span>
                        </div>
                    </div>
                </Collapse>
                <div className="card-body p-1 pt-2 pb-2">
                    <ul className="list-layout">
                        <TransitionGroup>
                            { this.renderDisplays() }
                        </TransitionGroup>
                    </ul>
                </div>
                <div>
                    <ul className="list-group list-group-flush">
                        { this.renderDashboard() }
                    </ul>
                </div>
            </div>
        );        
    }
};

function mapStateToProps(state, ownProps) {
    const group = state.admin.groups[ownProps.groupIndex];
    return {
        displays: group ? Object.keys(group.displays) : null,
        dashboards: group ? Object.keys(group.dashboards) : null,
        layoutSize: group ? group.layoutSize : null
    };
}

export default connect(mapStateToProps)(GroupBody);