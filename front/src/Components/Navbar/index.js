import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import dashkioskIcon from '../../Resources/Images/dashkiosk.svg';
import ModalBroadcast from '../Modals/broadcast';
import Rest from './Rest';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.Rest = new Rest();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
                <a className="navbar-brand" href="#">
                    <img src={dashkioskIcon} width="50" height="50" alt="" />
                    Dashkiosk
                </a>
                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">History</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Documentation</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="navbar-nav">
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