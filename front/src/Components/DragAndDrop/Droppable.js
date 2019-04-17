import React, { Component } from 'react';

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
        if (this.state.over)
            this.setState({ over: false });
        event.preventDefault();
        for (const type of this.props.types) {
            var data = event.dataTransfer.getData(type);
            if (data && this.props.onDrop)
                this.props.onDrop(event, data);
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        for (const type of this.props.types) {
            var data = event.dataTransfer.getData(type);
            if (data && this.props.onDragOver)
                this.props.onDragOver(event, data);
        }
    }

    handleDragEnter(event) {
        for (const type of this.props.types) {
            var data = event.dataTransfer.getData(type);
            if (data) {
                this.setState({ over: true });
                return;
            }
        }
    }

    handleDragExit(event) {
        for (const type of this.props.types) {
            var data = event.dataTransfer.getData(type);
            if (data) {
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

export default Droppable;