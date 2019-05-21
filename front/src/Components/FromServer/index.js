import React, { Component } from 'react';

class FromServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: `http://${window.location.hostname}:8080${window.location.pathname}`
        };
    }

    render() {
        return <iframe title='Server' src={ this.state.url } scrolling='no' frameBorder='0' width='100%' height='100%'
                style={{ position: 'fixed', left: '0px', top: '0px' }}
            />
    }
};

export default FromServer;