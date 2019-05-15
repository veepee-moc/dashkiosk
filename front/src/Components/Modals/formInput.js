import React, { Component } from 'react';
import { Col, DropdownButton, Dropdown, InputGroup, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import { 
  IoIosDesktop, 
  IoMdLink, 
  IoMdTime, 
  IoMdHourglass, 
  IoMdResize, 
  IoMdDocument, 
  IoMdCalendar,
  IoMdTrash,
  IoMdImages
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
  minWidth: '80px',
  textAlign: 'center',
  cursor: 'pointer'
}

const uploadStyleWithoutRadius = {
  ...styles,
  borderTopRightRadius: '0',
  borderBottomRightRadius: '0',
  borderRight: 'none',
  minWidth: '110px',
  textAlign: 'center',
  cursor: 'pointer'
}

const removeStyle = {
  borderTopRightRadius: '0.3em',
  borderBottomRightRadius: '0.3em',
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
      case 'background':
        return <IoMdLink />;
      case 'stamp':
        return <IoMdLink />;
      case 'loading_image':
        return <IoMdLink />;
      case 'unassigned_images':
        return <IoMdLink />;
      case 'background_image':
        return <IoMdLink />;
      case 'unassigned':
        return <IoMdLink />;
      case 'watermark':
        return <IoMdLink />;
    }
  }

  uploadImage(event) {
    const data = new FormData();
    const file = event.target.files[0];

    event.preventDefault();
    data.append(this.props['data-name'], file);
    Axios({
        method: 'post',
        url: this.props['upload-route'],
        data: data,
        headers: { 'content-type': 'multipart/form-data' }
    })
        .then(json => { 
          this.props.updateValue(this.props.name, `/api/${json.data.filepath}`, { target: this.input })
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
        <div className='align-items-center' style={this.props.name === 'unassigned' ? uploadStyleWithoutRadius : uploadStyle}>
          <input
            title='file'
            style={{ display: 'none'}}
            id={`${this.props.name}fileUpload${this.props.index ? this.props.index : ''}`}
            type='file'
            onChange={event => this.uploadImage(event)}
          />
          <label
            htmlFor={`${this.props.name}fileUpload${this.props.index ? this.props.index : ''}`}
            style={{ height:'100%', cursor:'pointer'}}
          >
            <Col className='d-flex align-items-center mt-2'><IoMdImages size='30' /></Col>
          </label>
        </div>
      );
    }
  }

  removeLine() {
    if (this.props.name === 'unassigned')
      return (
        <Button 
          variant='danger' 
          disabled={this.props.unassignedList.length > 1 ? false : true } 
          style={removeStyle} 
          onClick={ () => this.props.removeUnassigned(this.props.index) }>
            <IoMdTrash />
          </Button>
      );
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
            {this.removeLine()}
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