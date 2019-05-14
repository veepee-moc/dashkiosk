import React from 'react';
import config from '../../config';
import './Receiver.css';

export default function DashboardImage(props) {
  let style = JSON.parse(JSON.stringify(props.style));
  style.backgroundImage = `url(${props.src})`;
  style.backgroundSize = (props.viewport) ? style.backgroundSize : 'contain'; // config -> cover or contain
  style.backgroundPosition = 'center';
  style.backgroundRepeat = 'no-repeat';
  style.transition = 'background-image 1s, opacity 1s';
  return (
    <div style={style} />
  );
}
