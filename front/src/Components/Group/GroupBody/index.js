import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { IoMdAdd, IoMdRemove, IoMdArrowDown } from 'react-icons/io';
import Collapse from '../../Collapse';
import Display from '../../Display';
import Dashboard from '../../Dashboard'
import Draggable from '../../DragAndDrop/Draggable';
import './GroupBody.css';

class GroupBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutSize: 3,
            toggleMenu: false
        };
        this.setLayoutSize = this.setLayoutSize.bind(this);
    }

    setLayoutSize(incr) {
        var newLayoutSize = this.state.layoutSize + incr;
        if (newLayoutSize < 1)
            newLayoutSize = 1;
        this.setState({
            layoutSize: newLayoutSize
        });
    }

    renderDashboard() {
        return this.props.dashboards.map((key) =>
            <Draggable type="Dashboard" key={ key }>
                <Dashboard groupIndex={ this.props.groupIndex } dashboardKey={ key } />
            </Draggable>
        );
    }

    renderDisplays() {
        return this.props.displays.map((key) =>
            <CSSTransition key={ key } timeout={ 500 } classNames="fade">
                <li className="list-layout-item p-1" key={ key } style={{ width: 100 / this.state.layoutSize + '%' }}>
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
                <button className="btn btn-noframe-dark btn-sm w-100 rounded-0"
                    onClick={ () => this.setState({ toggleMenu: !this.state.toggleMenu }) }>
                    <IoMdArrowDown className={ `gp-body-collapse-arrow ${ this.state.toggleMenu ? 'active' : '' }` } />
                </button>
                <Collapse collapsed={ this.state.toggleMenu }>
                    <div className="w-100" style={{ boxShadow: "0px 0px 2px black inset" }}>
                        <div className="text-center p-2">
                            Layout Size
                            <span className="border rounded p-1 ml-1">
                                <button className="btn btn-noframe-dark btn-sm mx-1 py-0 px-1 mb-1" onClick={ () => this.setLayoutSize(-1) }>
                                    <IoMdRemove />
                                </button>
                                { this.state.layoutSize }
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
        dashboards: group ? Object.keys(group.dashboards) : null
    };
}

export default connect(mapStateToProps)(GroupBody);