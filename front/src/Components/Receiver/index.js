import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Types, action } from '../../Actions';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import socketio from './socketio';
import supervisor from './supervisor';
import errors from './errors';
import Display from './Display';
import Swap from '../Swap';

class Receiver extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		errors.enable();
		supervisor.ready();
		console.log('[Dashkiosk] dashkiosk ready, connect to socket.io server');
		socketio(this);
	}

	render() {
		return (
			<Swap control={ this.props.receiverConnected }>
				<Display isPreview={ this.props.isPreview }/>
				<Spinner className="centered" animation="grow" />
			</Swap>
		);
	}
}

function mapStateToProps(state) {
	return ({
		receiverConnected: state.receiverConnected
	});
}

function mapDispatchToProps(dispatch) {
	return ({
		setStoreState: (payload) => dispatch(action(Types.SetStoreState, payload))
	});
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Receiver));