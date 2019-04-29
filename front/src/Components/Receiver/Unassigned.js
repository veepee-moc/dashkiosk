import React, { Component } from 'react';
import config from '../../config';
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

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  getRandomImage = () => {
    let array = JSON.parse(JSON.stringify(config.unassigned_images));
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
    const style = config.background_choice !== 'image'
      ? { backgroundColor: config.background,
          top: '0',
          left: '0',
          position: 'absolute',
          height: '100%',
          width: '100%' }
      : { backgroundImage: `url(${config.background})`,
          top: '0',
          left: '0',
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundSize: 'cover' };
    return (
      <>
        <Swap control={config.branding !== 'default'}>
          <div style={style}>
            { config.loading && <img 
              className='logo'
              src={config.loading} 
              alt={`${config.branding}-logo`}
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
          <Clock format={'HH:mm'} ticking={true} timezone={config.timezone} />
        </div>
      </>
    );
  }
}

export default Unassigned;
