import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Types, action } from '../../Actions';
import Axios from 'axios';
import Swap from '../Swap';
import { Modal, Button, Container, Form, Col, InputGroup, Row } from 'react-bootstrap';
import FormInput from '../Modals/formInput';
import { IoMdImage, IoMdColorPalette } from 'react-icons/io';


class ModalSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useBranding: true,
      timezone: 'Europe/Paris',
      background_choice: 'color',
      background_color: '#1c1a1f',
      background_image: '',
      loading_image: '',
      stamp: '',
      unassigned_images: [],
      uploaded_images_format: 'cover',
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

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.put('http://10.138.11.150:8080/api/settings/config', { config: this.state })
      .then(ret => console.log(ret))
      .catch((err) => console.error(`Failed to get configuration file: ${err.message}`));
  }

  handleError = () => {
    return false;
  }

  brandingForm = () => {
    return (
      <>
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
        <Form.Group as={Col} sm={12}>
          <Form.Label>Unassigned displays background</Form.Label>
        <Form.Row className='input-group-lg' sm={12}>
        
        <Form.Group as={Col} sm={6}>
          <InputGroup>
            <InputGroup.Prepend style={{ width: '42px' }}>
              <InputGroup.Text className="input-group-text" htmlFor="inputGroupSelect01">
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
              <InputGroup.Text className="input-group-text" htmlFor="inputGroupSelect01">
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
    /*const arr = [];
    for (var i = 0; i < this.state.chosedTemplate.url; i++)
      arr.push(<FormInput
        sm={12}
        required={true}
        placeholder="Url"
        name='Url'
        value={ this.state.unassigned_images[i]}
        updateValue={this.handleInput}
        onError='insert an URL'
        type='url'
        data-name='unassigned'
        upload-route='/api/settings/upload/unassigned'
        index={i}
        key={i}
      />);

    return arr;*/
    return (
      <>
        <FormInput
          sm={12}
          required={true}
          placeholder="Url"
          name='unassigned_images'
          updateValue={this.handleInput}
          value={ this.state.unassigned_images}
          onError='insert an URL'
          type='url'
          data-name='unassigned'
          upload-route='/api/settings/upload/unassigned'
        />
      </>
    );
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
                      class='form-control form-control-lg'
                      onClick={() => this.setState({ useBranding: !this.state.useBranding })}
                      style={{ cursor: 'pointer' }}
                    >
                      { this.state.useBranding ? 'Using branding' : 'Not using branding' }
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