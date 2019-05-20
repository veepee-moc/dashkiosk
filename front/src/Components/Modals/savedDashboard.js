import React, { Component } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { Card, Button } from 'react-bootstrap';
import './Modals.css';
import Swap from '../Swap';
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
      this.props.handleInput('submitLoad', false);
      Axios.post(`/api/group/${this.props.group.id}/dashboard`, this.state.dashboards[this.state.selected])
        .catch((err) => toast.error(`Failed to add dashboard: ${err.message}`));
    }
  }

  updateDashboard() {
    Axios.get('/api/saved_dashboard')
      .then(res => this.setState({ dashboards: res.data }))
      .catch(err => console.error(err));
  }

  select(i) {
    this.setState({selected: i});
  }

  remove(i) {
    Axios.delete(`/api/saved_dashboard/${this.state.dashboards[i].id}`)
      .then(() => this.updateDashboard())
      .catch((err) => toast.error(`Failed to remove dashboard: ${err.message}`));
  }

  searchBar = () =>
    <div className="input-group input-group-lg mb-4">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-lg"><IoMdSearch /></span>
      </div>
      <input onChange={this.searchEngine} type="text" className="form-control" aria-label="search" aria-describedby="inputGroup-sizing-sm" />
    </div>

  searchEngine = (event) => {
    this.setState({search_input: event.target.value});
    if (event.target.value.length === 0) {
      this.setState({searched_dashboards: []});
      return ;
    }
    var fuse = new Fuse(this.state.dashboards, this.searchOptions);
    this.setState({ searched_dashboards: fuse.search(event.target.value) });
  }

  renderCards = (dashboard, i) =>
    <Card
      key={`dashboardCard${i}`}
      className={`pt-1 pr-1 savedCard ${(this.state.selected === i) ? 'selected' : ''}`}
      onClick={() => this.select(i)}
    >
      <Button
        variant='light'
        size='sm'
        className='float-right pt-0 pr-0 pb-0 pl-0'
        onClick={() => this.remove(i)}
      >
        <IoMdClose size='22' />
      </Button>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{dashboard.description}</Card.Subtitle>
        <Card.Text>
          {dashboard.url}
        </Card.Text>
        <div className='text-right'>
          <Card.Link target='_blank' href={dashboard.url}>Open in new tab</Card.Link>
        </div>
      </Card.Body>
    </Card>

  render() {
    return (
      <div>
        {this.searchBar()}
        {
          this.state.dashboards.length === 0 ?
          <div className="text-center">
            <span className="font-weight-light"> No saved dashboard </span>
            </div> :
            // Cards display
            <div className='card-columns'>
            <Swap control={this.state.search_input.length > 0}>
                {this.state.searched_dashboards.map(this.renderCards)}
                {this.state.dashboards.map(this.renderCards)}
            </Swap>
            </div>
        }
      </div>
    );
  }
};