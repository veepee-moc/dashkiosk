import React, { Component } from 'react';
import { connect } from 'react-redux';
import Display from '../../Display';

class GroupBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutSize: 3
        };
    }

    renderDisplays() {
        return this.props.displays.map((key) =>
            <li className="list-layout-item" key={ key } style={{ width: 100 / this.state.layoutSize + '%' }}>
                <Display groupIndex={ this.props.groupIndex } displayKey={ key } />
            </li>
        );
    }

    render() {
        return (
            <div className="card-body pt-2 pb-2">
                <ul className="list-layout">
                    { this.renderDisplays() }
                </ul>
            </div>
        );        
    }
};

function mapStateToProps(state, ownProps) {
    const group = state.admin.groups[ownProps.groupIndex];
    return {
        displays: group ? Object.keys(group.displays) : null
    };
}

export default connect(mapStateToProps)(GroupBody);