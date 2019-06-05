import React, { Component } from 'react';
import { Modal, Button, Container, Form, Col, InputGroup, Row } from 'react-bootstrap';
import { IoMdTrash, IoMdImage, IoMdCreate, IoMdSave } from 'react-icons/io';
import ImportedImage from '../../uploadImage/importedImage';
import FormInput from '../formInput';
import Availability from '../availability';
import AnimatedSwap from '../../Swap/Animated';
import Store from '../../../Store';
import { connect } from 'react-redux';
import { Types, action } from '../../../Actions';
import MultiDashboardEdit from '../MultiDashboardEdit';

class ModalEditDashboard extends Component {
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
      watermark: '',
      watermarkPosition: this.props.dashboard.watermarkPosition || 'center',
      delayTime: 'sec',
      timeoutTime: 'sec',
      multDashEditControl: true,
      save: false
    }
  }

  componentDidMount() {
    this.setState({
      isMultiDashboard: this.state.Url.match(/\/api\/multi-dashboards\/\d+/) ? true : false
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        validated: false,
        Timeout: this.props.dashboard.timeout || '',
        Viewport: this.props.dashboard.viewport || '',
        Delay: this.props.dashboard.delay || '',
        Url: this.props.dashboard.url,
        Available: this.props.dashboard.availability || '',
        Description: this.props.dashboard.description || '',
        watermark: this.props.dashboard.watermark || '',
        watermarkPosition: this.props.dashboard.watermarkPosition || 'center',
        delayTime: 'sec',
        timeoutTime: 'sec',
        multDashEditControl: true,
        save: false
      });
    }
    if (this.state.Url && this.state.Url !== prevState.Url)
      this.setState({
        isMultiDashboard: this.state.Url.match(/\/api\/multi-dashboards\/\d+/) ? true : false
      });
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
    this.props.rest.deleteDashboard(this.props.dashboard.id, this.props.dashboard.url);
    this.closeModal();
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
    if (this.state.save){
      this.props.rest.saveDashboard(body);
    }
    this.props.rest.editDashboard(body, this.props.dashboard.id, this.props.url);
    this.closeModal();
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
    if (!this.isValidViewport())
      return (true);
    return (false);
  }

  renderDashboardUrlEdit() {
    if (this.state.isMultiDashboard)
      return (
        <>
          <Button variant={this.state.multDashEditControl ? 'outline-primary' : 'primary'} className='col-sm-6 mx-auto mb-3'
            onClick={() => this.setState({ multDashEditControl: !this.state.multDashEditControl })}>
            <IoMdCreate /> Edit multi dashboard
          </Button>
          <AnimatedSwap className="form-group col-sm-12" control={this.state.multDashEditControl} delay={300}>
            <FormInput
              className="p-0"
              sm={12}
              required={true}
              value={this.state.Url}
              placeholder="Url"
              name='Url'
              updateValue={this.handleInput}
              onError='insert an URL or upload an image'
              type="url"
              dataName='dashboard'
              upload-route='/api/upload'
              openImageManagement={(name, index, folderName) => this.handleInput('images', {name, index, folderName})}
            />
            <MultiDashboardEdit url={this.state.Url} handleInput={this.handleInput} newMult={this.state.newMult}/>
          </AnimatedSwap>
        </>
      );
    else
      return (
        <FormInput
          sm={12}
          required={true}
          value={this.state.Url}
          placeholder="Url"
          name='Url'
          updateValue={this.handleInput}
          onError='insert an URL or upload an image'
          type="url"
          dataName='dashboard'
          upload-route='/api/upload'
          openImageManagement={(name, index, folderName) => this.handleInput('images', {name, index, folderName})}
        />
      );
  }

  validateImage = () => {
    if (!this.state.multDashEditControl) {
      this.state.images.validateImage();
      this.setState({ images: false});
    } else {
      this.setState({[this.state.images.name]: this.state.newImageUrl || ''})
      this.setState({ images: false });
    }
  }

  closeModal = () => {
    Store.dispatch(action(Types.SetModal, {
      modal: {
        show: false
      }
    }));
  }

  render() {
    const importedImagesValue = this.state.images
    ? this.state[this.state.images.name]
    : '';
    return (
      <Modal rest={this.props.rest}
        group={this.props.group}
        dashboard={this.props.dashboard}
        show={this.props.show === 'editDashboard'}
        onHide={this.closeModal} className='onTop' size='lg' aria-labelledby="contained-modal-title-vcenter">
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
            {this.state.images
                  ? <ImportedImage
                      handleInput={this.state.images.handleInput || this.handleInput}
                      images={this.state.images}
                      value={importedImagesValue}
                      folder={this.state.images.folderName}
                    />
                  :
              <Form.Row>
                {this.renderDashboardUrlEdit()}
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
                  openImageManagement={(name, index, folderName) => this.handleInput('images', {name, index, folderName})}
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
                      className='custom-select custom-select-lg'
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
                <FormInput md={12} sm={12} required={false} value={this.state.Description} placeholder="Description"
                  name='Description' updateValue={this.handleInput} type="text" />
                <FormInput md={12} sm={12} required={false} isInvalid={!this.isValidViewport()}
                  value={this.state.Viewport} placeholder="Viewport size (height x width)" name='Viewport'
                  updateValue={this.handleInput} type="text" />
                <FormInput md={6} sm={12} required={false} value={this.state.Timeout}
                  placeholder="Timeout" name='Timeout' updateValue={this.handleInput} type="number"
                  dropdown={true} time={this.state.timeoutTime} selectTime={(value) => { this.setState({ timeoutTime: value }) }} />
                <FormInput md={6} sm={12} required={false} value={this.state.Delay}
                  placeholder="Delay" name='Delay' updateValue={this.handleInput} type="number"
                  dropdown={true} time={this.state.delayTime} selectTime={(value) => { this.setState({ delayTime: value }) }} />
                <FormInput md={12} sm={12} required={false} value={this.state.Available} hasTextArea={true}
                  placeholder="This dashboard is available when..." name='Available' updateValue={this.handleInput} type="text" />
                <Form.Text className="text-muted">
                  <Availability input={this.state.Available} />
                </Form.Text>
              </Form.Row>
            }
            </Container>
          </Modal.Body>
          <Modal.Footer>
          { this.state.images
                ? 
                  <>
                    <Button 
                      variant='outline-primary'
                      onClick={() => this.setState({ images: false }) }
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => this.validateImage() }>
                      Add image
                    </Button>
                  </>
                :
                <Row className='w-100'>
                  <Col md={6} className='text-left pl-0'>
                    <Button variant="danger" onClick={this.deleteDashboard}><IoMdTrash /></Button>
                    <Button
                      variant={this.state.save ? 'primary' : 'outline-primary'}
                      onClick={() => this.setState({ save: !this.state.save })}
                      className='ml-3'
                    >
                      <IoMdSave />
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
          }
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

function mapStateWithProps(state) {
  return {
    dashboard: state.modal.dashboard,
    show: state.modal.show,
    group: state.modal.group,
    rest: state.modal.rest,
  };
}

export default connect(mapStateWithProps)(ModalEditDashboard);