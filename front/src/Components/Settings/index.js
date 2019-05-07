import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Types, action } from '../../Actions';
import Swap from '../Swap';
import { Modal, Button, Container, Form, Col, InputGroup } from 'react-bootstrap';
import FormInput from '../Modals/formInput';
import { IoMdImage } from 'react-icons/io';


class ModalSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useBranding: false,

      timezone: 'Europe/Paris',
      branding: 'default',
      background_choice: 'color',
      background_color: '#1c1a1f',
      background_image: '',
      loading_image: '',
      stamp: '',
      unassigned_images: [],
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

  handleError = () => {
    return false;
  }

  brandingForm = () => {
    return (
      <>
        <FormInput
          sm={12}
          required={true}
          placeholder='Brand name'
          name='branding'
          updateValue={this.handleInput}
          type='text'
        />

        <Form.Group as={Col} className='input-group-lg' sm={12}>
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
          ? <p>coucou color</p>
          : <p> coucou image </p>}
      </>
    );
  }

  defaultForm = () => {
    return (
      <>
        <FormInput
          sm={12}
          required={true}
          placeholder="Url"
          name='Url'
          updateValue={this.handleInput}
          onError='insert an URL'
          type='url'
        />
        <FormInput
          sm={12}
          required={true}
          placeholder="Url"
          name='Url'
          updateValue={this.handleInput}
          onError='insert an URL'
          type='url'
        />
        <FormInput
          sm={12}
          required={true}
          placeholder="Url"
          name='Url'
          updateValue={this.handleInput}
          onError='insert an URL'
          type='url'
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
                  sm={12}
                  required={false}
                  value={this.state.timezone}
                  placeholder='Timezone'
                  name='timezone'
                  updateValue={this.handleInput}
                  type='text'
                />
                <Form.Group as={Col} className='input-group-lg' sm={12}>
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
                      Use branding
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