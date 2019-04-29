import React, { Component } from 'react';
import { IoMdCreate, IoMdTimer, IoMdResize, IoMdSync } from 'react-icons/io';
import { connect } from 'react-redux';
import './Dashboard.css';
import EditableText from '../EditableText';
import ModalEditDashboard from '../Modals/editDashboard'
import Rest from '../Group/Rest'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.rest = new Rest(this.props.groupIndex);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <li className={`container float-right bg-color-transition list-group-item py-0 pl-1 ${ this.props.dashboard.active ? "active light-blue" : "" }`}>
                <span className="row align-items-center">
                    <a className={`col color-transition ml-1 name ${ this.props.dashboard.active ? "text-white" : "text-dark" }`} href={ this.props.dashboard.url } target="_blank" rel="noopener noreferrer">
                        { this.props.dashboard.description ? this.props.dashboard.description : this.props.dashboard.url }
                    </a>
                    <span className="col-md-auto pr-1">
                        <span className="px-0" hidden={ this.props.dashboard.viewport === null ? true : false }>
                            <IoMdResize/>
                        </span>
                        <span className="color-transition pl-1 pr-0" hidden={ this.props.dashboard.viewport === null ? true : false }>
                            { this.props.dashboard.viewport }
                        </span>
                        <span className="color-transition pl-1 pr-0" hidden={ this.props.dashboard.timeout === null ? true : false }>
                            <IoMdSync/> { this.props.dashboard.timeout }s
                        </span>
                        <span className="color-transition pl-1 pr-0" hidden={ this.props.dashboard.delay === null ? true : false }>
                            <IoMdTimer/>
                        </span>
                        <span className="color-transition px-0" hidden={ this.props.dashboard.delay === null ? true : false }>
                            { this.props.dashboard.delay }s
                        </span>
                    </span>
                    <button
                    onClick={ this.openModal }
                    className={`btn ${ this.props.dashboard.active ? "btn-noframe-light" : "btn-noframe-dark"} py-1 pl-2 pr-2 color-transition col-md-auto`}>
                        <IoMdCreate />
                    </button>
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
