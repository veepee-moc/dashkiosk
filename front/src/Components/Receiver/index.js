import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Types, action } from '../../Redux/Actions';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import './Receiver.css';
import supervisor from './supervisor';
import socketio from './socketio';
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
			<Swap control={this.props.receiverConnected}>
				<Display isPreview={this.props.isPreview} />
				<Spinner className="centered" animation="grow" />
			</Swap>
		);
	}
}

function mapStateToProps(state) {
	console.log(state);
	return ({
		receiverConnected: state.Receiver.receiverConnected
	});
}

function mapDispatchToProps(dispatch) {
	return ({
		SetReceiverState: (payload) => dispatch(action(Types.SetReceiverState, payload))
	});
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Receiver));