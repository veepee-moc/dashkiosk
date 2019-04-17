import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

export default function () {
	return (
		<Container fluid>
			<Row className="show-grid">
				<Col xs={12} className='text-center'>
					<Spinner animation='grow' size='lg' />
				</Col>
			</Row>
		</Container>
	);
}
