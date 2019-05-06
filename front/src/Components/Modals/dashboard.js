import React, { Component } from 'react';
import { Modal, Button, Container, Form } from 'react-bootstrap';
import Swap from '../Swap';
import FormInput from './formInput';
import UploadImage from '../UploadImage';

class ModalDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      Timeout: '',
      Viewport: '',
      Delay: '',
      Url: '',
      Available: '',
      Description: '',
      delayTime: 'sec',
      timeoutTime: 'sec',
    }
    this.Rest = this.props.rest;
  }

  reinitialise = () => {
    this.setState({
      Timeout: '',
      Viewport: '',
      Delay: '',
      Url: '',
      Available: '',
      Description: '',
      delayTime: 'sec',
      timeoutTime: 'sec'
    });
  }

  unassigned = () => {
    const body = {
      url: '/unassigned',
      description: 'Dashboard for unassigned display',
      timeout: null,
      delay: null,
      viewport: null,
      available: null
    };
    this.Rest.addDashboard(body);
    this.props.onHide();
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.show !== prevProps.show || prevState !== this.state)
      return true;
    return false;
  }

  handleInput = (inputName, inputValue) => {
    if ((inputName === 'Timeout' && inputValue <= 0) || (inputName === 'Delay' && inputValue <= 0))
      inputValue = '';
    this.setState({ [inputName]: inputValue });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const delay = (this.state.delayTime === 'sec' ? this.state.Delay : this.setTime(this.state.delayTime, this.state.Delay));
    const timeout = (this.state.timeoutTime === 'sec' ? this.state.Timeout : this.setTime(this.state.timeoutTime, this.state.Timeout));
    const body = {
      url: this.state.Url,
      description: this.state.Description,
      timeout: (timeout === 0 || timeout === '' ? null : timeout),
      delay: (delay === 0 || delay === '' ? null : delay),
      viewport: (this.state.Viewport === '' ? null : this.state.Viewport),
      available: this.state.Available
    };
    this.Rest.addDashboard(body);
    this.reinitialise();
    this.props.onHide();
  }

  setTime = (time, value) => {
    return (time === 'hour' ? (value * 60 * 60) : (value * 60));
  }

  isValidUrl = () => {
    var url = this.state.Url;

    if (url.length < 7)
      return false;
    if (url.length > 0) {
      if (url.substring(0, 7) === "http://" || url.substring(0, 8) === "https://")
        return true;
    }
    return false;
  }

  isValidViewport = () => {
    var reg = new RegExp("^[1-9]\\d*[x][1-9]\\d*$");

    if (this.state.Viewport.length > 0) {
      return reg.test(this.state.Viewport);
    }
    return true;
  }

  handleError = () => {
    var url = this.state.Url;
    var ret = !this.isValidViewport();

    if (url.length < 7)
      return true;
    if (ret === false) {
      if (url.substring(0, 7) === "http://" || url.substring(0, 8) === "https://")
        return false;
      else
        return true;
    }
    return ret;
  }

  render() {
    return (
      <Modal {...this.props} size='lg' aria-labelledby="contained-modal-title-vcenter">
        <Form
          onSubmit={this.handleSubmit}
          noValidate
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add a new dashboard to group {this.props.group.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
                <Form.Row>
                <FormInput 
                  md={12} 
                  sm={12} 
                  required={true} 
                  isInvalid={!this.isValidUrl()} 
                  value={this.state.Url}
                  placeholder="Url" 
                  name='Url' 
                  updateValue={this.handleInput} 
                  onError='insert an URL or upload an image' 
                  type='url'
                />
                <FormInput md={12} sm={12} required={false} value={this.state.Description} placeholder="Description" name='Description' updateValue={this.handleInput} type="text" />
                <FormInput md={12} sm={12} required={false} isInvalid={!this.isValidViewport()} value={this.state.Viewport} placeholder="Viewport size (height x width)" name='Viewport' updateValue={this.handleInput} type="text" />
                <FormInput md={6} sm={12} required={false} value={this.state.Timeout}
                  placeholder="Timeout" name='Timeout' updateValue={this.handleInput} type="number"
                  dropdown={true} time={this.state.timeoutTime} selectTime={(value) => { this.setState({ timeoutTime: value }) }} />
                <FormInput md={6} sm={12} required={false} value={this.state.Delay}
                  placeholder="Delay" name='Delay' updateValue={this.handleInput} type="number"
                  dropdown={true} time={this.state.delayTime} selectTime={(value) => { this.setState({ delayTime: value }) }} />
                <FormInput md={12} sm={12} required={false} hasTextArea={true} placeholder="This dashboard is available when..." name='Available' updateValue={this.handleInput} type="text" />
              </Form.Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={this.unassigned}>Default dashboard</Button>
            <Button disabled={this.handleError()} type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ModalDashboard;