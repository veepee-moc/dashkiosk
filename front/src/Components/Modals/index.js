import React from 'react';
import { Modal, Col, Button, Container } from 'react-bootstrap';
import { Types, action } from '../../Actions';
import Store from '../../Store';

export default function Modals(props) {
  const closeModal = () => {
    Store.dispatch(action(Types.SetModal, {
      modal: {
        show: false
      }
    }));
  }
  return (
    <Modal {...props} onHide={() => closeModal()} className='onTop' size='lg' aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Col>
            {props.title}
          </Col>
          <Col className="font-italic text-muted">
            {props.subtitle}
          </Col>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {props.children}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => closeModal()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

