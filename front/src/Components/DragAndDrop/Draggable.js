import React, { Component } from 'react';
import { Types, action } from '../../Actions';
import Store from '../../Store';

class Draggable extends Component {
    constructor(props) {
        super(props);
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    handleDragStart(event) {
        event.dataTransfer.setData(this.props.type, this.props.draggableId);
        Store.dispatch(action(Types.SetDragAndDrop, { type: this.props.type, object: this.props.children }));
    }

    render() {
        return (
            <span draggable="true" onDragStart={ this.handleDragStart }>
                { this.props.children }
            </span>
        );
    }
};

export default Draggable;