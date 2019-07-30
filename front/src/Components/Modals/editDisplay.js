import React, { Component } from 'react';
import { Modal, Button, Container, Form } from 'react-bootstrap';
import FormInput from './formInput';
import { connect } from 'react-redux';
import { IoIosTrash } from 'react-icons/io'
import Store from '../../Redux/Store';
import { Types, action } from '../../Redux/Actions';

class ModalEditDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      Description: this.props.display.description || '',
      Viewport: this.props.display.viewport || '',
    }
  }

  deleteDisplay = () => {
    this.props.rest.deleteDisplay(this.props.display.id);
    this.closeModal();
  }

  handleSubmit = (event) => {
    const display = {
      description: (this.state.Description === '' ? null : this.state.Description),
      viewport: (this.state.Viewport === '' ? null : this.state.Viewport)
    }
    event.preventDefault();
    if (display.description !== this.props.display.description || display.viewport !== this.props.display.viewport)
      this.props.rest.editDisplay(display, this.props.display.id);
    this.closeModal();
  }

  handleInput = (inputName, inputValue) => {
    this.setState({ [inputName]: inputValue });
  }

  isValidViewport = () => {
    var reg = new RegExp("^[1-9]\\d*[x][1-9]\\d*$");

    if (this.state.Viewport.length > 0)
      return reg.test(this.state.Viewport);
    return true;
  }

  closeModal = () => {
    Store.dispatch(action(Types.SetModalState, { show: false }));
  }

  render() {
    if (this.props.display) {
      return (
        <Modal show={this.props.show === 'editDisplay'} onHide={() => this.closeModal()} className='onTop' size='lg' aria-labelledby="contained-modal-title-vcenter">
          <Form
            onSubmit={this.handleSubmit}
            noValidate
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-inline-blockvcenter">
                Edit display {this.props.display.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Form.Row>
                  <FormInput md={12} sm={12} required={false} value={this.props.display.ip || ''} disabled={true}
                    name='Ip' updateValue={this.handleInput} type="text" />
                  <FormInput md={12} sm={12} required={false} value={this.state.Description} placeholder="Description"
                    name='Description' updateValue={this.handleInput} type="text" />
                  <FormInput md={12} sm={12} required={false} isInvalid={!this.isValidViewport()} value={this.state.Viewport}
                    placeholder="Viewport size (height x width)" name='Viewport' updateValue={this.handleInput} type="text" />
                </Form.Row>
              </Container>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between pl-5 pr-5">
              <Button disabled={this.props.display.connected} variant="danger" onClick={this.deleteDisplay}><IoIosTrash /></Button>
              <Button disabled={!this.isValidViewport()} type="submit">Save</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return ({
      rest: state.Modal.rest,
      display: state.Modal.display,
      show: state.Modal.show,
  });
}

export default connect(mapStateToProps)(ModalEditDisplay);