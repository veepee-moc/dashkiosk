import React, { Component } from 'react';

class AnimatedSwap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxWidth: 0,
            heightHigher: true,
            height: 0,
            control: true
        };
    }

    updateMaxWidth() {
        const maxWidth = this.elemOne.scrollWidth > this.elemTwo.scrollWidth ?
            this.elemOne.scrollWidth :
            this.elemTwo.scrollWidth;
        if (maxWidth !== this.state.maxWidth)
            this.setState({
                maxWidth: maxWidth
            });
    }

    updateHeight() {
        const height = this.props.control ? this.elemOne.clientHeight : this.elemTwo.clientHeight;
        if (height !== this.state.height)
            this.setState({
                heightHigher: height > this.state.height,
                height: height
            });
    }

    componentDidMount() {
        this.updateMaxWidth();
        this.updateHeight();
        if (this.props.control)
            this.elemTwo.style.transform = 'translateX(-100%)';
        else
            this.elemOne.style.transform = 'translateX(-100%)';
        this.setState({ control: this.props.control });
    }

    componentDidUpdate(prevProps) {
        this.updateMaxWidth();
        this.updateHeight();
        if (this.props.control !== prevProps.control) {
            if (this.props.control)
                this.animate(this.elemTwo, this.elemOne);
            else
                this.animate(this.elemOne, this.elemTwo);
        }
    }

    animate(elemOne, elemTwo) {
        elemOne.style.transform = 'translateX(-100%)';
        const animOne = elemOne.animate([
            { transform: 'translateX(0%)' },
            { transform: 'translateX(-100%)' }
        ], { duration: this.props.delay });
        animOne.onfinish = () => {
            this.setState({ control: this.props.control }, () => {
                elemTwo.style.transform = 'translateX(0%)';
                elemTwo.animate([
                    { transform: 'translateX(-100%)' },
                    { transform: 'translateX(0%)' }
                ], { duration: this.props.delay });
            })
        };
    }

    render() {
        return (
            <div className={this.props.className} hidden={this.props.hidden} style={{
                position: 'relative',
                overflow: 'hidden',
                transition: `height ${this.props.delay}ms linear ${this.state.heightHigher ? '0ms' : `${this.props.delay}ms`}`,
                height: this.state.height,
                width: this.state.maxWidth
            }}>
                <div className="" hidden={!this.state.control} style={{ willChange: 'transform' }} ref={elem => this.elemOne = elem}>
                    {this.props.children[0]}
                </div>
                <div className="" hidden={this.state.control} style={{ willChange: 'transform' }} ref={elem => this.elemTwo = elem}>
                    {this.props.children[1]}
                </div>
            </div>
        );
    }
};

export default AnimatedSwap;