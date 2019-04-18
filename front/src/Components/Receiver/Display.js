import React, { Component } from 'react';
import { SetStoreState } from '../../Actions';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import IFrame from './IFrame';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: 1,
      screen1: {
        dashboard: {},
        dashboardStyle: {},
      },
      screen2: {
        dashboard: {},
        dashboardStyle: {},
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.reloadRequired) {
        this.props.setStoreState({
          reloadRequired: false
        });
      }
      const timeout = (!this.props.dashboardToDisplay.timeout) ? 0 : this.props.dashboardToDisplay.timeout;
      const delay = (!this.props.dashboardToDisplay.delay) ? 0 : this.props.dashboardToDisplay.delay;
      let screenToUpdate = `screen${this.state.displayed === 1 ? 2 : 1}`;
      const actualDisp = this.state.displayed;
      this.updateScreenWithDashboard(screenToUpdate, this.props.dashboardToDisplay);
      if (timeout > delay || timeout === 0) {
        setTimeout(() => {
          this.setState({
            displayed: (actualDisp === 1) ? 2 : 1,
          });
        }, 1000 * delay);
      }
    }
  }

  updateScreenWithDashboard(screen, dashboardToDisplay) {
    this.setState({
      [screen]: {
        dashboard: dashboardToDisplay.url ? dashboardToDisplay : {}
      }
    });
  }

  render() {
    const displayedScreen = this.state[`screen${this.state.displayed}`];
    if (displayedScreen.dashboard.length === 0) {
      return <Spinner className="centered" animation="grow" />;
    } else {
      return (
        <>
          <div hidden={ this.state.displayed === 2 }>
            <IFrame
              dashboard={this.state.screen1.dashboard}
              style={this.state.screen1.dashboardStyle}
            />
          </div>
          <div hidden={ this.state.displayed === 1 }>
            <IFrame
              dashboard={this.state.screen2.dashboard}
              style={this.state.screen2.dashboardStyle}
            />
          </div>
          {this.props.connectionLost
            ? <Spinner className='right-bottom' animation='grow' size='lg' />
          : ''}
        </>
      );
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
