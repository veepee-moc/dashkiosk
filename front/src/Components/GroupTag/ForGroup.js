import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rest from './Rest';

class GroupTag extends Component {
    constructor(props) {
        super(props);
        this.Rest = new Rest();
    }

    render() {
        return (
            <span className={`${this.props.className}`}
              style={this.props.style}
              hidden={this.props.hidden}>
                <span className="badge badge-primary m-1" style={{ backgroundColor: this.props.tag.color }}>
                    <span className="text-color-depend-bg">{this.props.tag.name}</span>
                    <span className="btn-text btn-text-dark ml-1 text-color-depend-bg"
                      onClick={() => this.Rest.deleteTagFromGroup(this.props.groupId, this.props.tag.id)}>
                        &times;
                    </span>
                </span>
            </span>
        );
    }
};

function mapStateWithProps(state, ownProps) {
    return {
        tag: state.Data.GroupTags.find(t => t.id === ownProps.tagId)
    };
}

export default connect(mapStateWithProps)(GroupTag);