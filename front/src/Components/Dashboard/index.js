import React, { Component } from 'react';
import { IoMdCreate, IoMdTimer, IoMdResize, IoMdSync, IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { connect } from 'react-redux';
import './Dashboard.css';
import ModalEditDashboard from '../Modals/editDashboard'
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
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
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

    moveUp() {
        this.rest.editDashboard({rank: parseInt(this.props.dashboardKey - 1)}, this.state.id);
    }

    moveDown() {
        this.rest.editDashboard({rank: parseInt(this.props.dashboardKey + 1)}, this.state.id);
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <li className={`container-fluid bg-color-transition list-group-item py-0 pl-1 ${ this.state.active ? "active light-blue" : "" }`}>
                <span className="row align-items-center">
                    <a className={`col color-transition ml-1 name ${ this.state.active ? "text-white" : "text-dark" }`} href={ this.state.url } target="_blank" rel="noopener noreferrer">
                        { this.state.description ? this.state.description : this.state.url }
                    </a>
                    <span className="col-md-auto pr-1">
                        <span className="px-0" hidden={ this.state.viewport === null ? true : false }>
                            <IoMdResize/>{ this.state.viewport }
                        </span>
                        <span className="color-transition pl-1 pr-0" hidden={ this.state.timeout === null ? true : false }>
                            <IoMdSync/>{ this.state.timeout }s
                        </span>
                        <span className="color-transition pl-1 pr-0" hidden={ this.state.delay === null ? true : false }>
                            <IoMdTimer/>{ this.state.delay }s
                        </span>
                    </span>
                    <button
                    onClick={ this.openModal }
                    className={`btn ${ this.state.active ? "btn-noframe-light" : "btn-noframe-dark"} py-1 pl-2 pr-2 color-transition col-md-auto`}>
                        <IoMdCreate />
                    </button>
                    <span className={`color-transition pl-1 pr-0`}>
                        <button
                        onClick={ this.moveUp }
                        className={`btn ${ this.state.active ? "btn-noframe-light" : "btn-noframe-dark"} p-1 color-transition col-md-auto ${ parseInt(this.props.dashboardKey) !== 0 ? "visible" : "invisible" } `}
                        >
                            <IoMdArrowDropup/>
                        </button>
                    </span>
                    <span className={`color-transition pl-1 pr-0`}>
                        <button
                        onClick={ this.moveDown }
                        className={`btn ${ this.state.active ? "btn-noframe-light" : "btn-noframe-dark"} p-1 color-transition col-md-auto ${ parseInt(this.props.nbDashboard) !== (parseInt(this.props.dashboardKey) + 1) ? "visible" : "invisible" }`}
                        >
                            <IoMdArrowDropdown/>
                        </button>
                    </span>
                </span>
                <ModalEditDashboard
                dashboard={this.props.dashboard}
                show={this.state.showModal} rest={this.rest}
                group={{ id: this.props.groupIndex }} onHide={this.closeModal} />
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
