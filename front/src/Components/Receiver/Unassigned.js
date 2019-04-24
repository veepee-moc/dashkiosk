import React, { Component } from 'react';
import './Receiver.css';
import Clock from 'react-live-clock';

class Unassigned extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='right-bottom clock'>
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe'} />
      </div>);
  }
}

export default Unassigned;
