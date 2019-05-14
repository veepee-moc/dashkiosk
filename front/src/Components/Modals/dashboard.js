import React, { Component } from 'react';
import { Modal, Button, Container, Form, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Axios from 'axios';
import FormInput from './formInput';
import Availability from './availability';

class ModalDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      Timeout: '',
      Viewport: '',
      Delay: '',
      Url: [''],
      Available: '',
      Description: '',
      delayTime: 'sec',
      timeoutTime: 'sec',
      templates: [],
      chosedTemplate: {
        name: 'None',
        url: 1
      }
    }
    this.Rest = this.props.rest;
  }

  componentDidMount() {
    Axios.get('/api/multi-dashboards')
      .then((res) => this.setState({ templates: res.data }))
      .catch((err) => toast.error(`Failed to get dashboard templates:\n${err.message}`));
  }

  componentDidUpdate(prevProps) {
    if (this.props.show && !prevProps.show)
      this.reinitialise();
  }

  reinitialise = () => {
    this.setState({
      Timeout: '',
      Viewport: '',
      Delay: '',
      Url: [''],
      Available: '',
      Description: '',
      delayTime: 'sec',
      timeoutTime: 'sec',
      templates: [],
      chosedTemplate: {
        name: 'None',
        url: 1
      }
    });
    this.componentDidMount();
  }

  unassigned = () => {
    const body = {
      url: '/unassigned',
      description: 'Dashboard for unassigned display',
      timeout: null,
      delay: null,
      viewport: null,
      availability: null
    };
    this.Rest.addDashboard(body);
    this.props.onHide();
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.show !== prevProps.show || prevState !== this.state)
      return true;
    return false;
  }

  handleInput = (inputName, inputValue, event) => {
    if ((inputName === 'Timeout' && inputValue <= 0) || (inputName === 'Delay' && inputValue <= 0))
      inputValue = '';
    if (inputName !== 'Url')
      this.setState({ [inputName]: inputValue });
    else {
      const urls = [...this.state.Url];
      urls[parseInt(event.target.attributes.index.value)] = inputValue;
      this.setState({ Url: urls });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const delay = (this.state.delayTime === 'sec' ? this.state.Delay : this.setTime(this.state.delayTime, this.state.Delay));
    const timeout = (this.state.timeoutTime === 'sec' ? this.state.Timeout : this.setTime(this.state.timeoutTime, this.state.Timeout));
    const body = {
      url: this.state.Url.length <= 1 ? this.state.Url[0] : this.state.Url,
      template: this.state.chosedTemplate,
      description: this.state.Description,
      timeout: (timeout === 0 || timeout === '' ? null : timeout),
      delay: (delay === 0 || delay === '' ? null : delay),
      viewport: (this.state.Viewport === '' ? null : this.state.Viewport),
      availability: this.state.Available
    };
    this.Rest.addDashboard(body);
    this.reinitialise();
    this.props.onHide();
  }

  setTime = (time, value) => {
    return (time === 'hour' ? (value * 60 * 60) : (value * 60));
  }

  isValidViewport = () => {
    var reg = new RegExp("^[1-9]\\d*[x][1-9]\\d*$");

    if (this.state.Viewport.length > 0) {
      return reg.test(this.state.Viewport);
    }
    return true;
  }

  handleError = () => {
    if (!this.isValidViewport)
      return (true);
    return (false);
  }

  handleTemplateChanged = (event) => {
    const template = this.state.templates.find((obj) => obj.name === event.target.value);
    if (template) {
      const url = [];
      for (var i = 0; i < template.url; i++)
        url.push('');
      this.setState({ Url: url, chosedTemplate: template });
    }
    else
      this.setState({ Url: [''], chosedTemplate: { name: 'None', url: 1 } });
  }

  renderUrlInput() {
    const arr = [];
    for (var i = 0; i < this.state.chosedTemplate.url; i++)
      arr.push(<FormInput
        className="pl-4"
        md={12}
        sm={12}
        required={true}
        value={this.state.Url[i]}
        placeholder="Url"
        name='Url'
        updateValue={this.handleInput}
        onError='insert an URL or upload an image'
        type="url"
        data-name='dashkiosk'
        upload-route='/api/upload'
        rest={this.props.rest}
        index={i}
        key={i}
      />);
    return arr;
  }

  render() {
    return (
      <Modal {...this.props} className='onTop' size='lg' aria-labelledby="contained-modal-title-vcenter">
        <Form onSubmit={this.handleSubmit} noValidate>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <Col sm={12} md={12}>
                Add a new dashboard to group
                </Col>
              <Col sm={12} md={12} className="font-italic text-muted">
                {this.props.group.name}
              </Col>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text">Template</label>
                </div>
                <select className="custom-select" onChange={ this.handleTemplateChanged }>
                  <option defaultValue>None</option>
                  { this.state.templates.map((tp, index) =>
                      <option key={index} value={tp.name}>{tp.name}</option>) }
                </select>
              </div>
              <Form.Row>
                { this.renderUrlInput() }
              </Form.Row>
              <Form.Row>
                <FormInput md={12} sm={12} required={false} value={this.state.Description} placeholder="Description" name='Description' updateValue={this.handleInput} type="text" />
                <FormInput md={12} sm={12} required={false} isInvalid={!this.isValidViewport()} value={this.state.Viewport} placeholder="Viewport size (height x width)" name='Viewport' updateValue={this.handleInput} type="text" />
                <FormInput md={6} sm={12} required={false} value={this.state.Timeout}
                  placeholder="Timeout" name='Timeout' updateValue={this.handleInput} type="number"
                  dropdown={true} time={this.state.timeoutTime} selectTime={(value) => { this.setState({ timeoutTime: value }) }} />
                <FormInput md={6} sm={12} required={false} value={this.state.Delay}
                  placeholder="Delay" name='Delay' updateValue={this.handleInput} type="number"
                  dropdown={true} time={this.state.delayTime} selectTime={(value) => { this.setState({ delayTime: value }) }} />
                <FormInput md={12} sm={12} required={false} hasTextArea={true} placeholder="This dashboard is available when..." name='Available' updateValue={this.handleInput} type="text" />
                <Form.Text className="text-muted">
                  <Availability input={this.state.Available}/>
                </Form.Text>
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