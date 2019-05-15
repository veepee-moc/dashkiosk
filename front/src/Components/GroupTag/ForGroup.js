import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rest from './Rest';

class GroupTag extends Component {
    constructor(props) {
        super(props);
        this.Rest = new Rest(this.props.tag.id);
    }

    render() {
        return (
            <span className={`${this.props.className}`}
              style={this.props.style}
              hidden={this.props.hidden}>
                <span className="badge badge-primary m-1" style={{ backgroundColor: this.props.tag.color }}>
                    <span>{this.props.tag.name}</span>
                    <span className="btn-text btn-text-dark ml-1"
                      onClick={() => this.Rest.deleteTagFromGroup(this.props.groupId)}>
                        &times;
                    </span>
                </span>
            </span>
        );
    }
};

function mapStateWithProps(state, ownProps) {
    const tag = state.admin.groupTags.find((tag) => tag.id === ownProps.tagId);
    return {
        tag: tag ? tag : {}
    };
}

export default connect(mapStateWithProps)(GroupTag);