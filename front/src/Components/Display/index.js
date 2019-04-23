import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from '../DragAndDrop/Draggable';
import './Display.css';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'UNKNOWN',
            description: '',
            on: true
        };
    }

    updateDisplay() {
        if (this.props.display) {
            this.setState({
                name: this.props.display.name,
                description: this.props.display.description,
                on: this.props.display.connected
            });
        }
    }

    componentDidMount() {
        this.updateDisplay();
    }

    componentDidUpdate(prevProps) {
        if (this.props.display !== prevProps.display)
            this.updateDisplay();
    }

    render() {
        return (
            <Draggable draggableId={ this.props.display.id } type="Display">
            <div className={"embed-responsive embed-responsive-16by9 rounded display" + (this.state.on ? " on" : "")}>
                <div className="embed-responsive-item content">
                    <p className="text-monospace text-light mb-0">{ this.state.name }</p>
                    <p className="text-monospace text-light font-italic" style={{fontSize: 13}}>{ this.state.description }</p>
                </div>
            </div>
            </Draggable>
        );
    }
};

function mapStateToProps(state, ownProps) {
    return {
        display: state.admin.groups[ownProps.groupIndex].displays[ownProps.displayKey]
    };
}

export default withRouter(connect(mapStateToProps)(Display));