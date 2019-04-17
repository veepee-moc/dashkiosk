import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Socket from './Socket';
import Navbar from '../Navbar';
import Group from '../Group';
import Preview from '../Preview';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socketConnected: false,
            layoutSize: 3,
            groups: []
        };
        Socket(this);
    }

    renderGroups() {
        return Object.values(this.state.groups).map((group) =>
            <li className="list-layout-item" key={group.id} style={{ width: 100 / this.state.layoutSize + '%' }}>
                <Group group={group} />
            </li>
        );
    }

    render() {
        return (
            <div>
                <Navbar connected={ this.state.socketConnected } />
                <div className="container-fluid mt-3">
                    <ul className="list-layout">
                        { this.renderGroups() }
                    </ul>
                    <div className="mt-3 mb-3">
                        <Preview />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Admin);