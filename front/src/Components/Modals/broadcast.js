import React, { Component } from 'react';
import { Modal, Col, Button, Container, Form, Card, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IoMdAddCircle, IoMdCloseCircle, IoMdArrowBack, IoMdDesktop, IoMdImage, IoMdPricetag, IoMdGrid } from 'react-icons/io'
import FormInput from './formInput';
import Axios from 'axios';
import Collapse from '../Collapse';
import Store from '../../Redux/Store';
import { Types, action } from '../../Redux/Actions';
import ImportedImage from '../uploadImage/importedImage';
import { toast } from 'react-toastify';

class ModalBroadcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Groups: [{}],
      Timeout: '',
      Delay: '',
      Url: '',
      Viewport: '',
      validated: false,
      opened: false,
      enableAllGroup: true,
      delayTime: 'sec',
      timeoutTime: 'sec',
      watermark: '',
      watermarkPosition: 'center',
    }
  }

  getGroup = () => {
    var newGroups = [];

    Axios.get('/api/group').then((res) => {
      Object.keys(res.data).forEach(item => {
        newGroups.push({
          title: res.data[item].name,
          id: res.data[item].id,
          enabled: true
        })
      });
      if (this.state.Groups !== newGroups)
        this.setState({ Groups: newGroups });
    })
      ;
  }

  componentDidMount() {
    this.getGroup();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState === this.state) {
      this.getGroup();
    }
  }

  reinitialise = () => {
    this.setState({
      Timeout: '',
      Viewport: '',
      Delay: '',
      Url: '',
      Description: '',
      delayTime: 'sec',
      timeoutTime: 'sec',
      watermark: '',
      watermarkPosition: 'center',
    });
  }

  handleInput = (inputName, inputValue) => {
    if ((inputName === 'Timeout' || inputName === 'Delay') && inputValue <= 0)
      inputValue = '';
    this.setState({ [inputName]: inputValue });
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
      delay: (delay === 0 || delay === '' ? null : delay),
      url: this.state.Url,
      description: this.state.Description,
      viewport: (this.state.Viewport === '' ? null : this.state.Viewport),
      watermark: this.state.watermark,
      watermarkPosition: this.state.watermarkPosition,
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
    this.closeModal();
  }

  toggleGroup = (i) => {
    let tmp = this.state.Groups;

    tmp[i].enabled = !tmp[i].enabled;
    this.setState({ Groups: tmp });
  }

  toggleTag = (id) => {
    let tmp = this.state.Groups;
    let tag = this.props.groupTags.find(elem => elem.id === id);
    if (!tag || !tag.groups)
      return;
    tag.groups.forEach((groupId, i) => {
      tmp.forEach((group, i) => {
        if (`${group.id}` === groupId)
          group.enabled = !tag.enable;
      });
    });
    tag.enable = !tag.enable
    this.setState({ Groups: tmp });
  }

  toggleAll = () => {
    let tmp = this.state.Groups;

    tmp.forEach((item, i) => {
      item.enabled = !this.state.enableAllGroup;
    });
    this.props.groupTags.forEach((tag, i) => {
      tag.enable = !this.state.enableAllGroup;
    });
    this.setState({ Group: tmp, enableAllGroup: !this.state.enableAllGroup });
  }

  toggleIcon = (isEnable) => {
    return (isEnable ? <IoMdAddCircle size="1.5em" /> : <IoMdCloseCircle size="1.5em" />)
  }

  allGroups() {
    return <div className="card mb-3">
      <Card.Header onClick={() => this.setState({ opened: !this.state.opened })} style={{ cursor: 'pointer', position: 'relative', paddingLeft: '.75rem' }}>
        <IoMdDesktop width="30" height="30" /> Display groups
        <IoMdArrowBack className={`sb-collapse-arrow mr-3 ${!this.state.opened ? '' : 'active'}`} />
      </Card.Header>
      <Collapse collapsed={this.state.opened}>
        <div className="card-body text-center">
          <div className="mb-3">
            <Button variant={this.state.enableAllGroup ? "primary" : "outline-primary"}
              onClick={() => { this.toggleAll() }}>
              {this.toggleIcon(this.state.enableAllGroup)}
              <span className="ml-3">
                {this.state.enableAllGroup ? 'Disable all' : 'Enable all'}
              </span>
            </Button>
          </div>
          <p className="mb-1"><IoMdPricetag /> Tags</p>
          <div className="pb-2" >
            {this.props.groupTags.map((item, i) =>
              <span key={i} className="mb-2">
                <Button className="badge m-1" style={item.enable ? { backgroundColor: item.color, borderColor: item.color }
                  : { backgroundColor: "#f8f9fa", color: "#212529", borderColor: "#f8f9fa" }}
                  onClick={() => this.toggleTag(item.id)} >
                  <span className="text-color-depend-bg">{item.name}</span>
                </Button>
              </span>
            )}
          </div>
          <hr className="border-bottom my-2 border-gray" />
          <p className="mb-1"><IoMdGrid /> Groups</p>
          <div>
            {this.state.Groups.map((item, i) =>
              <span key={i} className="mb-2">
                <Button className="m-1" variant={item.enabled ? "primary" : "outline-primary"}
                  onClick={() => this.toggleGroup(i)} >
                  {item.title}
                </Button>
              </span>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  }

  validateImage = () => {
    this.setState({ [this.state.images.name]: this.state.newImageUrl || '' })
    this.setState({ images: false });
  }

  closeModal = () => {
    Store.dispatch(action(Types.SetModalState, { show: false }));
  }

  render() {
    const importedImagesValue = this.state.images
      ? this.state[this.state.images.name]
      : '';
    return (
      <Modal show={this.props.show === 'broadcast'} onHide={this.closeModal} className='onTop' size='lg' aria-labelledby="contained-modal-title-vcenter">
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
              {this.state.images
                ? <ImportedImage
                  handleInput={this.state.images.handleInput || this.handleInput}
                  images={this.state.images}
                  value={importedImagesValue}
                  folder={this.state.images.folderName}
                />
                :
                <>
                  {this.allGroups()}
                  <Form.Row>
                    <FormInput sm={12}
                      required={true}
                      placeholder="Url"
                      name='Url'
                      value={this.state.Url}
                      updateValue={this.handleInput}
                      onError='insert an URL or upload an image'
                      type="url"
                      dataName='dashboard'
                      upload-route='/api/upload'
                      openImageManagement={(name, index, folderName) => this.handleInput('images', { name, index, folderName })}
                    />
                    <FormInput
                      md={6}
                      sm={12}
                      value={this.state.watermark}
                      placeholder='Watermark'
                      name='watermark'
                      updateValue={this.handleInput}
                      type="url"
                      dataName='dashboard'
                      upload-route='/api/upload'
                      openImageManagement={(name, index, folderName) => this.handleInput('images', { name, index, folderName })}
                    />
                    <Form.Group as={Col} md={6} sm={12}>
                      <InputGroup>
                        <InputGroup.Prepend style={{ width: '42px' }}>
                          <InputGroup.Text className="input-group-text" htmlFor='watermarkPosition'>
                            <IoMdImage />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          className='custom-select custom-select-lg'
                          size='lg'
                          as='select'
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
                  </Form.Row>
                  <Form.Row>
                    <FormInput md={12} sm={12} required={false} value={this.state.Description}
                      placeholder="Description" name='Description' updateValue={this.handleInput} type="text" />
                    <FormInput md={12} sm={12} required={false} isInvalid={!this.isValidViewport()} value={this.state.Viewport}
                      placeholder="Viewport size (height x width)" name='Viewport' updateValue={this.handleInput} type="text" />
                    <FormInput md={6} sm={12} required={false} isInvalid={this.state.Timeout <= 0}
                      placeholder="Timeout" name='Timeout' updateValue={this.handleInput} type="number" value={this.state.Timeout}
                      dropdown={true} time={this.state.timeoutTime} selectTime={(value) => { this.setState({ timeoutTime: value }) }} />
                    <FormInput md={6} sm={12} required={false} isInvalid={this.state.Delay < 0}
                      placeholder="Delay" name='Delay' updateValue={this.handleInput} type="number" value={this.state.Delay}
                      dropdown={true} time={this.state.delayTime} selectTime={(value) => { this.setState({ delayTime: value }) }} />
                  </Form.Row>
                </>}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            {this.state.images
              ?
              <>
                <Button
                  variant='outline-primary'
                  onClick={() => this.setState({ images: false })}
                >
                  Cancel
                    </Button>
                <Button onClick={() => this.validateImage()}>
                  Add image
                    </Button>
              </>
              :
              <Button disabled={this.handleError()} type="submit">Send</Button>
            }
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

function mapStateWithProps(state) {
  state.Data.GroupTags.forEach(tag => tag.enable = true);
  return {
    groupTags: state.Data.GroupTags,
    show: state.Modal.show
  };
}

export default connect(mapStateWithProps)(ModalBroadcast);