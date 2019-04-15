import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SetStoreState } from '../../Actions';
import { connect } from 'react-redux';
import socketio from './socketio';
import supervisor from './supervisor';
import errors from './errors';

errors.enable();

class Receiver extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		supervisor.ready();
		console.log('[Dashkiosk] dashkiosk ready, connect to socket.io server');
		socketio(this);
	}

	render() {
		return (
			<React.Fragment>
				{ (this.props.receiverConnected) ? "oui" : "non" }
				<div className="glow"></div>
				<div className="osd text"></div>
				<div className="osd technical"></div>
				<div className="connecting"></div>
				<div className="show loading" id="loading">
					<div className="branding branding-{{ branding }}"></div>
				</div>
			</React.Fragment>
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