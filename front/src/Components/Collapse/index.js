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
        if (!this.state.collapsed) {
            const height = this.mainDiv.clientHeight;
            this.mainDiv.style.height = '0px';
            this.forceUpdate(() => {
                this.mainDiv.style.height = `${this.mainDiv.scrollHeight}px`;
                if (this.mainDiv.scrollHeight !== height)
                    this.mainDiv.animate([
                        { height: `${height}px` },
                        { height: `${this.mainDiv.scrollHeight}px` }
                    ], { duration: 100 });
            });
        }
    }

    handleCollapse() {
        if (this.state.collapsed) {
            this.setState({ collapsed: false }, () => {
                this.mainDiv.style.height = `${ this.mainDiv.scrollHeight }px`;
                this.mainDiv.animate([
                    { height: '0px' },
                    { height: `${ this.mainDiv.scrollHeight }px` }
                ], { duration: 200 });
            });
        }
        else {
            this.setState({ collapsed: true }, () => {
                this.mainDiv.style.height = '0px';
                this.mainDiv.animate([
                    { height: `${ this.mainDiv.scrollHeight }px` },
                    { height: '0px' }
                ], { duration: 200 });
            })
        }
    }

    render() {
        const children = React.Children.map(this.props.children, (child) =>
                React.cloneElement(child, typeof(child.type) === 'object' ? { updateCollapse: this.reRenderCollapse } : {})
        );
        return (
            <div ref={ (elem) => this.mainDiv = elem } className={ this.props.className } style={{ overflow: "hidden" }}>
                { children }
            </div>
        );
    }
};

export default Collapse;