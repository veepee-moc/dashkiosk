import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SetStoreState } from '../../Actions';
import { connect } from 'react-redux';
import './Receiver.css';
import socketio from './socketio';
import supervisor from './supervisor';
import errors from './errors';
import Loading from './Loading';
import Display from './Display';

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
			<div className="fullwindow">
				<div className="glow"></div>
				<div className="osd text"></div>
				<div className="osd technical"></div>
				<div className="connecting"></div>
				<div className="show loading" id="loading">
					<div className="branding branding-{{ branding }}"></div>
				</div>
				{(this.props.receiverConnected)
					? <Display />
					: <Loading />
				}
			</div>
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
		setStoreState: (payload) => dispatch(SetStoreState(payload))
	});
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Receiver));