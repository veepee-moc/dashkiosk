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
        delay: 0,
        dashboard: {},
      },
      screen2: {
        delay: 0,
        dashboard: {},
      },
    };
  }

  componentDidUpdate(prevProps) {
    /*console.log('ta race la chauve');
    console.log(document.getElementById('clientDisplay').clientWidth);
    console.log(document.getElementById('clientDisplay').clientHeight);*/
    if (prevProps !== this.props) {
      if (this.props.reloadRequired) {
        this.props.setStoreState({
          reloadRequired: false
        });
      }
      let screenToUpdate = `screen${this.state.displayed === 1 ? 2 : 1}`;
      this.updateScreenWithDashboard(screenToUpdate, this.props.dashboardToDisplay);
    }
  }

  updateScreenWithDashboard(screen, dashboardToDisplay) {
    const timeout = (!this.props.dashboardToDisplay.timeout) ? 0 : this.props.dashboardToDisplay.timeout;
    const delay = (!this.props.dashboardToDisplay.delay) ? 0 : this.props.dashboardToDisplay.delay;
    const actualDisp = this.state.displayed;
    this.setState({
      [screen]: {
        dashboard: dashboardToDisplay.url ? dashboardToDisplay : {}
      }
    }, () => {
      clearTimeout(this.state[screen].delay);
      if (timeout > delay || timeout === 0) {
        this.setState({
          [screen]: {
            delay: setTimeout(() => {
              this.setState({
                displayed: (actualDisp === 1) ? 2 : 1,
              });
            }, 1000 * delay),
            dashboard: this.state[screen].dashboard
          },
        });
      }
    });
  }

  componentDidMount() {
  }

  render() {
    const displayedScreen = this.state[`screen${this.state.displayed}`];
    //console.log(el ? el.clientWidth : 'noull');
    /*console.log('document Element client hieght: ', document.documentElement.clientHeight);
    console.log('window inner height: ', window.innerHeight);
    console.log('', window.screen.width);*/
    if (displayedScreen.dashboard.length === 0) {
      return <Spinner className="centered" animation="grow" />;
    } else {
      return (
        <div id='clientDisplay'>
          <div hidden={this.state.displayed === 2}>
            <IFrame
              dashboard={this.state.screen1.dashboard}
              style={this.state.screen1.dashboardStyle}
            />
          </div>
          <div hidden={this.state.displayed === 1}>
            <IFrame
              dashboard={this.state.screen2.dashboard}
              style={this.state.screen2.dashboardStyle}
            />
          </div>
          {this.props.connectionLost
            ? <Spinner className='right-bottom' animation='grow' size='lg' />
            : ''}
          {this.props.osd
            ? <div className='osd'>
              <div className='title'>
                {this.props.osd}
              </div>
              <div className='size'>
                <span>{`Client size: ${document.getElementById('clientDisplay').clientWidth}x${document.getElementById('clientDisplay').clientHeight}`}</span>
                <span>{`Inner size: ${document.getElementById('clientDisplay').innerWidth}x${window.innerHeight}`}</span>
                <span>{`Screen size: ${window.screen.width}x${window.screen.height}`}</span>
              </div>
            </div>
            : ''}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return ({
    dashboardToDisplay: state.dashboardToDisplay,
    connectionLost: state.connectionLost,
    reloadRequired: state.reloadRequired,
    osd: state.osd,
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    setStoreState: (payload) => dispatch(SetStoreState(payload))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
