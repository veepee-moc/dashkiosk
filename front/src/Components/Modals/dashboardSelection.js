import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function DashboardSelection(props) {
  return (
    <ButtonGroup className='w-100 mb-3'>
      <Button
        variant='light'
        className={`w-50 border-right border-bottom rounded-0 ${props.newDashboard ? 'dashboardSelection' : ''}`}
        onClick={() => props.handleInput('newDashboard', true)}
      >
        Create a new dashboard
      </Button>
      <Button
        variant='light'
        className={`w-50 border-left border-bottom rounded-0 ${!props.newDashboard ? 'dashboardSelection' : ''}`}
        onClick={() => props.handleInput('newDashboard',false)}
      >
        Use previously saved dashboard
      </Button>
    </ButtonGroup>

  );
}
