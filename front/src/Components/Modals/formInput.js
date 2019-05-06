import React, { Component } from 'react';
import { Col, DropdownButton, Dropdown, InputGroup, Form } from 'react-bootstrap';
import Axios from 'axios';
import { 
  IoIosDesktop, 
  IoMdLink, 
  IoMdTime, 
  IoMdHourglass, 
  IoMdResize, 
  IoMdDocument, 
  IoMdCalendar,
} from 'react-icons/io';

const styles = {
  borderTopRightRadius: '0.3em',
  borderBottomRightRadius: '0.3em',
  borderWidth: '1px',
  borderColor: '#ced4da',
  borderStyle: 'solid',
  backgroundColor: '#E9ECEF',
  minWidth: '80px',
  color: '#495057'
}

const uploadStyle = {
  ...styles,
  minWidth: '50px'
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

  uploadImage(event) {
    const data = new FormData();
    const file = event.target.files[0];

    event.preventDefault();
    data.append('dashkiosk', file);
    Axios({
        method: 'post',
        url: 'http://10.138.11.150:8080/api/upload',
        data: data,
        headers: { 'content-type': 'multipart/form-data' }
    })
        .then(json => { 
          console.log('coucou');
          this.props.updateValue(this.props.name, `http://10.138.11.150:8080/api/${json.data.filepath}`)
         })
        .catch((err) => { console.log(err) });
  }

  selectTime() {
    if (this.props.dropdown) {
      return (
        <>
          <DropdownButton
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
      );
    }
  }

  uploadFile() {
    if (this.props.type === 'url') {
      return (
          <input
            title='file'
            style={uploadStyle}
            type='file'
            onChange={event => this.uploadImage(event)}
          />
      );
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
          <InputGroup.Append>
            {this.selectTime()}
            {this.uploadFile()}
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
            {this.props.onError}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    );
  }
}

export default FormInput;