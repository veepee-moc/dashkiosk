import React, { Component } from 'react';

class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <span className={ this.props.className }>
                <span hidden={ !this.props.control }>
                    { this.props.children[0] }
                </span>
                <span hidden={ this.props.control }>
                    { this.props.children[1] }
                </span>
            </span>
        );
    }
};

export default Swap;