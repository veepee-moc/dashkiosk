import React from 'react';
import { Modal, Col, Button, Container } from 'react-bootstrap';

export default function Modals(props) {
  return (
    <Modal {...props} className='onTop' size='lg' aria-labelledby="contained-modal-title-vcenter">
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
        <Button onClick={() => props.onHide()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}