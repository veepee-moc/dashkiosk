import React, { Component } from 'react';

class Collapse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
        this.reRenderCollapse = this.reRenderCollapse.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
    }

    componentDidMount() {
        this.mainDiv.style.height = '0px';
    }

    componentDidUpdate(prevProps) {
        if (this.props.collapsed !== prevProps.collapsed)
            this.handleCollapse();
    }

    reRenderCollapse() {
        this.forceUpdate();
    }

    handleCollapse() {
        if (this.state.collapsed) {
            this.setState({ collapsed: false }, () => {
                this.mainDiv.animate([
                    { height: '0px' },
                    { height: `${ this.mainDiv.scrollHeight }px` }
                ], { duration: 200 });
                this.mainDiv.style.height = `${ this.mainDiv.scrollHeight }px`;
            });
        }
        else {
            this.setState({ collapsed: true }, () => {
                this.mainDiv.animate([
                    { height: `${ this.mainDiv.scrollHeight }px` },
                    { height: '0px' }
                ], { duration: 200 });
                this.mainDiv.style.height = '0px';
            })
        }
    }

    render() {
        const children = React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, { rerendercollapse: this.reRenderCollapse })
        );
        return (
            <div ref={ (elem) => this.mainDiv = elem } className={ this.props.className } style={{ overflow: "hidden" }}>
                { children }
            </div>
        );
    }
};

export default Collapse;