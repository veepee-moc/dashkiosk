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
