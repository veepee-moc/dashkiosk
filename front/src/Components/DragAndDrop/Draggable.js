import React, { Component } from 'react';
import Store from '../../Redux/Store';
import { Types, action } from '../../Redux/Actions';

class Draggable extends Component {
    constructor(props) {
        super(props);
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    handleDragStart(event) {
        event.dataTransfer.setData('text/plain', null);
        Store.dispatch(action(Types.SetDndState, { type: this.props.type, object: this.props.children }));
    }

    render() {
        return (
            <div className={ this.props.className } draggable="true" onDragStart={ this.handleDragStart }>
                { this.props.children }
            </div>
        );
    }
};

export default Draggable;