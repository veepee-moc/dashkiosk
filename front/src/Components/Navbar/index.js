import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
                    <img src="images/dashkiosk.svg" style={{marginTop: "-10px"}} width="50" height="50" alt="" />
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
                <div className="spinner-grow text-light">
                    <span className="sr-only">Loading...</span>
                </div>
            </nav>
        );
    }
}
        
export default withRouter(Navbar);