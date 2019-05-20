import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Types, action } from '../../Actions';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Container, Form, Col, InputGroup } from 'react-bootstrap';
import FormInput from '../Modals/formInput';
import { IoMdImage, IoMdColorPalette, IoMdAdd } from 'react-icons/io';
import './Settings.css';

class ModalSettings extends Component {
  constructor(props) {
    super(props);
    const settings = this.props.settings;
    this.state = {
      useBranding: settings.useBranding,
      timezone: settings.timezone,
      background_choice: settings.background_choice,
      background_color: settings.background_color,
      background_image: settings.background_image,
      loading_image: settings.loading_image,
      stamp: settings.stamp,
      unassigned_images: settings.unassigned_images,
      uploaded_images_format: settings.uploaded_images_format,
    }
    this.Rest = this.props.rest;
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const settings = this.props.settings;
      this.setState({
        useBranding: settings.useBranding,
        timezone: settings.timezone,
        background_choice: settings.background_choice,
        background_color: settings.background_color,
        background_image: settings.background_image,
        loading_image: settings.loading_image,
        stamp: settings.stamp,
        unassigned_images: settings.unassigned_images,
        uploaded_images_format: settings.uploaded_images_format,
      })
    }
  }

  handleInput = (inputName, inputValue, event) => {
    if (inputName === 'unassigned') {
      const unassigned = [...this.state.unassigned_images];
      unassigned[parseInt(event.target.attributes.index.value)] = inputValue;
      this.setState({ unassigned_images: unassigned });
    } else {
      this.setState({ [inputName]: inputValue });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setStoreState({ settings: this.state });
    const oldProps = this.props;
    Axios.put('/api/settings/config', { config: this.state })
      .then(() => {
        this.props.onHide();
        toast.success('Successfully updated settings');
      })
      .catch((err) => {
        toast.error(`Failed to send configuration file: ${err.message}`)
        this.props.setStoreState({ settings: oldProps });
      });
  }

  handleError = () => {
    return false;
  }

  removeUnassigned = (index) => {
    const unassigned = [...this.state.unassigned_images];
    unassigned.splice(index, 1)
    if (unassigned.length > 0) {
      this.setState({ unassigned_images: unassigned });
    }
  }

  brandingForm = () => {
    return (
      <>
        <FormInput
          sm={12}
          placeholder='Image url'
          label='Branding stamp'
          name='stamp'
          updateValue={this.handleInput}
          value={this.state.stamp}
          type='url'
          data-name='brand'
          upload-route='/api/settings/upload/brand'
        />
        <FormInput
          sm={12}
          placeholder='Image url'
          label='Branding loading image'
          name='loading_image'
          updateValue={this.handleInput}
          value={this.state.loading_image}
          type='url'
          data-name='brand'
          upload-route='/api/settings/upload/brand'
        />
        <Form.Group as={Col} sm={12}>
          <Form.Label>Unassigned displays background</Form.Label>
          <Form.Row className='input-group-lg' sm={12}>

            <Form.Group as={Col} sm={6}>
              <InputGroup>
                <InputGroup.Prepend style={{ width: '42px' }}>
                  <InputGroup.Text className="input-group-text" htmlFor='inputGroupSelect01'>
                    <IoMdImage />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  size='lg'
                  as='select'
                  value={this.state.background_choice}
                  onChange={event => this.setState({ background_choice: event.target.value })}
                >
                  <option value='color'>Use a background color</option>
                  <option value='image'>Use a background image</option>
                </Form.Control>
              </InputGroup>
            </Form.Group>

            {this.state.background_choice === 'color'
              ?
              <Form.Group as={Col} sm={6}>
                <InputGroup>
                  <InputGroup.Prepend style={{ width: '42px' }}>
                    <InputGroup.Text className='input-group-text' htmlFor='inputGroupSelect01'>
                      <IoMdColorPalette />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    size='lg'
                    type='color'
                    value={this.state.background_color}
                    onChange={event => this.setState({ background_color: event.target.value })} />
                </InputGroup>
              </Form.Group>

              : <FormInput
                sm={6}
                required={true}
                placeholder='Image url'
                name='background_image'
                updateValue={this.handleInput}
                value={this.state.background_image}
                type='url'
                data-name='brand'
                upload-route='/api/settings/upload/brand'
              />}
          </Form.Row>
        </Form.Group>
      </>
    );
  }

  defaultForm = () => {
    return (
      <>
        <Form.Label className='ml-1'>Unassigned displays images</Form.Label>
        {this.state.unassigned_images && this.state.unassigned_images.map((elem, i) => {
          return <FormInput
            sm={12}
            required={true}
            placeholder='Url'
            name='unassigned'
            value={elem}
            updateValue={this.handleInput}
            onError='insert an URL'
            type='url'
            data-name='unassigned'
            upload-route='/api/settings/upload/unassigned'
            removeUnassigned={this.removeUnassigned}
            unassignedList={this.state.unassigned_images}
            index={i}
            key={`url${i}`}
          />
        })
        }
        <Col key="0" sm={12}>
          <Button
            sm={12}
            variant='outline-secondary'
            className='btn-lg btn-block lightHover'
            onClick={() => {
              const newUnassigned = this.state.unassigned_images;
              newUnassigned.push('');
              this.setState({ unassigned_images: newUnassigned })
            }
            }
          >
            <IoMdAdd />
          </Button>
        </Col>
      </>
    );
  }

  render() {
    return (
      <Modal {...this.props} className='onTop' size='lg' aria-labelledby="contained-modal-title-vcenter">
        <Form
          onSubmit={this.handleSubmit}
          noValidate
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              General settings
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form.Row>
                <FormInput
                  label='Timezone'
                  sm={12}
                  required={false}
                  value={this.state.timezone}
                  placeholder='Timezone'
                  name='timezone'
                  updateValue={this.handleInput}
                  type='text'
                />
                <Form.Group as={Col} className='input-group-lg' sm={12}>
                  <Form.Label>Uploaded images format</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend style={{ width: '42px' }}>
                      <InputGroup.Text className="input-group-text" htmlFor="inputGroupSelect01">
                        <IoMdImage />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      size='lg'
                      as='select'
                      value={this.state.uploaded_images_format}
                      onChange={event => this.setState({ uploaded_images_format: event.target.value })}
                    >
                      <option value='cover'>Zoom the image until full screen (possible loss)</option>
                      <option value='contain'>Display all image (adds white borders to avoid loss)</option>
                    </Form.Control>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} className='input-group-lg' sm={12}>
                  <Form.Label>Use branding logo and images</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend style={{ width: '42px' }}>
                      <InputGroup.Text id="inputGroupPrepend" style={{}}>
                        <Form.Check
                          type='checkbox'
                          id='useBranding'
                          onChange={() => this.setState({ useBranding: !this.state.useBranding })}
                          checked={this.state.useBranding === true}
                        />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <div
                      className='form-control form-control-lg'
                      onClick={() => this.setState({ useBranding: !this.state.useBranding })}
                      style={{ cursor: 'pointer' }}
                    >
                      {this.state.useBranding ? 'Using branding' : 'Not using branding'}
                    </div>
                  </InputGroup>
                </Form.Group>
                {this.state.useBranding
                  ? this.brandingForm()
                  : this.defaultForm()}
              </Form.Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={this.handleError()} type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal >
    );
  }
};

function mapStateToProps(state) {
  return ({
    settings: state.settings
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    setStoreState: (payload) => dispatch(action(Types.SetStoreState, payload))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSettings);