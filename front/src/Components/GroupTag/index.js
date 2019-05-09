import React, { Component } from 'react';
import Draggable from '../DragAndDrop/Draggable';

class GroupTag extends Component {
    render() {
        return (
            <Draggable className="d-inline" type="GroupTag">
                <span className={this.props.className} style={this.props.style} hidden={this.props.hidden}>
                    <span className="badge badge-primary m-1">
                        {this.props.value}
                        <span className="btn-text btn-text-dark ml-1" onClick={this.props.onClick}>&times;</span>
                    </span>
                </span>
            </Draggable>
        );
    }
};

export default GroupTag;