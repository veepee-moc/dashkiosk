import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import dashkioskIcon from '../../Resources/Images/dashkiosk.svg';
import ModalBroadcast from '../Modals/broadcast';
import { Button } from 'react-bootstrap';

var groups = [{
    name:'new group DZF323F',
    id:3
}, {
    name:'new group DAZDZAFF',
    id:1
}, {
    name:'new group D21DZFG',
    id:2
}, {
    name:'new group H221FGF',
    id:2
}]

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
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
                <Button variant="secondary" onClick={() => { this.setState({ broadcast: true }) }}>broadcast</Button>
                <ModalBroadcast groups={groups} show={this.state.broadcast} onHide={() => { this.setState({ broadcast: false }) }} />
                </div>
                <div className="spinner-grow text-light" hidden={this.props.connected}>
                    <span className="sr-only">Loading...</span>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);