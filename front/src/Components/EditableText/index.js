import React, { Component } from 'react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

class EditableText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            editable: false
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
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    componentDidUpdate(prevProps) {
        if (this.props.text !== prevProps.text)
            this.setState({ text: this.props.text });
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

    handleAcceptClick() {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.input.value);
            this.setState({ editable: false });
        }
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
            <div ref={(node) => { this.node = node }}>
                <div hidden={ this.state.editable } className={this.props.className} onClick={ this.handleTextClick }>
                    { this.state.text }
                </div>
                <div hidden={ !this.state.editable } className="form-inline">
                    <input ref={(input) => { this.input = input; } } type="text" className="form-control form-control-sm w-50 m-1"/>
                    <div className="btn-group ml-1">
                        <button className="btn btn-outline-success btn-sm" onClick={ this.handleAcceptClick }><IoMdCheckmark /></button>
                        <button className="btn btn-outline-danger btn-sm" onClick={ this.handleRejectClick }><IoMdClose /></button>
                    </div>
                </div>
            </div>
        );
    }
};

export default EditableText;