import React, { Component } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { IoIosClose } from 'react-icons/io';
import { Card, Button } from 'react-bootstrap';
import './Modals.css';

export default class savedDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      dashboards: []
    }
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
      .then(res => this.setState({dashboards: res.data}))
      .catch(err => console.error(err));
  }

  select(i) {
    this.setState({selected: i});
  }

  remove(i) {
    Axios.delete(`/api/saved_dashboard/${this.state.dashboards[i].id}`)
      .then(() => this.updateDashboard())
      .catch((err) => toast.error(`Failed to add dashboard: ${err.message}`));
  }

  render() {
    return (
        <div className='card-columns'>
          {this.state.dashboards.map((dashboard, i) =>
            <Card 
              key={`dashboardCard${i}`} 
              className={`pt-1 pr-1 savedCard ${ (this.state.selected === i) ? 'selected' : ''}`}
              onClick={() => this.select(i)}
            >
              <Button 
                variant='light' 
                size='sm' 
                className='float-right pt-0 pr-0 pb-0 pl-0'
                onClick={() => this.remove(i)}
              >
                <IoIosClose size='22'/>
              </Button>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{ dashboard.description }</Card.Subtitle>
                <Card.Text>
                  {dashboard.url}
                </Card.Text>
                <div className='text-right'>
                <Card.Link target='_blank' href={dashboard.url}>Open in new tab</Card.Link>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
    );
  }
};