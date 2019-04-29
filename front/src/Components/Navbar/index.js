import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdMenu } from 'react-icons/io';
import config from '../../config';
import dashkioskIcon from '../../Resources/Images/dashkiosk.svg';
import ModalBroadcast from '../Modals/broadcast';
import Rest from './Rest';
import Store from '../../Store';
import { Types, action } from '../../Actions';
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keycloak: null
        };
        this.Rest = new Rest(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
    }

    componentDidMount() {
        this.Rest.getKeycloakLogout();
    }

    handleMenuOpen() {
        Store.dispatch(action(Types.SetAdminState, { toggleMenu: true }));
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-white fixed-top border-bottom">
                <a className="navbar-brand navbar-logo-centered" href="#" draggable="false">
                    <img src={dashkioskIcon} width="50" height="50" alt="dashkiosk icon" draggable="false" />
                    <span className="font-weight-bold">Dashkiosk</span>
                </a>
                <button className="btn btn-noframe-light navbar-brand mr-0" style={{ fontSize: "30px", marginTop: "-3px" }} onClick={ this.handleMenuOpen }>
                    <IoMdMenu />
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#" draggable="false">History</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://dashkiosk.readthedocs.io/en/v2.7.3/usage.html#administration" draggable="false">Documentation</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item" hidden={ !this.state.keycloak }>
                            <a href={ this.state.keycloak } className="btn btn-outline-light mr-2">Logout</a>
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-light mr-2"
                                onClick={ () => this.setState({ broadcast: true }) }
                            >
                                Broadcast
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-light mr-2" onClick={ this.Rest.addNewGroup }>Add new group</button>
                        </li>
                        <li className={ `nav-item spinner-grow text-light ${ this.props.socketConnected ? 'invisible' : 'visible' }`}>
                            <span className="sr-only">Loading...</span>
                        </li>
                        { config.branding !== 'default' &&
                            <li className="nav-item">
                                <img src={config.stamp} width="auto" height="50" alt={`logo-${config.branding}`} draggable="false" />
                        </li> }
                    </ul>
                </div>
                <ModalBroadcast show={this.state.broadcast} onHide={() => { this.setState({ broadcast: false }) }} />
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return ({
        socketConnected: state.admin.socketConnected
    });
}

export default withRouter(connect(mapStateToProps)(Navbar));