import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../Navbar';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Navbar />
        );
    }
}

export default withRouter(Admin);