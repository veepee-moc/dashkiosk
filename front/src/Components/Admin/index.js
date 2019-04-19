import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
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
            groups: {}
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

    renderSortableGroupList() {
        const SortableGroupItem = SortableElement(({value}) =>
            <li className="list-layout-item" style={{width: 100 / this.state.layoutSize + '%'}}>
                <Group group={ value } />
            </li>
        );
        const SortableGroupList = SortableContainer(({items}) => 
            <ul className="list-layout">
                {
                    Object.values(items).map((value, index) =>
                        <SortableGroupItem key={ `group-${ index }` } index={ index } value={ value } />)
                }
            </ul>
        );
        return (
            <SortableGroupList items={ Object.values(this.state.groups) } axis="xy" useDragHandle />
        );
    }

    render() {
        return (
            <div>
                <Navbar connected={ this.state.socketConnected } />
                <div className="container-fluid mt-3">
                    { this.renderSortableGroupList() }
                    <div className="mt-3 mb-3">
                        <Preview />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Admin);