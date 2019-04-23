import React, { Component } from 'react';
import { SetStoreState } from '../../Actions';
import { connect } from 'react-redux';
import { Spinner, Row, Col } from 'react-bootstrap';
import Swap from '../Swap';
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
      clientWidth: 0,
      clientHeight: 0
    };
  }

  componentDidMount() {
    this.updateScreenSize();
    window.addEventListener('resize', this.updateScreenSize);
  }

  componentDidUpdate(prevProps) {
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenSize);
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

  updateScreenSize = () => {
    this.setState({
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight
    });
  }

  render() {
    const displayedScreen = this.state[`screen${this.state.displayed}`];
    if (displayedScreen.dashboard.length === 0) {
      return <Spinner className="centered" animation="grow" />;
    } else {
      return (
        <>
          <div className={ this.state.displayed === 2 ? 'disp' : 'hide' }>
            <IFrame
              name='1'
              dashboard={this.state.screen1.dashboard}
              style={this.state.screen1.dashboardStyle}
            />
          </div>
          <div className={ this.state.displayed === 1 ? 'disp' : 'hide' }>
            <IFrame
              name='2'
              dashboard={this.state.screen2.dashboard}
              style={this.state.screen2.dashboardStyle}
            />
          </div>
          {this.props.connectionLost
            ? <Spinner className='right-bottom' animation='grow' size='lg' />
            : ''}
          <Swap control={!this.props.osd}>
            <div className='osd'>
              <div className='title'>
                {this.props.osd}
              </div>
              <div className='size'>
                <Swap control={!this.props.isPreview}>
                  <span>Displaying screen size on receiver</span>

                  <>
                    <Row className='text-right'>
                      <Col>{`Client size: ${this.state.clientWidth}x${this.state.clientHeight}`}</Col>
                    </Row>
                    <Row className='text-right'>
                      <Col>{`Screen size: ${window.screen.width}x${window.screen.height}`}</Col>
                    </Row>
                  </>
                </Swap>
              </div>
            </div>

            <>
            </>
          </Swap>
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
    osd: state.osd,
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    setStoreState: (payload) => dispatch(SetStoreState(payload))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
