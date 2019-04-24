import React, { Component } from 'react';
import { connect } from 'react-redux';

class Droppable extends Component {
    constructor(props) {
        super(props);
        this.state = { over: false };
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragExit = this.handleDragExit.bind(this);
    }

    handleDrop(event) {
        event.preventDefault();
        if (this.state.over)
            this.setState({ over: false });
        for (const type of this.props.types) {
            if (type === this.props.dnd.type && this.props.onDrop)
                this.props.onDrop(event, this.props.dnd.object);
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        for (const type of this.props.types) {
            if (type === this.props.onDragOver && this.props.onDragOver)
                this.props.onDragOver(event, this.props.dnd.object);
        }
    }

    handleDragEnter(event) {
        for (const type of this.props.types) {
            if (type === this.props.dnd.type) {
                this.setState({ over: true });
                return;
            }
        }
    }

    handleDragExit(event) {
        for (const type of this.props.types) {
            if (type === this.props.dnd.type) {
                this.setState({ over: false });
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
                onDragExit={ this.handleDragExit }
                style={ Object.assign({}, this.props.style, this.state.over ? { boxShadow: "0px 0px 8px rgb(25, 200, 25)" } : { }) }
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