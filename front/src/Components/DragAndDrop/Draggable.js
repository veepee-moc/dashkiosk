import React, { Component } from 'react';

class Draggable extends Component {
    constructor(props) {
        super(props);
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    handleDragStart(event) {
        event.dataTransfer.setData(this.props.type, event.target.draggableId);
    }

    render() {
        return (
            <div draggable="true" onDragStart={ this.handleDragStart } draggableId={ this.props.draggableId }>
                { this.props.children }
            </div>
        );
    }
};

export default Draggable;