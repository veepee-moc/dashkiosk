import React, { Component } from 'react';
import { IoMdCreate } from 'react-icons/io';
import { connect } from 'react-redux';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <li className={`bg-color-transition list-group-item p-0 ${ this.props.dashboard.active ? "active light-blue" : "" }`}>
                <a className={`color-transition ml-1 name ${ this.props.dashboard.active ? "text-white" : "text-dark" }`} href={ this.props.dashboard.url } target="_blank">
                    { this.props.dashboard.description ? this.props.dashboard.description : this.props.dashboard.url }
                </a>
                <button className={`btn ${ this.props.dashboard.active ? "btn-noframe-light" : "btn-noframe-dark"} p-1 pl-2 pr-2 float-right color-transition`}>
                    <IoMdCreate />
                </button>
            </li>
        );
    }
};

function mapStateToProps(state, ownProps) {
    return {
        dashboard: state.admin.groups[ownProps.groupIndex].dashboards[ownProps.dashboardKey]
    };
}

export default connect(mapStateToProps)(Dashboard);