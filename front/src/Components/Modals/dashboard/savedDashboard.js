import React, { Component } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdOpen, IoMdSearch, IoMdResize, IoMdSync, IoMdTimer, IoMdTrash } from 'react-icons/io';
import { Row, Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../Modals.css';
import Swap from '../../Swap';
import Fuse from 'fuse.js';

export default class savedDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      dashboards: [],
      searched_dashboards: [],
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
        "description",
        "url"
      ]
    };
  }

  componentWillMount() {
    this.updateDashboard();
  }

  componentDidUpdate() {
    if (this.props.submitLoad === true) {
      const dashboard = Object.assign({}, this.state.dashboards[this.state.selected], { groupId: this.props.groupId });
      this.props.handleInput('submitLoad', false);
      Axios.post(`/api/dashboard/`, dashboard)
        .catch((err) => toast.error(`Failed to add dashboard: ${err.message}`));
    }
  }

  updateDashboard() {
    this.setState({selected: -1});
    Axios.get('/api/dashboard/saved')
      .then(res => this.setState({ dashboards: res.data }))
      .catch(err => console.error(err));
  }

  remove(i) {
    Axios.delete(`/api/dashboard/saved/${this.state.dashboards[i].id}`)
      .then(() => this.updateDashboard())
      .catch((err) => toast.error(`Failed to remove dashboard: ${err.message}`));
  }

  searchBar = () =>
    <div className="input-group input-group-lg mb-4">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-lg"><IoMdSearch /></span>
      </div>
      <input 
        onChange={this.searchEngine} 
        type="text" 
        className="form-control" 
        aria-label="search" 
        aria-describedby="inputGroup-sizing-sm" 
        placeholder='Search a dashboard...'
      />
    </div>

  searchEngine = (event) => {
    this.setState({ search_input: event.target.value });
    if (event.target.value.length === 0) {
      this.setState({ searched_dashboards: [] });
      return;
    }
    var fuse = new Fuse(this.state.dashboards, this.searchOptions);
    this.setState({ searched_dashboards: fuse.search(event.target.value) });
  }

  renderCards = (dashboard, i) =>
    <Card
      key={`dashboardCard${i}`}
      className={`savedCard ${(this.state.selected === i) ? 'selected' : ''}`}
      onClick={() => this.setState({selected: this.state.selected === i ? -1 : i})}
    >
      <Card.Body>
        <Card.Subtitle className="text-muted">{dashboard.description}</Card.Subtitle>
        <OverlayTrigger
          key={`card-tooltip-${i}`}
          placement='bottom'
          overlay={ this.state.selected === i ? <span/> :
            <Tooltip id={`card-tooltip-${i}`}>
              {dashboard.url}
            </Tooltip>
          }
        >
          <Card.Text className={this.state.selected === i ? '' : 'text-truncate'}>
            {dashboard.url}
          </Card.Text>
        </OverlayTrigger>
        
        </Card.Body>
        {this.state.selected === i
          &&
          <Row className='text-center no-gutters pb-2 justify-content-center'>
            <Col xs={6} sm={12} md={6} hidden={!dashboard.viewport}>
              <IoMdResize />{dashboard.viewport}
            </Col>
            <Col xs={3} sm={12} md={3} hidden={!dashboard.timeout}>
              <IoMdSync />{dashboard.timeout}s
            </Col>
            <Col xs={3} sm={12} md={3} hidden={!dashboard.delay}>
              <IoMdTimer />{dashboard.delay}s
              </Col>
          </Row>
        }
      <Card.Footer>
      { this.props.management ? <div className='w-50 d-inline-block text-left'>
          <Button
            variant='outline-danger'
            size='sm'
            onClick={() => this.remove(i)}
          >
            <IoMdTrash size='20'/>
          </Button>
        </div> : <div className='w-50 d-inline-block'/> }
        <div className='w-50 d-inline-block text-right'>
          <Button
            type='a'
            target='_blank'
            href={dashboard.url}
            role='button'
            variant='outline-primary'
            size='sm'
            className='px-1'
          >
            <IoMdOpen size='20'/>
          </Button>
        </div>
      </Card.Footer>
    </Card>

  render() {
    return (
      <>
        {
          this.state.dashboards.length === 0 ?
            <div className="text-center">
              <span className="font-weight-light"> No saved dashboard </span>
            </div> :
            <>
              {this.searchBar()}
              <div className='savedImagesBody'>
                <div className='card-columns'>
                  <Swap control={this.state.search_input.length > 0}>
                    {this.state.searched_dashboards.map(this.renderCards)}
                    {this.state.dashboards.map(this.renderCards)}
                  </Swap>
                </div>
              </div>
            </>
        }
      </>
    );
  }
};