import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import './Receiver.css';

export default function () {
	return (
		<Container fluid className='fill'>
			<Row className="show-grid align-items-center full">
				<Col xs={12} className='text-center'>
					<Spinner animation='grow' size='lg' />
				</Col>
			</Row>
		</Container>
	);
}
