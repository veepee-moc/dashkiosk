import React from 'react';
import { connect } from 'react-redux';
import './Receiver.css';

function DashboardImage(props) {
  let style = JSON.parse(JSON.stringify(props.style));
  style.backgroundImage = `url(${props.src})`;
  style.backgroundSize = (props.viewport) 
    ? style.backgroundSize 
    : (props.uploaded_images_format && props.uploaded_images_format === 'contain'
      ? 'contain'
      : 'cover');
  style.backgroundPosition = 'center';
  style.backgroundRepeat = 'no-repeat';
  style.transition = 'background-image 1s, opacity 1s';
  return (
    <div style={style} />
  );
}

function mapStateToProps(state) {
	return ({
    uploaded_images_format: state.settings.uploaded_images_format
	});
}

export default connect(mapStateToProps)(DashboardImage);
