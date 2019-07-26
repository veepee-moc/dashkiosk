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
        this.Rest = Rest;
    }

    renderDashboard() {
        return this.props.dashboards.map((dashboard, key) =>
                <Dashboard groupId={ this.props.group.id } dashboardId={dashboard.id} key={key} />
        );
    }

    renderDisplays() {
        return this.props.displays.map((display, key) =>
            <CSSTransition key={ key } timeout={ 500 } classNames="fade">
                <li className="list-layout-item p-1" key={ key } style={{ width: 100 / this.props.group.layoutSize + '%' }}>
                    <Draggable type="Display">
                        <Display groupId={ this.props.groupId } displayId={display.id} />
                    </Draggable>
                </li>
            </CSSTransition>
        );
    }

    render() {
        return (
            <div>
                <Collapse collapsed={ this.props.toggleGroupMenu }>
                    <GroupMenu groupId={ this.props.groupId } />
                </Collapse>
                <div className="card-body p-1 pt-2">
                    <ul className="list-layout">
                        <TransitionGroup>
                            { this.renderDisplays() }
                        </TransitionGroup>
                    </ul>
                </div>
                <div>
                    <ul className="list-group list-group-flush">
                        <DraggableList className="pt-2" droppableId={this.props.groupId}>
                            { this.renderDashboard() }
                        </DraggableList>
                    </ul>
                </div>
            </div>
        );        
    }
};

function mapStateToProps(state, ownProps) {
    return {
        group: state.Data.Groups.find(g => g.id === ownProps.groupId),
        displays: state.Data.Displays.filter(d => d.groupId === ownProps.groupId),
        dashboards: state.Data.Dashboards.filter(d => d.groupId === ownProps.groupId),
    };
}

export default connect(mapStateToProps)(GroupBody);