import React, { Component } from 'react';

export default class Display extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {
				transformOrigin: '',
				MozTransform: '',
				WebkitTransform: '',
				position: 'absolute',
				overflow: 'hidden',
				height: '100%',
				width: '100%',
				top: '-2px',
				left: '-2px',
				backgroundColor: '#faf5f2'
			}
		};
	};

	componentDidMount() {
		window.addEventListener('resize', this.viewportStyle);
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.viewportStyle();
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.viewportStyle);
	}

	viewportStyle = () => {
		let style = JSON.parse(JSON.stringify(this.state.style));
		let el = {};
		let dashboard = this.props.dashboard;
		if (dashboard.viewport
			&& dashboard.viewport.split('x').length !== 2) {
			return;
		}
		el.width = dashboard.viewport
			? dashboard.viewport.split('x')[0]
			: window.innerWidth;
		el.height = dashboard.viewport
			? dashboard.viewport.split('x')[1]
			: window.innerHeight;
		var clientWidth = window.innerWidth,
			clientHeight = window.innerHeight,
			thisWidth = el.width || el.height * clientWidth / clientHeight,
			thisHeight = el.height || el.width * clientHeight / clientWidth,
			scale = Math.min(clientWidth / thisWidth, clientHeight / thisHeight),
			transform = '',
			tag = el.tagName;

		if (scale - 1 < 0.02 && scale - 1 > -0.02) {
			console.debug('[Dashkiosk] no need to rescale ' + tag);
			return;
		}
		transform = 'scaleX(' + scale + ') scaleY(' + scale + ')';
		console.debug('[Dashkiosk] apply following transform for ' + tag + ': ' + transform);
		style.transformOrigin = style.MozTransformOrigin = style.WebkitTransformOrigin = 'top left';
		style.transform = style.MozTransform = style.WebkitTransform = transform;
		style.width = Math.round(clientWidth / scale) + 'px';
		style.height = Math.round(clientHeight / scale) + 'px';
		this.setState({
			style: style
		});
		return;
	}

	render() {
		const dashboard = this.props.dashboard;

		return (
			<iframe
				id={`iframe${ this.props.name }`}
				title={dashboard.description
					? dashboard.desciption
					: dashboard.url}
				src={dashboard.url}
				style={this.state.style}
				frameBorder='0'
				scrolling='no'
				width='100%'
				height='100%'
			/>
		);
	}
}