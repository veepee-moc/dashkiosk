import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdMenu } from 'react-icons/io';
import Rest from './Rest';
import Store from '../../Store';
import { Types, action } from '../../Actions';
import config from '../../config';
import dashkioskIcon from '../../Resources/Images/dashkiosk.svg';
import Swap from '../Swap';
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
                <Swap className="navbar-brand navbar-logo-centered" control={ this.props.socketConnected }>
                    <a className="navbar-brand navbar-logo-centered" href="/receiver" draggable="false">
                        <img src={dashkioskIcon} width="50" height="50" alt="dashkiosk icon" draggable="false" />
                    </a>
                    <div className="nav-item spinner-grow text-dark navbar-spinner-size">
                        <span className="sr-only">Loading...</span>
                    </div>
                </Swap>
                <button className="btn btn-noframe-light navbar-brand mr-0" style={{ fontSize: "30px", marginTop: "-3px" }} onClick={ this.handleMenuOpen }>
                    <IoMdMenu />
                </button>
                <div className="collapse navbar-collapse">
                </div>
                <div>
                    <div hidden={ config.branding === 'default' }>
                        <img src={config.stamp} width="auto" height="50" alt={`logo-${config.branding}`} draggable="false" />
                    </div>
                </div>
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