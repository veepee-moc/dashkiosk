import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import { Spinner } from 'react-bootstrap';
import './Receiver.css';

const style = {
  iframe: {
    position: 'absolute',
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    top: '0',
    transformOrigin: '0 0',
    backgroundColor: '#faf5f2'
  },
};

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      delay: null,
      displayedDashboard: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const timeout = (!this.props.dashboardToDisplay.timeout) ? 0 : this.props.dashboardToDisplay.timeout;
      const delay = (!this.props.dashboardToDisplay.delay) ? 0 : this.props.dashboardToDisplay.delay;
      let delayBeforeDisplay = 0;
      if (timeout > delay || timeout === 0) {
        delayBeforeDisplay = (timeout > delay || !timeout) ? setTimeout(() => {
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

  componentWillUpdate(nextProps, nextState) {
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
            style={style.iframe}
            frameBorder='0'
            scrolling='no'
            width='100%'
            height='100%'
          />
          {this.props.connectionLost
            ? <div className='right-bottom'>
                <Spinner animation='grow' size='lg' />
              </div>
            : ''}
        </>
      );
    } else if (this.state.displayedDashboard) {
      return (
        <iframe
          src={this.state.displayedDashboard}
          style={style.iframe}
          frameBorder='0'
          scrolling='no'
          width='100%'
          height='100%'
        />);
    } else {
      return <Spinner className="centered" animation="grow" />;
    }
  }
}

function mapStateToProps(state) {
  return ({
    dashboardToDisplay: state.dashboardToDisplay,
    connectionLost: state.connectionLost
  });
}

export default connect(mapStateToProps, null)(Display);
