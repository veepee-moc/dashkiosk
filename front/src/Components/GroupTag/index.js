import React, { Component } from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Draggable from '../DragAndDrop/Draggable';
import { IoMdCheckmark } from 'react-icons/io';

class GroupTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleValueChanged = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    render() {
        const popover = (
            <Popover style={{ zIndex: 1200 }}>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control form-control-sm"
                            value={this.state.inputValue} onChange={this.handleValueChanged} />
                        <div className="input-group-append">
                            <button className="btn btn-primary btn-sm" onClick={this.handleSubmit}>
                                <IoMdCheckmark />
                            </button>
                        </div>
                    </div>
                </form>
            </Popover>
        );

        return (
            <Draggable className="d-inline" type="GroupTag">
                <span className={`${this.props.className}`}
                    style={this.props.style}
                    hidden={this.props.hidden}
                    value={this.props.value}>
                    <span className="badge badge-primary m-1">
                        <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
                            <span>{this.props.value}</span>
                        </OverlayTrigger>
                        <span className="btn-text btn-text-dark ml-1" onClick={this.props.onClick}>&times;</span>
                    </span>
                </span>
            </Draggable>
        );
    }
};

export default GroupTag;