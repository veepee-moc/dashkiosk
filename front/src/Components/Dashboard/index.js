import React, { Component } from 'react';
import { IoMdCreate, IoMdTimer, IoMdResize } from 'react-icons/io';
import { connect } from 'react-redux';
import './Dashboard.css';
import EditableText from '../EditableText';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <li className={`container float-right bg-color-transition list-group-item py-0 pl-1 ${ this.props.dashboard.active ? "active light-blue" : "" }`}>
                <span className="row align-items-center">
                    <a className={`col color-transition ml-1 name ${ this.props.dashboard.active ? "text-white" : "text-dark" }`} href={ this.props.dashboard.url } target="_blank" rel="noopener noreferrer">
                        { this.props.dashboard.description ? this.props.dashboard.description : this.props.dashboard.url }
                    </a>
                    <span className="col-md-auto px-0">
                        <IoMdResize/>
                    </span>
                    <span className="col-md-auto color-transition px-1">
                        <span className="ml-1">
                            <EditableText showButton={ false } text={ this.props.dashboard.url } onSubmit={ () => console.log("YO") } />
                        </span>
                    </span>
                    <span className="col-md-auto color-transition px-1">
                        <IoMdTimer/>
                        <span className="ml-1">2s</span>
                    </span>
                    <button className={`btn ${ this.props.dashboard.active ? "btn-noframe-light" : "btn-noframe-dark"} py-1 pl-2 pr-2 color-transition col-md-auto`}>
                        <IoMdCreate />
                    </button>
                </span>
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