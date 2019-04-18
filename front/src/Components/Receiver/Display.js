import React, { Component } from 'react';
import { SetStoreState } from '../../Actions';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      delay: 0,
      displayedDashboard: '',
      dashboardStyle: {},
    };
  }

  componentDidMount() {
    this.viewportStyle();
    window.addEventListener('resize', this.viewportStyle);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.reloadRequired) {
        this.props.setStoreState({
          reloadRequired: false
        });
      }
      const timeout = (!this.props.dashboardToDisplay.timeout) ? 0 : this.props.dashboardToDisplay.timeout;
      const delay = (!this.props.dashboardToDisplay.delay) ? 0 : this.props.dashboardToDisplay.delay;
      let delayBeforeDisplay = 0;
      if (timeout > delay || timeout === 0) {
        delayBeforeDisplay = (timeout > delay || !timeout) ? setTimeout(() => {
          this.viewportStyle();
          this.setState({
            render: true,
            displayedDashboard: this.props.dashboardToDisplay.url
          })
        }, delay * 1000)
          : this.state.delay;
      }
      this.setState({
        delay: delayBeforeDisplay,
        render: false,
        displayedDashboard: prevState.displayedDashboard
      });  
    }
  }

  componentWillUpdate() {
    clearTimeout(this.state.delay);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.viewportStyle);
  }

  viewportStyle = () => {
    let el = this.props.dashboardToDisplay;
    el.width = this.props.dashboardToDisplay.viewport
      ? this.props.dashboardToDisplay.viewport.split('x')[0]
      : window.innerWidth;
    el.height = this.props.dashboardToDisplay.viewport
      ? this.props.dashboardToDisplay.viewport.split('x')[1]
      : window.innerHeight;
    let style = {
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
    };
    var clientWidth = window.innerWidth,
      clientHeight = window.innerHeight,
      thisWidth = el.width || el.height * clientWidth / clientHeight,
      thisHeight = el.height || el.width * clientHeight / clientWidth,
      scale = Math.min(clientWidth / thisWidth, clientHeight / thisHeight),
      transform = '',
      tag = el.tagName;

    if (scale - 1 < 0.02 && scale - 1 > -0.02) {
      console.debug('[Dashkiosk] no need to rescale ' + tag);
      this.setState({
        dashboardStyle: style
      });
      return;
    }
    transform = 'scaleX(' + scale + ') scaleY(' + scale + ')';
    console.debug('[Dashkiosk] apply following transform for ' + tag + ': ' + transform);
    style.transformOrigin = style.MozTransformOrigin = style.WebkitTransformOrigin = 'top left';
    style.transform = style.MozTransform = style.WebkitTransform = transform;
    style.width = Math.round(clientWidth / scale) + 'px';
    style.height = Math.round(clientHeight / scale) + 'px';
    this.setState({
      dashboardStyle: style
    });
    return;
  }

  render() {
    const { dashboardToDisplay } = this.props;

    if (this.state.render || this.state.displayedDashboard) {
      return (
        <>
          <iframe
            title={dashboardToDisplay.description
              ? dashboardToDisplay.desciption
              : dashboardToDisplay.url}
            src={(this.state.render)
              ? dashboardToDisplay.url
              : this.state.displayedDashboard}
            style={this.state.dashboardStyle}
            frameBorder='0'
            scrolling='no'
            width='100%'
            height='100%'
          />
          {this.props.connectionLost
            ? <Spinner className='right-bottom' animation='grow' size='lg' />
            : ''}
        </>
      );
    } else {
      return <Spinner className="centered" animation="grow" />;
    }
  }
}

function mapStateToProps(state) {
  return ({
    dashboardToDisplay: state.dashboardToDisplay,
    connectionLost: state.connectionLost,
    reloadRequired: state.reloadRequired,
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    setStoreState: (payload) => dispatch(SetStoreState(payload))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
