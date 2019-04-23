import React, { Component } from 'react';
import { connect } from 'react-redux';
import Display from '../../Display';
import Dashboard from '../../Dashboard'

class GroupBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutSize: 3
        };
    }

    renderDashboard() {
        return this.props.dashboards.map((key) =>
            <Dashboard groupIndex={ this.props.groupIndex } dashboardKey={ key } />
        );
    }

    renderDisplays() {
        return this.props.displays.map((key) =>
            <li className="list-layout-item p-1" key={ key } style={{ width: 100 / this.state.layoutSize + '%' }}>
                <Display groupIndex={ this.props.groupIndex } displayKey={ key } />
            </li>
        );
    }

    render() {
        return (
            <div>
                <div className="card-body p-1 pt-2 pb-2">
                    <ul className="list-layout">
                        { this.renderDisplays() }
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