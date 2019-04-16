import React, { Component } from 'react';

class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={ this.props.className }>
                <div hidden={ this.props.control }>
                    { this.props.children[0] }
                </div>
                <div hidden={ !this.props.control }>
                    { this.props.children[1] }
                </div>
            </div>
        );
    }
};

export default Swap;