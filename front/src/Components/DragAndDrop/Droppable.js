import React, { Component } from 'react';
import { connect } from 'react-redux';

class Droppable extends Component {
    constructor(props) {
        super(props);
        this.state = { hover: 0 };
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
    }

    handleDrop(event) {
        event.preventDefault();
        if (this.state.hover)
            this.setState({ hover: 0 });
        for (const type of this.props.types) {
            if (type === this.props.dnd.type && this.props.onDrop)
                this.props.onDrop(event, this.props.dnd);
        }
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDragEnter(event) {
        for (const type of this.props.types) {
            if (type === this.props.dnd.type) {
                this.setState({ hover: this.state.hover + 1 });
                return;
            }
        }
    }

    handleDragLeave(event) {
        for (const type of this.props.types) {
            if (type === this.props.dnd.type) {
                this.setState({ hover: this.state.hover - 1 });
                return;
            }
        }
    }

    render() {
        return (
            <div
                className={ this.props.className }
                onDrop={ this.handleDrop }
                onDragOver={ this.handleDragOver }
                onDragEnter={ this.handleDragEnter }
                onDragLeave={ this.handleDragLeave }
                style={ Object.assign({}, this.props.style, this.state.hover ? { boxShadow: "0px 0px 8px rgb(25, 200, 25)" } : { }) }
            >
                { this.props.children }
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        dnd: state.dnd
    };
}

export default connect(mapStateToProps)(Droppable);