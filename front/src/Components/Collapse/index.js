import React, { Component } from 'react';

class Collapse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            collapsed: true
        };
        this.handleCollapse = this.handleCollapse.bind(this);
    }

    componentDidMount() {
        this.setState({
            height: this.mainDiv.clientHeight
        });
        this.mainDiv.style.height = '0px';
    }

    handleCollapse() {
        if (this.state.collapsed) {
            this.setState({ collapsed: false }, () => {
                this.mainDiv.animate([
                    { height: '0px' },
                    { height: `${ this.state.height }px` }
                ], { duration: 200 });
                this.mainDiv.style.height = `${ this.state.height }px`;
            });
        }
        else {
            this.setState({ collapsed: true }, () => {
                this.mainDiv.animate([
                    { height: `${ this.state.height }px` },
                    { height: '0px' }
                ], { duration: 200 });
                this.mainDiv.style.height = '0px';
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.collapsed !== prevProps.collapsed)
            this.handleCollapse();
    }

    render() {
        return (
            <div ref={ (elem) => this.mainDiv = elem } style={{ overflow: "hidden" }}>
                { this.props.children }
            </div>
        );
    }
};

export default Collapse;