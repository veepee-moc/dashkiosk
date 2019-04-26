import React, { Component } from 'react';
import { Col, DropdownButton, Dropdown, InputGroup, Form } from 'react-bootstrap';
import { IoIosDesktop, IoMdLink, IoMdTime, IoMdHourglass, IoMdResize, IoMdDocument, IoMdCalendar } from 'react-icons/io'

const styles = {
  borderTopRightRadius: '0.3em',
  borderBottomRightRadius: '0.3em',
  borderWidth: '1px',
  borderColor: '#ced4da',
  borderStyle: 'solid',
  backgroundColor: '#E9ECEF',
  minWidth: '80px'
}

class FormInput extends Component {
  putIcon = () => {
    switch (this.props.name) {
      default:
        return;
      case 'Ip':
        return <IoIosDesktop />;
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

  selectTime() {
    if (this.props.dropdown) {
      return <> <DropdownButton
        className="text-center"
        as={InputGroup.Prepend}
        variant=""
        title={this.props.time}
        id="input-group-dropdown-1"
        style={styles}
      >
        <Dropdown.Item onClick={() => { this.props.selectTime('sec') }}>
          sec
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => { this.props.selectTime('min') }}>min</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => { this.props.selectTime('hour') }}>hour</Dropdown.Item>
      </DropdownButton>
      </>
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
            disabled={this.props.disabled}
            as={this.props.hasTextArea ? "textarea" : "input"}
            value={this.props.value}
            size='lg'
            type={this.props.type}
            placeholder={this.props.placeholder}
            aria-describedby="inputGroupPrepend"
            onChange={(input) => { this.props.updateValue(this.props.name, input.target.value) }}
            isInvalid={this.props.isInvalid}
          />
          {this.selectTime()}
          <Form.Control.Feedback type="invalid">
            {this.props.onError}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    );
  }
}

export default FormInput;