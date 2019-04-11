import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import Group from '../Group';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid mt-3">
                    <div className="row mb-2">
                        <div className="col-sm"><Group /></div>
                        <div className="col-sm"><Group /></div>
                        <div className="col-sm"><Group /></div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-sm"><Group /></div>
                        <div className="col-sm"><Group /></div>
                        <div className="col-sm"><Group /></div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-sm"><Group /></div>
                        <div className="col-sm"><Group /></div>
                        <div className="col-sm"><Group /></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Admin);