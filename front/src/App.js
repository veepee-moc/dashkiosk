import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Admin from './Components/Admin';
import Receiver from './Components/Receiver';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/receiver" component={Receiver} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;