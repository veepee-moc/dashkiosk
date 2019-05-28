import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Collapse from '../../Collapse';
import GroupMenu from './GroupMenu';
import Display from '../../Display';
import Dashboard from '../../Dashboard'
import Draggable from '../../DragAndDrop/Draggable';
import Rest from '../Rest';
import './GroupBody.css';
import DraggableList from '../../DragAndDrop/DraggableList';

class GroupBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleMenu: false,
            toggleTagsMenu: false
        };
        this.Rest = new Rest(this.props.groupIndex);
    }

    renderDashboard() {
        return this.props.dashboards.map((dashboard, key) =>
            <CSSTransition key={ key } timeout={ 500 } classNames="fade">
                    <Dashboard groupIndex={ this.props.groupIndex } dashboardKey={ key } nbDashboard={ this.props.dashboards.length }/>
            </CSSTransition>
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
                    <GroupMenu groupIndex={this.props.groupIndex} />
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
                        <TransitionGroup>
                            <DraggableList onDragEnd={(info) => console.log(info)} droppableId={this.props.groupIndex}>
                                { this.renderDashboard() }
                            </DraggableList>
                        </TransitionGroup>
                    </ul>
                </div>
            </div>
        );        
    }
};

function mapStateToProps(state, ownProps) {
    const group = state.admin.groups[ownProps.groupIndex];
    if (!group)
        return { displays: 0, dashboards: [] }
    return {
        displays: Object.keys(group.displays),
        dashboards: group.dashboards,
        layoutSize: group.layoutSize
    };
}

export default connect(mapStateToProps)(GroupBody);