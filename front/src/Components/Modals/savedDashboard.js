import React, { Component } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Card,Modal, Container, Col, Button } from 'react-bootstrap';
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
    Axios.get('/api/saved_dashboard')
      .then(res => this.setState({dashboards: res.data}))
      .catch(err => console.error(err));
  }

  select(dashboard, i) {
    this.setState({selected: i});
    Axios.post(`/api/group/${this.props.group.id}/dashboard`, dashboard)
      .catch((err) => toast.error(`Failed to add dashboard: ${err.message}`));
  }

  render() {
    return (
        <div className='card-columns'>
          {this.state.dashboards.map((dashboard, i) =>
            <Card 
              key={`dashboardCard${i}`} 
              className={`savedCard ${ (this.state.selected === i) ? 'selected' : ''}`}
              onClick={() => this.select(dashboard, i)}
            >
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ dashboard.description }</Card.Subtitle>
                <Card.Text>
                {dashboard.url}
                </Card.Text>
                <Card.Link target='_blank' href={dashboard.url}>Open in new tab</Card.Link>
              </Card.Body>
            </Card>
          )}
        </div>
    );
  }
};