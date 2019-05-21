import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdMenu } from 'react-icons/io';
import Store from '../../Store';
import { Types, action } from '../../Actions';
import dashkioskIcon from '../../Resources/Images/dashkiosk.svg';
import Swap from '../Swap';
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keycloak: null
        };
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
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
                <button className="btn btn-noframe-dark navbar-brand mr-0" style={{ fontSize: "30px", marginTop: "-3px" }} onClick={ this.handleMenuOpen }>
                    <IoMdMenu />
                </button>
                <div className="collapse navbar-collapse">
                </div>
                <div>
                    <div hidden={ !this.props.useBranding }>
                        <img src={this.props.stamp} width="auto" height="50" alt='logo' draggable="false" />
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return ({
        socketConnected: state.admin.socketConnected,
        useBranding: state.settings.useBranding,
        stamp: state.settings.stamp,
    });
}

export default withRouter(connect(mapStateToProps)(Navbar));