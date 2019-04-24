import React, { Component } from 'react';
import { Types, action } from '../../Actions';
import Store from '../../Store';

class Draggable extends Component {
    constructor(props) {
        super(props);
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    handleDragStart(event) {
        event.dataTransfer.setData('text/plain', null);
        Store.dispatch(action(Types.SetDragAndDrop, { type: this.props.type, object: this.props.children }));
    }

    render() {
        return (
            <div draggable="true" onDragStart={ this.handleDragStart }>
                { this.props.children }
            </div>
        );
    }
};

export default Draggable;