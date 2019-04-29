import React, { Component } from 'react';
import { Modal, Row, Col, Button, Container, Form, Collapse, Card } from 'react-bootstrap';
import { IoMdAddCircle, IoMdCloseCircle } from 'react-icons/io'
import FormInput from './formInput';
import Axios from 'axios';
import { toast } from 'react-toastify';

class ModalBroadcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Groups: [{}],
      Timeout: '',
      Delay: '',
      Url: '',
      Viewport:'',
      validated: false,
      opened: false,
      enableAllGroup: true,
      delayTime: 'sec',
      timeoutTime: 'sec'
    }
  }

  shouldComponentUpdate (prevProps, prevState) {
    if (this.props.show !== prevProps.show || prevState !== this.state)
      return true;
    return false;
  }

  componentDidMount () {
    var newGroups = [];

    Axios.get('/api/group').then((res) => {
      Object.keys(res.data).forEach(item => {
        newGroups.push({
          title: res.data[item].name,
          id: res.data[item].id,
          enabled: true
        })
      });
      this.setState({ Groups: newGroups });
    });
  }

  reinitialise = () => {
    this.setState({
      Timeout: 1,
      Viewport:'',
      Delay: 0,
      Url: '',
      Description: '',
      delayTime: 'sec',
      timeoutTime: 'sec'
    });
  }

  handleInput = (inputName, inputValue) => {
    if ((inputName === 'Timeout' && inputValue <= 0) || (inputName === 'Delay' && inputValue <= 0))
      inputValue = '';
    this.setState({ [inputName]: inputValue });
  }

  isValidUrl = () => {
    let url = this.state.Url;

    if (url.length < 7)
      return false;
    if (url.length > 0) {
      if (url.substring(0, 7) === "http://" || url.substring(0, 8) === "https://")
        return true;
    }
    return false;
  }

  isValidViewport = () => {
    let reg = new RegExp("^[1-9]\\d*[x][1-9]\\d*$");

    if (this.state.Viewport.length > 0)
      return reg.test(this.state.Viewport);
    return true;
  }

  isValidGroups = () => {
    for (var i = 0; i < this.state.Groups.length; i++) {
      if (this.state.Groups[i].enabled)
        return true;
    }
    return false;
  }

  handleError = () => {
    let url = this.state.Url;
    var ret = this.state.Delay < 0 || this.state.Timeout <= 0 || !this.isValidViewport() || !this.isValidGroups();

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

  restSendBroadcast = (inputs) => {
    Axios.post('/api/broadcast', inputs)
      .then(() => toast.success('Successfully broadcasted.'))
      .catch(() => toast.error('Failed to broadcast.'));
  }

  setTime = (time, value) => {
    return (time === 'hour' ? (value * 60 * 60) : (value * 60));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const delay = (this.state.delayTime === 'sec' ? this.state.Delay : this.setTime(this.state.delayTime, this.state.Delay));
    const timeout = (this.state.timeoutTime === 'sec' ? this.state.Timeout : this.setTime(this.state.timeoutTime, this.state.Timeout));
    const dashboard = {
      timeout: timeout,
      url: this.state.Url,
      description: this.state.Description,
      viewport: this.state.Viewport,
      delay: delay
    }
    let groups = [];
    let body;

    this.state.Groups.forEach(item => {
      if (item.enabled)
        groups.push(item.id);
    });
    body = {
      groups: groups,
      dashboard: dashboard
    };
    this.restSendBroadcast(body);
    this.reinitialise();
    this.props.onHide();
  }

  toggleGroup = (i) => {
    let tmp = this.state.Groups;

    tmp[i].enabled = !tmp[i].enabled;
    this.setState({ Groups: tmp });
  }

  toggleAll= () => {
    let tmp = this.state.Groups;

    tmp.forEach((item, i) => {
      item.enabled = !this.state.enableAllGroup;
    });
    this.setState({ Group: tmp, enableAllGroup: !this.state.enableAllGroup });
  }

  toggleIcon = (isEnable) => {
    return (isEnable ? <IoMdAddCircle size="1.5em" /> : <IoMdCloseCircle size="1.5em" />)
  }

  allGroups() {
    return <Card className="mb-3">
      <Card.Header onClick={() => this.setState({ opened: !this.state.opened })} style={{ cursor: 'pointer' }}>
        Display groups
      </Card.Header>
      <Collapse in={this.state.opened}>
        <Card.Body className="text-center">
          <Row className="mb-3">
            <Col>
              <Button className="text-left col-md-6 col-sm-6" variant= {this.state.enableAllGroup ? "info" : "light"}
                onClick={() => {this.toggleAll()}}>
                {this.toggleIcon(this.state.enableAllGroup)}
                <span className="ml-3">
                {this.state.enableAllGroup ? 'Disable all' : 'Enable all'}
                </span>
              </Button>
            </Col>
          </Row>
          <Row>
            {this.state.Groups.map((item, i) =>
              <Col key={i} className="d-flex justify-content-around mb-3" md="3" sm="12">
                <Button  className=" col-md-12 col-sm-12"  variant={item.enabled ? "info" : "light"}
                  onClick={() => this.toggleGroup(i)} >
                  {item.title}
                </Button>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Collapse>
    </Card>
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
              Send a broadcast
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {this.allGroups()}
              <Form.Row>
                <FormInput md={12} sm={12} required={true} isInvalid={!this.isValidUrl()}
                  placeholder="Url" name='Url' updateValue={this.handleInput} onError='insert an URL' type="text" />
                <FormInput md={12} sm={12} required={false} value={this.state.Description}
                  placeholder="Description" name='Description' updateValue={this.handleInput} type="text" />
                <FormInput md={12} sm={12} required={false} isInvalid={!this.isValidViewport()} value={this.state.Viewport}
                  placeholder="Viewport size (height x width)" name='Viewport' updateValue={this.handleInput} type="text" />
                <FormInput md={6} sm={12} required={false} isInvalid={this.state.Timeout <= 0}
                  placeholder="Timeout" name='Timeout' updateValue={this.handleInput} type="number" value={this.state.Timeout}
                  dropdown={true}  time={this.state.timeoutTime} selectTime={(value) => { this.setState({ timeoutTime: value }) }} />
                <FormInput md={6} sm={12} required={false} isInvalid={this.state.Delay < 0}
                  placeholder="Delay" name='Delay' updateValue={this.handleInput} type="number" value={this.state.Delay}
                  dropdown={true}  time={this.state.delayTime} selectTime={(value) => { this.setState({ delayTime: value }) }} />
              </Form.Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={this.handleError()} type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ModalBroadcast;