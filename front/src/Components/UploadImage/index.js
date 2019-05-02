import React, { Component } from 'react';
import { Modal, Row, Col, Button, Container } from 'react-bootstrap';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);

export default class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: []
		};
	}

	closeModal = () => {
		console.log('close');
	}

	confirm = () => {
		console.log(this.state.files);
	}

	render() {
		return (
			<Modal 
				show={true} 
				onHide={this.closeModal} 
				size='lg' 
				aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Upload an image
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
							<FilePond 
							  files={this.state.files}
								server='http://10.138.11.150:8080/api/upload'
								onupdatefiles={fileItems => {
									this.setState({
										files: fileItems.map(fileItem => fileItem.file)
									});
								}}/>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.confirm}>Save</Button>
          </Modal.Footer>
      </Modal>
		);
	}
};