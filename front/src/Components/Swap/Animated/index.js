import React, { Component } from 'react';

class AnimatedSwap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
        this.timerId = null;
    }

    updateWidth() {
        const width = this.elemOne.clientWidth > this.elemTwo.clientWidth ?
            this.elemOne.clientWidth :
            this.elemTwo.clientWidth;
        if (width !== this.state.width)
            this.setState({ width: width });
    }

    componentDidMount() {
        this.updateWidth();
        this.elemOne.hidden = false;
        this.forceUpdate(() => {
            this.setState({ height: this.elemOne.clientHeight }, () => {
                this.elemOne.hidden = false;
                this.elemOne.style.transform = 'translateX(0%)';
                this.container.style.transition = `height ${this.props.delay}ms linear`;
            });
        });
    }

    componentDidUpdate(prevProps) {
        this.updateWidth();
        if (this.props.control !== prevProps.control && (this.props.control === true || this.props.control === false)) {
            if (this.props.control)
                this.animate(this.elemTwo, this.elemOne);
            else
                this.animate(this.elemOne, this.elemTwo);
        }
    }

    componentWillUnmount() {
        if (this.timerId)
            clearTimeout(this.timerId);
    }

    animate(elemOne, elemTwo) {
        elemOne.style.transform = 'translateX(-110%)';
        elemOne.animate([
            { transform: 'translateX(0%)' },
            { transform: 'translateX(-110%)'}
        ], { duration: this.props.delay });
        this.timerId = setTimeout(() => {
            elemOne.hidden = true;
            elemTwo.hidden = false;
            this.forceUpdate(() => {
                elemTwo.style.transform = 'translateX(0%)';
                elemTwo.animate([
                    { transform: 'translateX(-110%)' },
                    { transform: 'translateX(0%)' }
                ], { duration: this.props.delay });
            });
            if (this)
                this.setState({ height: elemTwo.clientHeight });
        }, this.props.delay);
    }

    render() {
        return (
            <div className={this.props.className} hidden={this.props.hidden}
              ref={(el) => this.container = el}
              style={{
                position: 'relative',
                overflow: 'hidden',
                height: this.state.height,
                width: this.state.width
            }}>
                <div ref={elem => this.elemOne = elem}>
                    {this.props.children[0]}
                </div>
                <div ref={elem => this.elemTwo = elem}>
                    {this.props.children[1]}
                </div>
            </div>
        );
    }
};

export default AnimatedSwap;