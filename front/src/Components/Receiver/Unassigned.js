import React, { Component } from 'react';
import config from '../../config';
import { connect } from 'react-redux';
import './Receiver.css';
import Swap from '../Swap';
import Clock from 'react-live-clock';

class Unassigned extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: 0,
      image: 0,
      shuffledImages: []
    };
  }

  componentWillMount() {
    this.getRandomImage();
  }

  componentDidMount() {
    this.setState({
      interval: setInterval(this.updateDisplayedImage, 60 * 1000)
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.background_choice !== prevProps.background_choice 
      || this.props.unassigned_images !== prevProps.unassigned_images
      || this.props.background_image !== prevProps.background_image) {
      this.getRandomImage();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  getRandomImage = () => {
    if (!this.props.unassigned_images)
      return;
    let array = JSON.parse(JSON.stringify(this.props.unassigned_images));
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setState({
      shuffledImages: array,
      image: 0
    });
  }

  updateDisplayedImage = () => {
    if (this.state.image === this.state.shuffledImages.length - 1) {
      this.getRandomImage();
    } else {
      this.setState({
        image: this.state.image + 1
      });
    }
  }

  render() {
    const style = this.props.background_choice !== 'image'
      ? { backgroundColor: this.props.background_color,
          top: '0',
          left: '0',
          position: 'absolute',
          height: '100%',
          width: '100%' }
      : { backgroundImage: `url(${this.props.background_image})`,
          top: '0',
          left: '0',
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundSize: 'cover' 
        };
    return (
      <>
        <Swap control={this.props.useBranding === true}>
          <div style={style}>
            { this.props.loading_image && <img 
              className='logo'
              src={this.props.loading_image} 
              alt='logo'
              /> }
          </div>
          <div style={{
            top: '0',
            left: '0',
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${this.state.shuffledImages[this.state.image]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 1s, opacity 1s',
          }} />
        </Swap>
        <div className='right-bottom clock'>
          <Clock format={'HH:mm'} ticking={true} timezone={this.props.timezone} />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
	return ({
    receiverConnected: state.receiverConnected,
    useBranding: state.settings.useBranding,
    timezone: state.settings.timezone,
    background_choice: state.settings.background_choice,
    background_color: state.settings.background_color,
    background_image: state.settings.background_image,
    loading_image: state.settings.loading_image,
    unassigned_images: state.settings.unassigned_images,
	});
}

export default connect(mapStateToProps)(Unassigned);
