import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Draggable from '../DragAndDrop/Draggable';
import { IoMdCheckmark } from 'react-icons/io';
import Rest from './Rest';

class GroupTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagName: this.props.tag.name,
            tagColor: this.props.tag.color
        };
        this.Rest = new Rest();
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value)
            this.setState({
                tagName: this.props.tag.name,
                tagColor: this.props.tag.color
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.Rest.updateTag(this.state.tagName, this.state.tagColor, this.props.tag.id);
        this.overlay.hide();
    }

    handleTagNameChanged = (event) => {
        this.setState({ tagName: event.target.value });
    }

    handleTagColorChanged = (event) => {
        this.setState({ tagColor: event.target.value });
    }

    render() {
        const popover = (
            <Popover style={{ zIndex: 1200 }}>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <div>
                            <input type="text" className="form-control form-control-sm rounded-top-left"
                              value={this.state.tagName} onChange={this.handleTagNameChanged} autoFocus />                            
                            <input type="color" className="form-control form-control-sm rounded-bottom-left"
                              value={this.state.tagColor} onChange={this.handleTagColorChanged} />
                        </div>
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary btn-sm">
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
                  tagid={this.props.tag.id}>
                    <span className="badge badge-primary m-1" style={{ backgroundColor: this.props.tag.color }}>
                        <OverlayTrigger ref={(elem) => this.overlay = elem} trigger="click" rootClose placement="right" overlay={popover}>
                            <span className="text-color-depend-bg">{this.props.tag.name}</span>
                        </OverlayTrigger>
                        <span className="btn-text btn-text-dark ml-1 text-color-depend-bg"
                          onClick={() => this.Rest.deleteTag(this.props.tag.id)}>
                            &times;
                        </span>
                    </span>
                </span>
            </Draggable>
        );
    }
};

function mapStateWithProps(state, ownProps) {
    return {
        tag: state.Data.GroupTags.find(t => t.id === ownProps.tagId)
    };
}

export default connect(mapStateWithProps)(GroupTag);