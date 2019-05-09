import React, { Component } from 'react';
import { Col, DropdownButton, Dropdown, InputGroup, Form, Row } from 'react-bootstrap';
import Axios from 'axios';
import { 
  IoIosDesktop, 
  IoMdLink, 
  IoMdTime, 
  IoMdHourglass, 
  IoMdResize, 
  IoMdDocument, 
  IoMdCalendar,
  IoMdBriefcase
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
  minWidth: '110px',
  textAlign: 'center',
  cursor: 'pointer'
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
      case 'timezone':
        return <IoMdTime />;
      case 'Timeout':
        return <IoMdHourglass />;
      case 'Viewport':
        return <IoMdResize />;
      case 'Description':
        return <IoMdDocument />;
      case 'Available':
        return <IoMdCalendar />;
      case 'background_image':
        return <IoMdLink />;
    }
  }

  uploadImage(event) {
    const data = new FormData();
    const file = event.target.files[0];

    event.preventDefault();
    data.append('loading', file); // unassigned_image // branding
    Axios({
        method: 'post',
        url: '/api/settings/upload/brand/loading',  //this.props['upload-route'], // /api/settings/upload || /api/settings/branding
        data: data,
        headers: { 'content-type': 'multipart/form-data' }
    })
        .then(json => { 
          this.props.updateValue(this.props.name, `http://10.138.11.150:8080/api/${json.data.filepath}`, { target: this.input })
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
        <div className='align-items-center' style={uploadStyle}>
          <input
            title='file'
            style={{ display: 'none'}}
            id='fileUpload'
            type='file'
            onChange={event => this.uploadImage(event)}
          />
          <label
            htmlFor='fileUpload'
            style={{ height:'100%', cursor:'pointer'}}
          >
            <Col className='d-flex align-items-center pt-2'>Select a file...</Col>
          </label>
        </div>
      );
    }
  }

  render() {
    return (
      <Form.Group className={ this.props.className } as={Col} md={this.props.md} sm={this.props.sm}>
        { this.props.label ? <Form.Label>{ this.props.label }</Form.Label> : '' }
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend"> {this.putIcon()} </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            ref={(elem) => this.input = elem}
            index={this.props.index}
            disabled={this.props.disabled}
            as={this.props.hasTextArea ? "textarea" : "input"}
            value={this.props.value}
            size='lg'
            type={this.props.type}
            placeholder={this.props.placeholder}
            aria-describedby="inputGroupPrepend"
            onChange={(event) => { this.props.updateValue(this.props.name, event.target.value, event) }}
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