import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Socket from './Socket';
import Navbar from '../Navbar';import { log } from 'util';

import Group from '../Group';

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
        const groupsArr = [];
        var layoutSize = 0;
        var groups = []
        for (const group in this.state.groups) {
            if (layoutSize % this.state.layoutSize === 0 && layoutSize !== 0) {
                groupsArr.push(groups);
                groups = [];
            }
            groups.push(this.state.groups[group]);
            ++layoutSize;
        }
        groupsArr.push(groups);
        return groupsArr.map((groupsToRender) => {
            return (
                <div className="row mb-2">
                    {groupsToRender.map((group) => {
                        return (
                            <div className="col-sm" style={{maxWidth: 100 / this.state.layoutSize +'%'}}>
                                <Group group={group} />
                            </div>
                        );
                    })}
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <Navbar connected={ this.state.socketConnected } />
                <div className="container-fluid mt-3">
                    { this.renderGroups() }
                </div>
            </div>
        );
    }
}

export default withRouter(Admin);