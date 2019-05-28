import React, { Component } from 'react';
import { IoMdCreate, IoMdTimer, IoMdResize, IoMdSync, IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { connect } from 'react-redux';
import Store from '../../Store';
import { Types, action } from '../../Actions';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import './Dashboard.css';
import Rest from '../Group/Rest'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: null,
            timeout: null,
            viewport: null,
            active: false,
            url: '',
            description: '',
            id: 0
        };
        this.rest = new Rest(this.props.groupIndex);
        this.openModal = this.openModal.bind(this);
        this.updateDashboard = this.updateDashboard.bind(this);
    }

    componentDidMount() {
        this.updateDashboard();
    }

    componentDidUpdate(prevProps) {
        if (this.props.dashboard !== prevProps.dashboard) {
            this.updateDashboard();
        }
    }

    updateDashboard() {
        if (this.props.dashboard) {
            this.setState({
                delay: this.props.dashboard.delay,
                timeout: this.props.dashboard.timeout,
                viewport: this.props.dashboard.viewport,
                active: this.props.dashboard.active,
                url: this.props.dashboard.url,
                description: this.props.dashboard.description,
                id: this.props.dashboard.id
            });
        }
    }

    openModal() {
        Store.dispatch(action(Types.SetModal, {
            modal: {
                group: { id: this.props.groupIndex },
                rest: this.rest,
                dashboard: this.props.dashboard,
                show: 'editDashboard'
            }
        }));
    }

    render() {
        return (
            <li className={`container-fluid bg-color-transition list-group-item py-0 pl-1 ${ this.state.active ? "active light-blue" : "" }`}>
            <span className="row align-items-center">
                <OverlayTrigger key={'tooltip'} placement='bottom' overlay={<Tooltip id={ this.state.id }>{ this.state.description ? this.state.description : this.state.url }</Tooltip>}>
                    <a className={`col col-md-6 color-transition name text-truncate ${ this.state.active ? "text-white" : "text-dark" }`} href={ this.state.url } target="_blank" rel="noopener noreferrer">
                        { this.state.description ? this.state.description : this.state.url }
                    </a>
                </OverlayTrigger>
                <span className="col-md-6 text-right pr-1">
                    <span className="px-0" hidden={ this.state.viewport === null ? true : false }>
                        <IoMdResize/>{ this.state.viewport }
                    </span>
                    <span className="color-transition pl-1 pr-0" hidden={ this.state.timeout === null ? true : false }>
                        <IoMdSync/>{ this.state.timeout }s
                    </span>
                    <span className="color-transition pl-1 pr-0" hidden={ this.state.delay === null ? true : false }>
                        <IoMdTimer/>{ this.state.delay }s
                    </span>
                    <button
                    onClick={ this.openModal }
                    className={`btn ${ this.state.active ? "btn-noframe-light" : "btn-noframe-dark"} py-1 pl-2 pr-2 color-transition`}>
                        <IoMdCreate />
                    </button>
                </span>
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
