import React, { Component } from 'react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import Swap from '../Swap';

class EditableText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            editable: false,
            showButton: true
        };
        this.handleTextClick = this.handleTextClick.bind(this);
        this.handleAcceptClick = this.handleAcceptClick.bind(this);
        this.handleRejectClick = this.handleRejectClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
        if (this.props.text)
            this.setState({ text: this.props.text });
        if (this.props.showButton !== undefined)
            this.setState({ showButton: this.props.showButton });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    componentDidUpdate(prevProps) {
        if (this.props.text !== prevProps.text)
            this.setState({ text: this.props.text });
        if (this.props.showButton !== undefined && this.props.showButton !== prevProps.showButton)
            this.setState({ showButton: this.props.showButton });
    }

    handleTextClick() {
        this.setState({ editable: true }, () => {
            this.input.value = this.state.text;
            this.input.focus(); 
        });
    }

    handleClickOut() {
        this.setState({ editable: false });
    }

    handleAcceptClick(event) {
        event.preventDefault();
        if (this.props.onSubmit)
            this.props.onSubmit(this.input.value);
        this.setState({ editable: false });
    }

    handleRejectClick() {
        this.setState({ editable: false });
    }

    handleDocumentClick(event) {
        if (!this.node.contains(event.target))
            this.handleClickOut();
    }

    render() {
        return (
            <span ref={(node) => { this.node = node }}>
                <Swap control={ !this.state.editable }>
                    <span className={this.props.className} onClick={this.handleTextClick}>
                        {this.state.text}
                    </span>
                    <form className="form-inline m-0" onSubmit={this.handleAcceptClick}>
                        <input ref={(input) => { this.input = input; }} type="text" className="form-control form-control-sm" />
                        <span className="btn-group ml-1" hidden={ !this.state.showButton }>
                            <button type="submit" className="btn btn-outline-success btn-sm ml-1">
                                <IoMdCheckmark />
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={this.handleRejectClick}>
                                <IoMdClose />
                            </button>
                        </span>
                    </form>
                </Swap>
            </span>
        );
    }
};

export default EditableText;