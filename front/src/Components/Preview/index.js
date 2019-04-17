import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import Receiver from '../Receiver';
import './Preview.css';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    render() {
        return (
            <div className={ this.state.opened ? "card w-75 mx-auto" : "card w-25 mx-auto"}>
                <button className="btn btn-nostyle" onClick={() => this.setState({ opened: !this.state.opened })} aria-expanded={this.state.opened} aria-controls="collapseIframe">
                    <div className="card-header">
                        Preview
                        </div>
                </button>
                <Collapse in={this.state.opened}>
                    <div className="card-body embed-responsive embed-responsive-16by9" id="collapseIframe">
                        <Receiver/>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default withRouter(Preview);