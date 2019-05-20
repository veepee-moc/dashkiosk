import React, { Component } from 'react';
import { Modal, Button, Container, Form, Col, InputGroup, Row } from 'react-bootstrap';
import FormInput from './formInput';
import { IoIosTrash, IoMdImage, IoIosSave } from 'react-icons/io';
import Availability from './availability';

class ModalEditDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      Timeout: this.props.dashboard.timeout || '',
      Viewport: this.props.dashboard.viewport || '',
      Delay: this.props.dashboard.delay || '',
      Url: this.props.dashboard.url,
      Available: this.props.dashboard.availability || '',
      Description: this.props.dashboard.description || '',
      watermark: this.props.dashboard.watermark || '',
      watermarkPosition: this.props.dashboard.watermarkPosition || 'center',
      delayTime: 'sec',
      timeoutTime: 'sec',
      save: false,
    }
    this.Rest = this.props.rest;
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

  deleteDashboard = () => {
    this.Rest.deleteDashboard(this.props.dashboard.id, this.props.dashboard.url);
    this.props.onHide();
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
      watermark: this.state.watermark,
      watermarkPosition: this.state.watermarkPosition,
      availability: this.state.Available
    };
    this.Rest.saveDashboard(body);
    this.Rest.editDashboard(body, this.props.dashboard.id, this.props.url);
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
    if (!this.isValidViewport())
      return (true);
    return (false);
  }

  render() {
    return (
      <Modal {...this.props} className='onTop' size='lg' aria-labelledby="contained-modal-title-vcenter">
        <Form
          onSubmit={this.handleSubmit}
          noValidate
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" >
                <Col sm={12} md={12}>
                  Edit dashboard
                </Col>
                <Col sm={12} md={12} className="font-italic text-muted">
                  {this.props.dashboard.description}
                </Col>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container> 
              <Form.Row>
                <FormInput
                  sm={12}
                  required={true}
                  value={this.state.Url}
                  placeholder="Url"
                  name='Url'
                  updateValue={this.handleInput}
                  onError='insert an URL or upload an image'
                  type="url"
                  data-name='dashkiosk'
                  upload-route='/api/upload'
                />
                <FormInput
                  md={6}
                  sm={12}
                  value={this.state.watermark}
                  placeholder='Watermark'
                  name='watermark'
                  updateValue={this.handleInput}
                  type="url"
                  data-name='dashkiosk'
                  upload-route='/api/upload'
                />
                <Form.Group as={Col} md={6} sm={12}>
                  <InputGroup>
                    <InputGroup.Prepend style={{ width: '42px' }}>
                      <InputGroup.Text className="input-group-text" htmlFor='watermarkPosition'>
                        <IoMdImage />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      size='lg'
                      as='select'
                      className='custom-select'
                      value={this.state.watermarkPosition}
                      onChange={event => this.setState({ watermarkPosition: event.target.value })}
                    >
                      <option value='center'>Centered</option>
                      <option value='topright'>Top right</option>
                      <option value='topleft'>Top left</option>
                      <option value='bottomright'>Bottom right</option>
                      <option value='bottomleft'>Bottom left</option>
                    </Form.Control>
                  </InputGroup>
                </Form.Group>
                <FormInput md={12} sm={12} required={false} value={this.state.Description} placeholder="Description" name='Description' updateValue={this.handleInput} type="text" />
                <FormInput md={12} sm={12} required={false} isInvalid={!this.isValidViewport()} value={this.state.Viewport} placeholder="Viewport size (height x width)" name='Viewport' updateValue={this.handleInput} type="text" />
                <FormInput md={6} sm={12} required={false} value={this.state.Timeout}
                  placeholder="Timeout" name='Timeout' updateValue={this.handleInput} type="number"
                  dropdown={true} time={this.state.timeoutTime} selectTime={(value) => { this.setState({ timeoutTime: value }) }} />
                <FormInput md={6} sm={12} required={false} value={this.state.Delay}
                  placeholder="Delay" name='Delay' updateValue={this.handleInput} type="number"
                  dropdown={true} time={this.state.delayTime} selectTime={(value) => { this.setState({ delayTime: value }) }} />
                <FormInput md={12} sm={12} required={false} value={this.state.Available} hasTextArea={true} placeholder="This dashboard is available when..." name='Available' updateValue={this.handleInput} type="text" />
                <Form.Text className="text-muted">
                  <Availability input={this.state.Available} />
                </Form.Text>
              </Form.Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>

          <Row className='w-100'>
                  <Col md={6} className='text-left pl-0'>
                    <Button variant="danger" onClick={this.deleteDashboard}><IoIosTrash /></Button>
                    <Button
                      variant={this.state.save ? 'primary' : 'outline-primary'}
                      onClick={() => this.setState({ save: !this.state.save })}
                      className='ml-3'
                    >
                      <IoIosSave />
                    </Button>
                  </Col>
                  <Col md={6} className='text-right'>
                    <Button
                      className='mr-3'
                      disabled={this.handleError()}
                      type="submit">
                      {this.state.save ? 'Edit & Save' : 'Edit'}
                    </Button>
                  </Col>
                </Row>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ModalEditDashboard;