import React, { Component } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdSearch, IoMdTrash, IoMdOpen } from 'react-icons/io';
import { Card, Button } from 'react-bootstrap';
import UploadImage from './index';
import './uploadImage.css';
import Swap from '../Swap';
import Fuse from 'fuse.js';

export default class importedImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      images: [],
      searched_images: [],
      search_input: ''
    };
    this.searchOptions = {
      shouldSort: true,
      matchAllTokens: true,
      tokenize: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'name',
        'path'
      ]
    };
  }

  componentWillMount() {
    this.updateImage();
  }

  updateImage = () => {
    Axios.get('/api/public')
      .then(res => {
        this.setState({ images: res.data[this.props.folder] }, () => {
          this.setState({
            selected: res.data[this.props.folder].findIndex((elem) => elem.path === this.props.value)
          })
        });
      })
      .catch(err => toast.error(`Failed to load multi dashboards info: ${err}`));
  }

  remove(i) {
    const imageName = this.state.images[i].path.split('/')[this.state.images[i].path.split('/').length -1];
    Axios.delete(`api/public/${this.props.folder === 'dashboard' ? '' : 'settings/' }${this.props.folder}/${imageName}`)
      .then(() => {this.updateImage(); toast.success('Successfully removed image')})
      .catch((err) => toast.error(`Failed to remove image: ${err.message}`));
  }

  searchBar = () =>
    <div className='input-group input-group-lg mb-4'>
      <div className='input-group-prepend'>
        <span className='input-group-text' id='inputGroup-sizing-lg'>
          <IoMdSearch />
        </span>
      </div>
      <input
        onChange={this.searchEngine}
        type='text'
        className='form-control'
        aria-label='search'
        aria-describedby='inputGroup-sizing-sm'
        placeholder='Search an image...'
      />
    </div>

  searchEngine = (event) => {
    this.setState({ search_input: event.target.value });
    if (event.target.value.length === 0) {
      this.setState({ searched_images: [] });
      return;
    }
    var fuse = new Fuse(this.state.images, this.searchOptions);
    this.setState({ searched_images: fuse.search(event.target.value) });
  }

  renderCards = (image, i) =>
    <Card
      key={`imageCard${i}`}
      className={`savedCard ${(this.state.selected === i) ? 'selected' : ''}`}
      onClick={(event) => {
        if (this.selected !== i) {
          this.props.handleInput('newImageUrl', image.path, event, this.props.images.index);
          this.setState({ selected: i });
        } else {
          this.setState({ selected: -1 });
        }
      }}
    >
      <Card.Img className="card-img-top px-1 py-1" src={image.thumbnailPath || image.path} alt={`thumbnail-${image.name}`} />
      <Card.Body>
        <Card.Subtitle className="text-muted font-italic">{image.name}</Card.Subtitle>
      </Card.Body>

      {this.props.management ? <Card.Footer>
        <div className='w-50 d-inline-block text-left'>
          <Button
            variant='outline-danger'
            size='sm'
            onClick={() => this.remove(i)}
          >
            <IoMdTrash size='20'/>
          </Button>
        </div>
        <div className='w-50 d-inline-block text-right'>
          <Button
            type='a'
            target='_blank'
            href={image.path}
            role='button'
            variant='outline-primary'
            size='sm'
          >
            <IoMdOpen size='20'/>
          </Button>
        </div>
      </Card.Footer> : ''}
    </Card>

  render() {
    return (
      <>
      <div className='row justify-content-center'>
        <UploadImage
          type='url'
          name='newImageUrl'
          upload-route={this.props.folder === 'dashboard'
            ? '/api/upload/dashboard'
            : `/api/settings/upload/${this.props.folder}`}
          dataName={this.props.folder}
          reload={this.updateImage}
          value={this.props.value}
        />
        </div>
        {!this.state.images || this.state.images.length === 0
          ? <div className='text-center'>
            <span className='font-weight-light'>No saved image</span>
          </div>
          :
          <>
            {this.searchBar()}
            <div className='savedImageBody'>
              <div className='card-columns'>
                <Swap control={this.state.search_input.length > 0}>
                  {this.state.searched_images.map(this.renderCards)}
                  {this.state.images.map(this.renderCards)}
                </Swap>
              </div>
            </div>
          </>
        }
      </>
    );
  }
};