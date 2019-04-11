import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Display.css';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'YK5D6Z',
            description: '',
            on: true
        };
    }

    render() {
        return (
            <div className={"embed-responsive embed-responsive-16by9 rounded display" + (this.state.on ? " on" : "")}>
                <div className="embed-responsive-item content">
                    <p className="text-monospace text-light mb-0">{ this.state.name }</p>
                    <p className="text-monospace text-light font-italic" style={{fontSize: 13}}>{ this.state.description }</p>
                </div>
            </div>
        );
    }
};

export default withRouter(Display);