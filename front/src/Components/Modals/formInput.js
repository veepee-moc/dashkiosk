import React, { Component } from 'react';
import { Modal, Row, Col, Button, Container, InputGroup, Form, Collapse, Card } from 'react-bootstrap';
import { IoMdRefresh, IoMdLink, IoMdTime, IoMdHourglass, IoMdResize, IoMdDocument, IoMdCalendar } from 'react-icons/io'

class FormInput extends Component {
  constructor(...args) {
    super(...args);
  }

  putIcon = () => {
    switch (this.props.name) {
      case 'Url':
        return <IoMdLink />;
      case 'Delay':
        return <IoMdTime />;
      case 'Timeout':
        return <IoMdHourglass />;
      case 'Viewport':
        return <IoMdResize />;
      case 'Description':
        return <IoMdDocument />;
      case 'Available':
        return <IoMdCalendar />;
    }
  }

  render() {
    return (
      <Form.Group as={Col} md={this.props.md} sm={this.props.sm}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend"> {this.putIcon()} </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            as={this.props.hasTextArea ? "textarea" : "input"}
            value={this.props.value}
            size='lg'
            type={this.props.type}
            placeholder={this.props.placeholder}
            aria-describedby="inputGroupPrepend"
            onChange={(input) => { this.props.updateValue(this.props.name, input.target.value) }}
            isInvalid={this.props.isInvalid}
            // required={this.props.required}
            />
          <Form.Control.Feedback type="invalid">
            {this.props.onError}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    );
  }
}

export default FormInput;