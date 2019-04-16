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
        var layoutSize = 0;
        const groups = [];
        for (const index in this.state.groups) {
            var i = Math.floor(layoutSize / this.state.layoutSize);
            if (!groups[i])
                groups[i] = [];
            groups[i].push(this.state.groups[index]);
            ++layoutSize;
        }
        return (
            groups.map((groupsToRender, index) => {
                return (
                    <div className="row mb-2" key={index}>
                        {groupsToRender.map((group) => {
                            return (
                                <div className="col-sm" style={{maxWidth: 100 / this.state.layoutSize + '%'}} key={group.id}>
                                    <Group group={group} />
                                </div>
                            );
                        })}
                    </div>
                );
            })
        );
    }

    render() {
        return (
            <div>
                <Navbar connected={ this.state.socketConnected } />
                <div className="container-fluid mt-3">
                    { this.renderGroups() }
                <Preview />
                </div>
            </div>
        );
    }
}

export default withRouter(Admin);