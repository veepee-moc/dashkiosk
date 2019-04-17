import React, { Image, Component } from 'react';
import { connect } from 'react-redux';
import './Receiver.css';
import { Spinner } from 'react-bootstrap';
//import img from '../../images/unassigned/crab.jpg';

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
      this.setState({
        delay: (this.props.dashboardToDisplay && this.props.dashboardToDisplay.timeout > this.props.dashboardToDisplay.delay)
          ? setTimeout(() => {
            this.setState({
              render: true,
              displayedDashboard: this.props.dashboardToDisplay.url
            })
          }, this.props.dashboardToDisplay.delay * 1000) 
          : this.state.delay,
        render: false,
        displayedDashboard: prevState.displayedDashboard
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    clearTimeout(this.state.delay);
  }

  render() {
    console.log(this);
    if (this.state.render) {
      return (
        <iframe
          src={this.props.dashboardToDisplay.url}
          style={style.iframe}
          frameBorder='0'
          scrolling='no'
          width='100%'
          height='100%'
        />
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
/*}		
  <link rel="stylesheet" href="styles/unassigned.css">
  <!-- endbuild -->
  <style>
   .logo {
     background-image: url("{{#asset}}images/stamp-{{ branding }}.svg{{/asset}}");
   }
  </style>*//*

<div class="background">
</div>

<div class="photos">
{/*{#unassigned}}
<div class="photo" data-image="images/unassigned/{{.}}"></div>
{{/unassigned}
</div>

<div class="logo">salut a tous les amis</div>
<img src={ img[0] } />
<div class="clock"></div>
</>
);*/


function mapStateToProps(state) {
  return ({
    dashboardToDisplay: state.dashboardToDisplay,
    connectionLost: state.connectionLost
  });
}

export default connect(mapStateToProps, null)(Display);
